const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

const questions = ["What is your GitHub username?"];

function generateMarkdown(generateMarkdown, data) {   
  return `
  # Good-README-Generator
  A command-line application that dynamically generates a README.md from a user's input
  ${answers.name}
  ${answers.email}
  ${answers.image}
  ${answers.title}
  ${answers.description}
  ${answers.tableOfContents}
  ${answers.installation}
  ${answers.usage}
  ${answers.license}
  ${answers.contributing}
  ${answers.tests}
  ${answers.questions}
  `
}

async function init() {
  let userName = await inquirer
    .prompt([
      {
        type: "input",
        message: questions[0],
        name: "username",
      },
    ])
    .then((response) => response.username);

  await axios
    .get(`https://api.github.com/users/${userName}`)
    .then((response) => console.log(response.data));

  fs.appendFile("log.txt", userName, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Success!");
    }
  });
}

init();
