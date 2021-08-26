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
            name: 'name',
            message: `What is your team member's name?`,
        },
        {
            type: 'input',
            name: 'id',
            message: `What is the member's ID number?`,
        },
        {
            type: 'input',
            name: 'email',
            message: `What is the member's email?`,
        },
        {
            type: 'list',
            name: 'role',
            message: `What is your team member's role?`,
            choices: [
                "Engineer",
                "Intern",
                "Manager",
            ]
        },
        {
            type: 'input',
            name: 'office',
            message: 'What is your manager\'s office number?',
            when(answers) {
                return answers.role === "Manager";
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your engineer\'s GitHub profile name?',
            when(answers) {
                return answers.role === "Engineer";
            }
        },
        {
            type: 'input',
            name: 'school',
            message: 'What school did your intern attend?',
            when(answers) {
                return answers.role === "Intern";
            }
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: 'Add another member?'
        }

    ])
        .then((answers) => {
            const { name, id, email, office, github, school, role, confirm } = answers;

            switch (role) {
                case "Manager":
                    const manager = new Manager(id, name, email, office);
                    teamArray.push(manager);
                    break;

                case "Engineer":
                    const engineer = new Engineer(id, name, email, github);
                    teamArray.push(engineer);
                    break;

                case ("Intern"):
                    const intern = new Intern(id, name, email, school);
                    teamArray.push(intern);
                    break;
            };
            
            if (!confirm) {
                console.log(teamArray);
                return;
                
            } else userPrompt();
        })
        .catch((err) => console.error(err));

};

const logArray = (teamArray) => {
    teamArray.forEach(index => {
        const roleLog = getRole
    });
    
};

userPrompt();






