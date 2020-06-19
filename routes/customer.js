var express = require("express");
var Customer = require("../models/customer");
var router = express.Router();



router.get("/user",function(req,res){
// var count = 0;	
	Customer.find({},function(err,customer){
		if(err){
			console.log(err);
		}
		else{
			// count++;
			res.render("userindex", {customers:customer});
		}
	})
})


router.get("/user/new",function(req,res){
	res.render("newuser");
})

router.post("/user",function(req,res){
  Customer.create(req.body.customer,function(err, customer){
	  if(err){
		  res.redirect("/user");
	  }else{
		  console.log(customer);
		  res.redirect("/index");
	  }
  })
})

module.exports = router;