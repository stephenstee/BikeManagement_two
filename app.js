var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var passport = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");
var LocalStrategy = require("passport-local");
var Bike = require("./models/bike");
var User = require("./models/user");
var Customer = require("./models/customer");
var BikeRoutes = require("./routes/bike");
var AuthRoutes = require("./routes/user");
var customerRoutes = require("./routes/customer");
var flash = require("connect-flash");

var app = express()

// mongoose.connect("mongodb://localhost/bike_project",{useNewUrlParser:true, useUnifiedTopology:true});
mongoose.connect("mongodb+srv://stephen:stephen12051999@cluster0-tnebd.mongodb.net/<dbname>?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.use(express.static("public"));
app.use(flash());
app.use(require("express-session")({
	secret: "i am the legend",
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.message = req.flash("error");
	res.locals.success =req.flash("success");
	next();
})



app.use(BikeRoutes);
app.use(AuthRoutes);
app.use(customerRoutes);


app.listen(3000,function(){
	console.log("server started");
})