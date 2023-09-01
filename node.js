var express = require("express");
var router = express.Router();
const mysql = require("mysql")
// var database = require("../database");
var app = express();
const bodyParser = require("body-parser")
var ejs = require("ejs")

app.use(bodyParser.json())

// var database = mysql.createConnection({host:"sql6.freemysqlhosting.net", database:"sql6638622", user:"sql6638622", password:"231TDakuuj"});

const database = [
    { sno: "1", title: "title", desc: "desc", link: "link"},
    { sno: "2", title: "title2", desc: "desc2", link: "link2"},
    { sno: "3", title: "title3", desc: "desc3", link: "link3"},
    { sno: "4", title: "title4", desc: "desc4", link: "link4"}
]

// database.connect(function(err){
//     if(err){
//         throw err;
//     }
//     else{
//         console.log("Connected to database")
//     }
    
// });


// app.get("/", function(req, res, next){
//     var query = "SELECT * FROM jobs"

//     database.query(query, function(err, data){
//         if(error){
//             throw err;
//         }
//         else{
//             res.render("index", {title:'nodejs data from database', action:"list", sampleData:"data"});
//         }
//     })
// })

app.listen(3000,()=>console.log('express server is running at 3000'))

app.get('/',(request,response,next)=>{
    database.query('SELECT * FROM jobs',(err,data,fields)=>{
        if(err){
            throw err;
        }
        else{
            response.render('index', {data: database});
            console.log(data);
        }
    })
})


module.exports = router;
