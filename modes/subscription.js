const express = require("express")
var app = express()
const mysql = require("mysql")
const router = require("router")
const bodyparser = require("body-parser")

database = mysql.createConnection(admin = "", username = "", password = "", database = "");

app.set("view engine", "ejs");

app.get("/submit", (request, response, err) =>{
    newname = request.query.name;
    email = request.query.email;
    phone = request.query.phone;
    title = request.query.title;

    database.query("INSERT INTO subscriptions (name,email,phone) VALUES (" + name + "," + email + "," + phone + ")");

    response.render("confirmationpage.html");
})