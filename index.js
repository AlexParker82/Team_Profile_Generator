const inquirer = require('inquirer');
const generateHTML = require('./src/generateHTML');
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

const userPrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name
        }
    ])
}


const init = () => {

    writeFileAsync('./dist/index.html', generateHTML.generateHTML())
    .then(() => console.log('Successfully wrote to index.html!'))
    .catch((err) => console.error(err));
};

init();
