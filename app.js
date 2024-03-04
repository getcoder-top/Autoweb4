var express = require("express")
var path = require("path")
var router = express.Router();
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser")
// var sendmail = require("./modes/mail")
var fs = require("fs");
var multer = require("multer");
var pdf = require("pdf-parse");
const GoogleGenerativeAI = require("@google/generative-ai").GoogleGenerativeAI;
const dotenv = require("dotenv").config;

dotenv();

app.set("view engine", "ejs")

const database = mysql.createConnection({host:"db4free.net", database:"aurjobs", user:"aajmarket", password:"Jack@7775"});

database.connect(function(err){
        if(err){
            throw err;
        }
        else{
            console.log("Connected to database")
        }
        
    });

// const database = [
//     { sno: "1", title: "title", desc: "desc", link: "www.aajmarket.com"},
//     { sno: "2", title: "title2", desc: "desc2", link: "link2"},
//     { sno: "3", title: "title3", desc: "desc3", link: "link3"},
//     { sno: "4", title: "title4", desc: "desc4", link: "link4"}
// ]


// var indexRouter = require('./router/index')
// var usersRouter = require('./router/users')

// var sampledata = require('./routes/node')

// var app = express();

// app.set('views', path.join(_dirname, 'views'))
// app.set('view engine', 'ejs')

// app.use(logger('dev'))
// app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/views'))
// app.use(express.static(path.join(_dirname, "public")))

var company;
var category;
var location;
var jobtype;

// function filter(){
if(company != null){
    newlink = 'where company = '+'"'+company+'"';
}
else if(category != null){
    newlink = 'where category = '+'"'+category+'"';
}
else if(location != null){
    newlink = 'where location = '+'"'+location+'"';
}
else if(jobtype != null){
    newlink = 'where jobtype = '+'"'+jobtype+'"';
}
else if(company != null && category != null){
    newlink = 'where company = '+'"'+company+'"'+' and category = '+'"'+category+'"';
}
else if(company != null && location != null){
    newlink = 'where company = '+'"'+company+'"'+' and location = '+'"'+location+'"';
}
else if(company != null && jobtype != null){
    newlink = 'where company = '+'"'+company+'"'+' and jobtype = '+'"'+jpobtype+'"';
}
else if(category != null && location != null){
    newlink = 'where category =  and location = ';
}
else if(category != null && jobtype != null){
    newlink = 'where category =  and jobtype = ';
}
else if(location != null && jobtype != null){
    newlink = 'where location =  and jobtype = ';
}
else if(company != null && category != null && location != null){
    newlink = 'where company =  and category =  and location = ';
}
else if(company != null && category != null && jobtype != null){
    newlink = 'where company =  and category =  and jobtype = ';
}
else if(company != null && location != null && jobtype != null){
    newlink = 'where company =  and location =   and jobtype = ';
}
else if(category != null && location != null && jobtype != null){
    newlink = 'where category =  and location =  and jobtype = ';
}
else if(company != null && category != null && location != null && jobtype != null){
    newlink = 'where company =  and category =  and location =  and jobtype = ';
}
else{
    newlink = '';
}
// }

app.get('/',(request,response)=>{
    database.query('SELECT * FROM jobs4' + newlink,(err,newdata,fields)=>{
        if(err){
            throw err;
        }
        else{
            response.render('index', {data: newdata});
            // console.log(newdata);
        }
    })
})

app.get("/search",(requests,response) =>{
    company = requests.query.search;
    category = requests.query.category;
    location = requests.query.location;
    jobtype = requests.query.jobtype;
    
    company = company.replace(/\s{2,}/g, ' ').trim()
    
    console.log(company);
    // filter();
    // var newjobs1 = 'SELECT * from jobs where title = ' + '"'+company+'"' + ' OR desc = ' + '"'+company+'"';
    if(category != ''){
        var varsearch1 = ' UNION SELECT * from jobs4 where desc LIKE ' + "'"+category+"'";
    }
    else{
        var varsearch1 = '';
    }

    if(company != ''){
    var newjobs1 = 'SELECT * from jobs4 as t WHERE t.title LIKE '+ "'%"+company+"%'" + ' OR t.link LIKE ' +"'%"+company+"%'" + ' OR t.company LIKE ' +"'%"+company+"%'" + ' OR t.category LIKE ' +"'%"+company+"%'" + ' OR t.location LIKE '+ "'%"+company+"%'" + ' OR t.jobtype LIKE ' + "'%"+company+"%'" +  varsearch1;

    database.query(newjobs1, (err,newdata,fields) =>{
        if(err){
            console.log(err);
        }
        else{
            response.render('index',{data: newdata});
        }
    })
    }
    else{
        response.redirect('/');
    }

    if(category != '' || location != '' || jobtype != ''){
        newjob4 = 'SELECT * jobs4 at t where (t.category OR t.location OR t.jobtype) LIKE (' +"'"+category+"'"+ ' OR ' +"'"+location+"'"+ ' OR ' + "'"+jobtype+"')";
    }
    
})

