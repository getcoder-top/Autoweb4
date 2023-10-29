
function subscription(request,response){
// app.get("/submit", (request, response, err) =>{
    // newname = request.query.name;
    // email = request.query.email;
    // phone = request.query.phone;
    // title = request.query.title;
    // location = request.query.location;
    // yoe = request.query.yearofexperience;
    // Salary = request.query.salary;
    // resume = request.query.resume;
    // date = request.query.date;
    // link = request.query.link;

    // // notification
    // Domain = request.query.domain;
    // cover = request.query.cover;

    // database.query("INSERT INTO subscriptions (name,email,phone) VALUES (" + newname + "," + email + "," + phone + ")");

    response.render("confirmationpage.html");
// })
}

module.export = subscription;