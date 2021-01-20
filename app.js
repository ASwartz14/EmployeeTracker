// bring in dependencies
require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const chalk = require("chalk");
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
  // ASCII Text
  console.log(
    chalk.magenta.bold(
      "  ______                 _                         _______             _              "
    )
  );
  console.log(
    chalk.magenta.bold(
      " |  ____|               | |                       |__   __|           | |             "
    )
  );
  console.log(
    chalk.magenta.bold(
      " | |__   _ __ ___  _ __ | | ___  _   _  ___  ___     | |_ __ __ _  ___| | _____ _ __  "
    )
  );
  console.log(
    chalk.magenta.bold(
      " |  __| | '_ ` _ | '_ | |/ _ | | | |/ _ / _     | | '__/ _` |/ __| |/ / _  '__| "
    )
  );
  console.log(
    chalk.magenta.bold(
      " | |____| | | | | | |_) | | (_) | |_| |  __/  __/    | | | | (_| | (__|   <  __/ |   "
    )
  );
  console.log(
    chalk.magenta.bold(
      " |______|_| |_| |_| .__/|_|___/ __, |___|___|    |_|_|  __,_|___|_|____|_|  "
    )
  );
  console.log(
    chalk.magenta.bold(
      "                   | |             __/ |                                               "
    )
  );
  console.log(
    chalk.magenta.bold("                   |_|            |___/     ")
  );

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
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.choose) {
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

        case "Exit":
          connection.end();
          break;
      }
    });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDepartment",
        message: "Please enter the department you would like to add.",
        validate: function (addDepartment) {
          if (addDepartment === "") {
            console.log(
              chalk.magenta.bold("\nPlease enter a valid department name.")
            );
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET?",
        {
          depName: answer.addDepartment,
        },
        function (err) {
          if (err) throw err;
          console.log(chalk.magenta.bold("\nNew department added."));
          init();
        }
      );
    });
}
function addRoll() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addRoll",
        message: "Please enter the role you would like to add.",
        validate: function (addRoll) {
          if (addRoll === "") {
            console.log(chalk.magenta.bold("\nPlease enter a valid role."));
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter the salary for this role.",
        validate: function (salary) {
          if (isNaN(salary) || salary === "") {
            console.log(chalk.magenta.bold("\nPlease enter a valid salary."));
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "depId",
        message: "Please enter the department ID for this role.",
        validate: function (depId) {
          if (isNaN(depId) || depId === "") {
            console.log(chalk.magenta.bold("\nPlease enter a valid ID."));
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO roles SET?",
        {
          title: answer.addRoll,
          salary: answer.salary,
          depId: answer.depId,
        },
        function (err) {
          if (err) throw err;
          console.log(chalk.magenta.bold("\nNew role added."));
          init();
        }
      );
    });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addFirst",
        message: "Please enter the employee's first name.",
        validate: function (addFirst) {
          if (addFirst === "") {
            console.log(chalk.magenta.bold("\nPlease enter a valid name."));
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "addLast",
        message: "Please enter the employee's last name.",
        validate: function (addLast) {
          if (addLast === "") {
            console.log(chalk.magenta.bold("\nPlease enter a valid name."));
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "roleId",
        message: "Please enter the role ID for this employee.",
        validate: function (roleId) {
          if (isNaN(roleId) || roleId === "") {
            console.log(chalk.magenta.bold("\nPlease enter a valid ID."));
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "managerId",
        message: "Please enter the manager's ID for this employee.",
        validate: function (managerId) {
          if (isNaN(managerId) || managerId === "") {
            console.log(chalk.magenta.bold("\nPlease enter a valid ID."));
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employees SET?",
        {
          firstName: answer.addFirst,
          lastName: answer.addLast,
          roleId: answer.roleId,
          managerId: answer.managerId,
        },
        function (err) {
          if (err) throw err;
          console.log(chalk.magenta.bold("\n New Employee added."));
          init();
        }
      );
    });
}
function viewDepartment() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.log(
      chalk.magenta.bold(
        "\n Here is a list all the departments in the database. \n"
      )
    );
    console.table(res);

    init();
  });
}
function viewRoles() {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    console.log(
      chalk.magenta.bold(
        "\n Here is a list of all the roles in the database. \n"
      )
    );
    console.table(res);

    init();
  });
}
function viewEmps() {
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    console.log(
      chalk.magenta.bold(
        "\n Here is a list of all the employees in the database. \n"
      )
    );
    console.table(res);

    init();
  });
}