app.get('/itempage',(requests,response) =>{
    newlink = requests.query.joblink;

    console.log(newlink)
    var jobpage = 'SELECT * from jobs4 where link = ' + "'"+newlink+"'";
    database.query(jobpage,(err,jobdata,fields) =>{
        if(err){
            console.log(err);
        }
        else{
            response.render('jobpage',{data : jobdata});
            console.log(jobdata);
        }
    })
})

app.get('/jobout',(request,response) =>{
    var joblink = request.query.jobout;
    response.redirect(joblink);
})

app.post('/newjobs',(request,response) =>{
    search = request.body.search,
    category = request.body.category,
    location = request.body.location,
    jobtype = request.body.jobtype,

    console.log(company);
    console.log(company);
    console.log(company);
    console.log(company);

    return response.redirect('/');


    // function newjobs(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log(company);
    //     return response.redirect('/');
    // }

})

app.get("/newjobpostpage", (request, response) =>{
    
    response.render("newjob");
})

app.get("/newjobpost", (requests,response) =>{

    companyname = requests.query.company;
    title = requests.query.title;
    description1 = requests.query.description;
    location = requests.query.location;
    salary = requests.query.salary;
    joblink = requests.query.joblink;
    imglink = requests.query.imagelink;
    category = requests.query.category;
    jobtype = requests.query.jobtype;

    console.log(companyname);
    console.log(title)

    description = description1.replace(/^a-zA-Z0-9]/g,);
    description = description.replace(",", " ");

    // var newjobdata = "INSERT INTO jobs4 (sno,title,description,link,company,location,category,imglink,jobtype) VALUES (" + "'1'" +","+title+ "','" + description + "','"  + companyname+"link" + "','" + companyname + "','" + location + "','" + "featured" + "','" + imglink + "','" + jobtype + "')";

    var newjobdata = 'INSERT INTO jobs4 (sno,title,desc4,link,company,location,category,imglink,jobtype) VALUES (' + '"1"' +',"'+title+ '","' + description + '","'  + joblink + '","' + companyname + '","' + location + '","' + "featured" + '","' + imglink + '","' + jobtype + '")';

    database.query(newjobdata, (err) =>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Job Posted")
            response.render("newjob");
        }
    });

    // response.render("newjob");
})

app.get('/subscribe', (requests, response) =>{
    
    response.render("subscriptionai");
})

app.get('/blogs', (requests, response) =>{

    response.render("addpages");
})

app.get("/about", (requests, response) =>{

    response.render("about")
})


// resume review


app.get("/review", (requests, response) =>{

    response.render("Resumereview", {data : ""});
})

const newfile = multer.diskStorage({
    destination : (req, res, cb) =>{
        cb(null, "./resumereview");
    },

    filename : (req, file, cb) =>{
        cb(null, file.originalname);
    }
})

var upload = multer({storage : newfile}).array("resume", 2);

app.post("/resume", upload, (req, res) =>{

    // var Resume = req.query.resume;
    // var Jobdescription = req.query.job;

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    let dataBuffer1 = fs.readFileSync("./resumereview/resume.pdf");
    pdf(dataBuffer1).then((data) =>{

        // console.log(data.text);
    var Resume = data.text;

    let newdataBuffer = fs.readFileSync("./resumereview/jd.pdf");
    pdf(newdataBuffer).then((newdata) =>{

    var Jobdescription = newdata.text;

    async function run() {
        // For text-only input, use the gemini-pro model
        try{
        const prompt = "I provide you resume and job description, you need to review the resume on the basis of job description and provide on rating from 10 and a short 100 words review of resume, use strictness. resume : "+Resume+"and Job Description : "+Jobdescription;
      
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // console.log(text);

        res.render("Resumereview", {data : text});
        }
        catch(err){
          console.log(err);
        }
    }
    run();
})
})
      
})


// resume review ends


// app.get("/aurjobsitemap", (requests, response) =>{

//     response.sendFile(__dirname + '/aurjobsitemap.xml')
// })

app.get('/sendmail', (request,response) =>{
    // newmail = request.query.email;

    sendmail.send();
})

// app.get('/category', (request,response) =>{
//     database.query('SELECT * FROM jobs where category = ', (err,newdata,fields)=>{
//         if(err){
//             throw err;
//         }
//         else{
//             response.render('index',{data: newdata});
//             console.log(data);
//         }
//     })
// })

port = process.env.PORT;

app.listen(3000,()=>console.log('express server is running at 3000'))

// app.use('/', indexRouter)
// app.use('/users', usersRouter);