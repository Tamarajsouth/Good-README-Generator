const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

const userQuestions = [
  "What is your GitHub username?",
  "Title:",
  "Description:",
  "Table of Contents:",
  "Installation:",
  "Usage:",
  "Licenses:",
  "Contributing:",
  "Tests:",
  "Questions:",
];

// let badgeArray = [
//   "![MIT](https://img.shields.io/apm/l/atomic-design-ui.svg)",
//   "![GPLv3](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)",
//   "![AGPL](https://img.shields.io/badge/license-AGPL-blue.svg)",
// ];

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Success README.md Generated");
    }
  });
}

async function init() {

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
        choices: ["MIT" , "GPLv3" , "AGPL"],
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
      // console.log(JSON.stringify(response.license[0]));
    //   if (response.license === "MIT") {
    //     license = badgeArray[0];
    // } else if (response.license === "GPLv3") {
    //     license = badgeArray[1];
    // } else { 
    //     license = badgeArray[2];
    // };
      userName = response.username;
      appTitle = response.title;
      appDescription = response.description;
      tableOfContents = response.tableOfContents;
      install = response.install;
      license = response.license;
      usage = response.usage;
      contributing = response.contributing;
      tests = response.tests;
      questions = response.questions;
    });

  await axios
    .get(`https://api.github.com/users/${userName}`)
    .then((response) => {
      const generatedMarkdown = 
       `# ${appTitle}
# ${response.data.name}
${appDescription}
![Tamara South picture](${response.data.avatar_url})
## **Table of Contents** 
${tableOfContents}
## **Install Guide** 
${install}
## **Usage** 
${usage}
## **License** 
${license}
## **Contributors** 
${contributing}
## **Tests** 
${tests}
## **Questions**
${questions}
`;
      writeToFile("README.md", generatedMarkdown);
    });
}

init();
