const inquirer = require('inquirer');
const { startHTML, endHTML } = require('./src/generateHTML');
const fs = require('fs/promises');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
let teamArray = [];

fs.writeFile('./dist/index.html', startHTML(), (err) =>
    err ? console.log(err) : console.log('Successfully created index.html!'
    ));

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
                    addMemberCards(manager)
                    break;

                case "Engineer":
                    const engineer = new Engineer(id, name, email, github);
                    addMemberCards(engineer);
                    break;

                case ("Intern"):
                    const intern = new Intern(id, name, email, school);
                    addMemberCards(intern);
                    break;
            };

            if (!confirm) {
                fs.appendFile('./dist/index.html', endHTML(), (error, data) =>
                    error ? console.error(error) : console.log('Members page complete!'));

            } else userPrompt();
        })
        .catch((err) => console.error(err));

};


const addMemberCards = (member) => {

    const role = member.getRole();
    const name = member.getName();
    const id = member.getId();
    const email = member.getEmail();

    //console.log(role, name, id, email);
    if (role === "Manager") {
        const office = member.getOffice();

        const html = `<div class="card m-3" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${role}</h6>
                        <p class="card-text">ID: ${id}</p>
                        <p class="card-text">Office number: ${office}</p>
                        <a href="#" class="card-link">${email}</a>
                    </div>
                </div>`;

        fs.appendFile('./dist/index.html', html, (error) =>
            error ? console.error(error) : console.log('member added'));

    } else if (role === "Engineer") {
        const github = member.getGithub();

        const html = `<div class="card m-3" style="width: 18rem;">
                              <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${role}</h6>
                                <p class="card-text">ID: ${id}</p>
                                <p class="card-text">GitHub username: ${github}</p>
                                <a href="#" class="card-link">${email}</a>
                              </div>
                           </div>`;

        fs.appendFile('./dist/index.html', html, (error) =>
            error ? console.error(error) : console.log('member added'));

    } else if (role === "Intern") {
        const school = member.getSchool();

        const html = `<div class="card m-3" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${role}</h6>
                    <p class="card-text">ID: ${id}</p>
                    <p class="card-text">School attended: ${school}</p>
                    <a href="#" class="card-link">${email}</a>
                </div>
            </div>`;

        fs.appendFile('./dist/index.html', html, (error) =>
            error ? console.error(error) : console.log('member added'));


    }

};



userPrompt();















