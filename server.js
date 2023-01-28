const express=require("express");
// import express from "express";
const app=express();


const json=require("./csvjson_last&final.json");
// import json from "./csvjson_last&final.json";

const fetch=require("node-fetch");
// globalThis.fetch = fetch;
// const dotenv=require("dotenv");
const bp=require("body-parser");
app.use(bp.urlencoded({extended:true}));
const {PORT=3000}=process.env

// dotenv.config({path:'./.env'})
app.set("view engine","ejs");

var d;
var d2;
var c1;
var c2;

app.get("/", function(req,res){
	var frontdata=json;
	console.log(typeof(frontdata));
	res.render("demo",{fdata:frontdata});
});

app.post("/hello",async function(req,res){
	var Target=req.body.Target;
	var Source=req.body.country;
	console.log(Source);
	console.log(Target);
	json.forEach(function(data){
		if(data["Country_Name"]==Target){
			console.log("test target:",data["Country_Name"]);
			d=data.PPP;
			c1=data["Currency_Code"];
		console.log(d);
		};
		if(data["Country_Name"]==Source){
			console.log("test Source:",data["Country_Name"]);
			d2=data.PPP;
			c2=data["Currency_Code"];
		console.log(d2);
		};
	});
	var response= await fetch(`https://v6.exchangerate-api.com/v6/8ec6b5690d95492d22fe1b0c/pair/${c1}/${c2}/1`);
	// console.log(`https://v6.exchangerate-api.com/v6/8ec6b5690d95492d22fe1b0c/pair/${c1}/${c2}/1`)
	var data =await response.json();
	console.log("Conversion Rate:",data.conversion_result);
	// console.log("Conversion Rate:");
	
	var f=d/d2;
	// console.log(f);
	f1=f*req.body.amount;
	console.log("PPP Conversion:",f1.toFixed(2));
	// res.send("conversion rate:",data.conversion_result);
	res.send(`<h>conversion rate:${data.conversion_result}</h><br><h>PPP Conversion:${f1.toFixed(2)}</h>`);
});

app.listen(PORT,function(){
    console.log("server started");
})