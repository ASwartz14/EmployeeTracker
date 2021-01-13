// bring in dependencies
require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
// set connection via dotenv so info is protected, start and log server
const connection = mysql.createConnection({
  host: "localhost",
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});
connection.connect(function (err) {
  if (err) throw err;

  console.log(
    "  ______                 _                         _______             _              "
  );
  console.log(
    " |  ____|               | |                       |__   __|           | |             "
  );
  console.log(
    " | |__   _ __ ___  _ __ | | ___  _   _  ___  ___     | |_ __ __ _  ___| | _____ _ __  "
  );
  console.log(
    " |  __| | '_ ` _ | '_ | |/ _ | | | |/ _ / _     | | '__/ _` |/ __| |/ / _  '__| "
  );
  console.log(
    " | |____| | | | | | |_) | | (_) | |_| |  __/  __/    | | | | (_| | (__|   <  __/ |   "
  );
  console.log(
    " |______|_| |_| |_| .__/|_|___/ __, |___|___|    |_|_|  __,_|___|_|____|_|  "
  );
  console.log(
    "                   | |             __/ |                                               "
  );
  console.log("                   |_|            |___/     ");

  init();
});
// init questions within inquirer and switch statements for choices
function init() {
  inquirer
    .prompt({
      type: "list",
      name: "choose",
      message: "What would you like to do?",
      choices: [
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "View Departments",
        "View Roles",
        "View Employees",
        "Update Employee",
        "Delete an Employee",
        "Exit",
      ],
    })
    .then((choice) => {
      switch (choice.choose) {
        case "Add a Department":
          addDepartment();
          break;

        case "Add a Role":
          addRoll();
          break;

        case "Add an Employee":
          addEmployee();
          break;

        case "View Departments":
          viewDepartment();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "View Employees":
          viewEmps();
          break;

        case "Update Employee":
          updateEmp();
          break;
        case "Delete Employee":
          deleteEmp();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}
function addDepartment() {}
function addRoll() {}
function addEmployee() {}
function viewDepartment() {}
function viewRoles() {}
function viewEmps() {}
function updateEmp() {}
function deleteEmp() {}
