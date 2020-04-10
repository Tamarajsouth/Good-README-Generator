const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

const userQuestions = ["What is your GitHub username?", "Title:", "Description:", "Table of Contents:", "Istallation:",
"Usage:", "Licenses:", "Contributing:", "Tests:", "Questions:"];


function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, err => {
      if (err) {
          console.log(err)
      } else {
          console.log("Success");
      }
  })
}  

async function init() {
  let userName;
  let appTitle;
  let appDescription;
  let tableOfContents;
  let install;
  let usage;
  let license;
  let contributing;
  let tests;
  let questions;
   await inquirer
    .prompt([
      {
        type: "input",
        message: userQuestions[0],
        name: "username",
      },
      {
        type: "input",
        message: userQuestions[1],
        name: "title",
      },
      {
        type: "input",
        message: userQuestions[2],
        name: "description",
      },
      {
        type: "input",
        message: userQuestions[3],
        name: "tableOfContents",
      },
      {
        type: "input",
        message: userQuestions[4],
        name: "install",
      },
      {
        type: "input",
        message: userQuestions[5],
        name: "usage",
      },
      {
        type: "checkbox",
        message: userQuestions[6],
        name: "license", 
        choices: ["MIT", "GPLv3", "AGPL"] 
      },
      {
        type: "input",
        message: userQuestions[7],
        name: "contributing",
      },
      {
        type: "input",
        message: userQuestions[8],
        name: "tests",
      },
      {
        type: "input",
        message: userQuestions[9],
        name: "questions",
      },
    ])
    .then((response) => {
    userName = response.username;
    appTitle = response.title;
    appDescription = response.description;
    tableOfContents = response.tableOfContents;
    install = response.install;
    usage = response.usage;
    license = response.license;
    contributing = response.contributing;
    tests = response.tests;
    questions = response.questions;
    });

  await axios
    .get(`https://api.github.com/users/${userName}`)
    .then((response) => {
      const generatedMarkdown =
      `# ${appTitle} README \n
      ### **${response.data.name} \n
      ${appDescription} \n
      ![user picture](${response.data.avatar_url}) \n
      ## ** Table of Contents ** \n
      ## ** Install Guide ** \n
      ${install} \n
      ## ** Usage ** \n
      ${usage} \n
      ## ** License ** \n
      ${license} \n
      ## ** Contributors ** \n
      ${contributing} \n
      ## ** Tests ** \n
      ${tests} \n
      ## ** Questions ** \n
      ${questions} \n
      
    ` 
  writeToFile("README.md", generatedMarkdown);
});
}

init();
