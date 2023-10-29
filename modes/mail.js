var nodemailer = require('nodemailer')

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aajmarketa@gmail.com',
        password: 'Jack@7775'
    }
});

let mailDetails = {
    from : 'aurjobs',
    to: 'aajmarketa@gmail.com',
    subject: 'Your Email is Send',
    html: '<h1>Thankyou for Contacting Aurjobs</h1><p>we will get Back to you Query Shortly</p><p>Aurjobs is a job Search Platform using Ai to get the right jobs for you.'
}

mailTransporter.sendMail(mailDetails, (err, data) =>{
    if(err){
        console.log("Email send err");
    }
    else{
        console.log("email send");
    }
})