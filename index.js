const inquirer = require('inquirer');
const generateHTML = require('./src/generateHTML');
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
let teamArray = [];


const userPrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'manager_name',
            message: `What is your team manager's name?`,
        },
        {
            type: 'input',
            name: 'manager_id',
            message: `What is the manager's ID number?`,
        },
        {
            type: 'input',
            name: 'manager_email',
            message: `What is the manager's email?`,
        },
        {
            type: 'input',
            name: 'office_number',
            message: `What is your team manager's office number?`,
        }
    ])
        .then(function (answers) {
            let manager = new Manager(answers.manager_id, answers.manager_name, answers.manager_email, answers.office_number);
            teamArray.push(manager);
            addMember();
        })
        .catch(function (err) {
            console.error(err)
        })

};


const addMember = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'new_member',
            message: 'Choose which type of team member to add:',
            choices: [
                "Engineer",
                "Intern",
                "Done adding."
            ]
        }
    ])
        .then((answers) => {
            switch (answers.new_member) {
                case "Engineer":
                    addEngineer();
                    break;

                case "Intern":
                    addIntern();
                    break;

                case "Done adding.":
                    generateHTML();
                    break;
            };
        })
        .catch((err) => console.error(err));
};



const addEngineer = () => {
    return inquirer.prompt([

        {
            type: 'input',
            name: 'engineer_name',
            message: `What is your engineer's name?`,
        },
        {
            type: 'input',
            name: 'engineer_id',
            message: `What is your engineer's id number?`,
        },
        {
            type: 'input',
            name: 'engineer_email',
            message: `What is your engineer's email?`,
        },
        {
            type: 'input',
            name: 'engineer_github',
            message: `What is your engineer's GitHub profile name?`,
        },
    ])
        .then((answers) => {
            let newEngineer = new Engineer(answers.engineer_id, answers.engineer_name, answers.engineer_email, answers.engineer_github);
            teamArray.push(newEngineer);
            addMember();
        })
        .catch((err) => console.error(err));
};

const addIntern = () => {
    return inquirer.prompt([

        {
            type: 'input',
            name: 'intern_name',
            message: `What is your intern's name?`,
            
        },
        {
            type: 'input',
            name: 'intern_id',
            message: `What is your intern's ID number?`,
            
        },
        {
            type: 'input',
            name: 'intern_email',
            message: `What is your intern's email?`,
            
        },
        {
            type: 'input',
            name: 'intern_school',
            message: `What school did your intern attend?`,
            
        },
    ])
        .then((answers) => {
            let newIntern = new Intern(answers.intern_id, answers.intern_name, answers.intern_email, answers.intern_school);
            teamArray.push(newIntern);
            console.log(teamArray);
            addMember();

        })
        .catch((err) => console.error(err));
};




const userData = () => {
    userPrompt()
        .then((answers) => console.log(answers))
        .catch((err) => console.error(err));
}





const init = () => {

    writeFileAsync('./dist/index.html', generateHTML.generateHTML())
        .then(() => console.log('Successfully wrote to index.html!'))
        .catch((err) => console.error(err));
};

userPrompt();



