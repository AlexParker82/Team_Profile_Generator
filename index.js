const inquirer = require('inquirer');
const { startHTML, endHTML } = require('./src/generateHTML');
const fs = require('fs/promises');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');




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
            type: 'list',
            name: 'addMore',
            message: 'Add another member?',
            choices: [
                'Yes',
                'No'
            ]
        }

    ])
        .then((answers) => {
            const { name, id, email, office, github, school, role, addMore } = answers;

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

            if (addMore === 'Yes') {
                userPrompt();
            } else if (addMore === 'No') {
                fs.appendFile('./dist/index.html', endHTML(), (err) => console.error(err));
                    console.log("Page complete!");
                }
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

        const html = `
                    <div class="card m-3 border-dark" style="width: 18rem;">
                      <div class="card-body">
                        <div class="card-header">
                          <h4 class="card-title">${name}</h4>
                          <h5 class="card-subtitle mb-2 text-white">${role}</h5>
                        </div>
                        <p class="card-text border m-0 p-1">ID: ${id}</p>
                        <p class="card-text border m-0 p-1">Office number: ${office}</p>
                        <p class="card-text border m-0 p-1">Email: <a href="#" class="card-link">${email}</a></p>
                      </div>
                    </div>`;

        fs.appendFile('./dist/index.html', html, (err) => console.error(err));

    } else if (role === "Engineer") {
        const github = member.getGithub();

        const html = `
                    <div class="card m-3 border-dark" style="width: 18rem;">
                      <div class="card-body">
                        <div class="card-header">
                          <h4 class="card-title">${name}</h4>
                          <h5 class="card-subtitle mb-2 text-white">${role}</h5>
                        </div>
                        <p class="card-text border m-0 p-1">ID: ${id}</p>
                        <p class="card-text border m-0 p-1">GitHub: <a href="https://github.com/${github}" class="card-link">${github}</a></p>
                        <p class="card-text border m-0 p-1">Email: <a href="mailto: ${email}" class="card-link">${email}</a></p>
                      </div>
                    </div>`;

        fs.appendFile('./dist/index.html', html, (err) => console.error(err));

    } else if (role === "Intern") {
        const school = member.getSchool();

        const html = `
                    <div class="card m-3 border-dark" style="width: 18rem;">
                      <div class="card-body">
                        <div class="card-header">
                          <h4 class="card-title">${name}</h4>
                          <h5 class="card-subtitle mb-2 text-white">${role}</h5>
                        </div>
                        <p class="card-text border m-0 p-1">ID: ${id}</p>
                        <p class="card-text border m-0 p-1">School: ${school}</p>
                        <p class="card-text border m-0 p-1">Email: <a href="#" class="card-link">${email}</a></p>
                      </div>
                    </div>`;

        fs.appendFile('./dist/index.html', html, (err) => console.error(err));


    }

};

const init = () => {

    fs.writeFile('./dist/index.html', startHTML(), (err) => console.error(err));

    userPrompt();

}

init();



















