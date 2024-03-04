var GoogleGenerativeAI = require("@google/generative-ai");
// var express = require("express");

// api key : AIzaSyD98jVma2Dk0PPGjhLsKo6SkMvjwQ-_Jb8

// var api = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyD98jVma2Dk0PPGjhLsKo6SkMvjwQ-_Jb8' ;
var genAI = new GoogleGenerativeAI.GoogleGenerativeAI(process.env.apikey);

async function run(){
var model = genAI.getGenerativeModel({ model : "gemini-pro"});


var result = await model.generateContent("Hiii");
var response = await result.response;
var text = response.text();
console.log(text);
}

run();

