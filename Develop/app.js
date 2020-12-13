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


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employees = [];

function init(){
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
            if (members === "yes"){
                addEmployee();
            }
            else{
                finishHtml();
            }
        });
    });

}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
function addHtml(employee) {
    return new Promise(function(resolve, reject){
        const name = employee.getName();
        const role = employee.getRole();
        const id = employee.getId();
        const email = employee.getEmail();
        let data = "";
        if (role === "Intern"){
            //if the person is an intern, get the school info
            const school = employee.getSchool();
        }
        else if (role === "Engineer"){
            //if person is engineer, get the GitHub info
            const gitHub = employee.getGithub();
        }
        else{
            //if manager, get office number info
            const officeNum = employee.getOfficeNum();
        }
    })
}
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
    //Classes have been added
