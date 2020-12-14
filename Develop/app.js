const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { ADDRGETNETWORKPARAMS } = require("dns");
const { resolve } = require("path");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employees = [];

function init()
{
    startHtml();
    addEmployee();
}

function addEmployee(){
    //need to prompt questions about team member to add
    inquirer.prompt([{
        message: "What is employee's name?",
        name: "name"
    },
    {
        type: "list",
        message: "What is their role?",
        choices: [
            "Intern",
            "Engineer",
            "Manager"
        ],
        name: "role"
    },
    {
        message: "What is employee's email?",
        name: "email"
    },
    {
        message:"What is employee's ID?",
        name: "id"
    }])
    .then(function({name, role, id, email}){
        //determines what type of card to use, depending on the role of team member
        let roleData = "";
        if (role === "Intern"){
            roleData = "school name";
        }
        else if (role === "Engineer"){
            roleData = "GitHub username"
        }
        else {
            roleData = "office number"
        }
        inquirer.prompt([{
            message: `Type employee's ${roleData}`,
            name: "roleData"
        },
    {
        type: "list",
        message: "Add more members?",
        choices: [
            "yes",
            "no"
        ],
        name:"employees"
    }])

    .then(function({roleData, members}) {
        let newMem;
        if (role === "Intern") {
            newMem = new Intern(name, id, roleData);
        }
        else if (role === "Engineer") {
            newMem = new Engineer(name, id, roleData);
        }
        else {
            newMem = new Manager(name, id, roleData);
        }
        employees.push(newMem);
        addHtml(newMem)
        .then(function(){
            //determines how many cards are created in one HTML file
            if (members === "yes"){
                addEmployee();
            }
            else{
                finishHtml();
            }
        });
    });

  });
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

function startHtml() 
{
    const html = 
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="../../Assets/style.css">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./output/team.html", html, function(err) 
    {
        if (err) 
        {
            console.log(err);
        }
    });
    // console.log("start");
}



function addHtml(employee) 
{
    return new Promise(function(resolve, reject)
    {
        const name = employee.getName();
        const role = employee.getRole();
        const id = employee.getId();
        const email = employee.getEmail();
        let data = "";
        if (role === "Intern")
        {
            //if the person is an intern, get the school info
            const school = employee.getSchool();
            data = 
            `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
            </div>`;
        }
        else if (role === "Engineer")
        {
            //if person is engineer, get the GitHub info
            const gitHub = employee.getGithub();
            data = 
            `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
            </div>`;
        }
        else
        {
            //if manager, get office number info
            const officeNum = employee.getOfficeNum();
            data = 
            `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Office Phone: ${officeNum}</li>
            </ul>
            </div>
            </div>`
        }

console.log("adding employee");
fs.appendFile("./output/team.html", data, function (err)
{
    if (err)
    {
        return reject(err);
    };
    return resolve();
});
});
}

function finishHtml() 
{
    const html = 
    `</div>
    </div>
    
    </body>
    </html>`;

    fs.appendFile("./output/team.html", html, function (err) 
    {
        if (err) 
        {
            console.log(err);
        };
    });
    // console.log("end");
}

init();
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
    //Classes have been added