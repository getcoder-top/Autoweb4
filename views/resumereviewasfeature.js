var pdf = require("pdf-parse");
const GoogleGenerativeAI = require("@google/generative-ai").GoogleGenerativeAI;
var fs = require("fs");

function new1(req, res){
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    let dataBuffer1 = fs.readFileSync("./resumereview/resume.pdf");
    pdf(dataBuffer1).then((data) =>{

        // console.log(data.text);
    var Resume = data.text;

    let newdataBuffer = fs.readFileSync("./resumereview/jd.pdf");
    pdf(newdataBuffer).then((newdata) =>{

    var Jobdescription = newdata.text;

    // Code for deleting the files uploaded
    fs.unlink("resumereview/resume.pdf", (err) =>{
        if(err){
        console.log(err);
        }
    });

    fs.unlink("resumereview/jd.pdf", (err) =>{
        if(err){
        console.log(err);
        }
    });

    // code for generating gemini response
    async function run() {
        // For text-only input, use the gemini-pro model
        try{
        const prompt = "I provide you resume and job description, you need to review the resume on the basis of job description and provide on rating from 10 and a short 100 words review of resume, use strictness. resume : "+Resume+"and Job Description : "+Jobdescription;
      
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // console.log(text);

        res.render("Resumereviewresponse", {data : text});
        }
        catch(err){
          console.log(err);
        }
    }
    run();

})
})
}

    module.exports = {new1};