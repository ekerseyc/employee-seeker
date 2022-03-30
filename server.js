const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'employee_db'
});

db.connect(function (err) {
    if (err) throw err;
    console.log('Connection Successful!');
    console.log('Welcome to the Cool Company Employee Database!');
    startMenu();
});



function startMenu() {
    return inquirer
        .prompt([
            {
                type: 'list',
                message: 'Please Select an Option',
                name: 'options',
                choices: [
                    { value: 'View All Departments' },
                    { value: 'View All Roles' },
                    { value: 'View All Employees' },
                    new inquirer.Separator(),
                    { value: 'Add a Department' },
                    { value: 'Add a Role' },
                    { value: 'Add an Employee' },
                    { value: 'Update an Employee Role' },
                    { value: 'Exit' },
                ]
            },
        ])

        .then(function (response) {
            switch (response.options) {
                case 'View All Departments':
                    viewDept();
                    break;

                case 'View All Roles':
                    viewRoles();
                    break;

                case 'View All Employees':
                    viewEmployees();
                    break;

                case 'Add a Department':
                    addDept();
                    break;

                case 'Add a Role':
                    addRole();
                    break;

                case 'Add an Employee':
                    addEmployee();
                    break;

                case 'Update an Employee Role':
                    updateRole();
                    break;

                case 'Exit':
                    db.end();
                    break;
            }
        });
    function viewDept() {
        db.query(`SELECT * FROM department`, function (err, results) {
            if (err) {
                console.log(err);
            };
            console.table(results);
            startMenu();
        });
    };
};
function viewRoles() {
    db.query(`SELECT * FROM role`, function (err, results) {
        if (err) {
            console.log(err);
        };
        console.table(results);
        startMenu();
    });
};
function viewEmployees() {
    db.query(`SELECT * FROM employee`, function (err, results) {
        if (err) {
            console.log(err);
        };
        console.table(results);

        startMenu();
    });
};
// add department
const addDept = () => {
    inquirer.prompt(
        [
            {
                message: 'Enter department name',
                name: 'dept_name'
            }
        ]
    ).then((answers) => {
        db.query(
            'INSERT INTO department (dept_name) VALUES (?)',
            [answers.dept_name],
            (err, results) => {
                startMenu();
            }
        );
    }
    );
}

// add role
const addRole = () => {
    db.query(
        `SELECT id AS value, dept_name AS name FROM department`, (err, departments) => {
            if (err) console.log(err);

            inquirer.prompt(
                [
                    {
                        message: 'Enter role title',
                        name: 'title'
                    },
                    {
                        message: 'Enter salary amount',
                        name: 'salary'
                    },
                    {
                        message: 'Choose department',
                        type: 'rawlist',
                        name: 'dept',
                        choices: departments
                    },
                ]
            ).then((answers) => {
                db.query(
                    'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',
                    [answers.title, answers.salary, answers.dept],
                    (err, results) => {
                        if (err) console.log(err);
                        console.log(answers);
                        startMenu();
                    }
                );
            }
            )
        });
}
// add employee
const addEmployee = () => {
    db.query(
        `SELECT id AS value, title AS name FROM role`, (err, roles) => {
            if (err) console.log(err);

            inquirer.prompt(
                [
                    {
                        message: 'Enter first name',
                        name: 'first_name'
                    },
                    {
                        message: 'Enter last name',
                        name: 'last_name'
                    },
                    {
                        message: 'Choose role',
                        type: 'rawlist',
                        name: 'role',
                        choices: roles
                    },
                ]
            ).then((answers) => {
                db.query(
                    'INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)',
                    [answers.first_name, answers.last_name, answers.role],
                    (err, results) => {
                        if (err) console.log(err);
                        console.log(answers);
                        startMenu();
                    }
                );
            }
            )
        });
}
// change role
const updateRole = () => {
    var roleResults;
    db.query(
        `SELECT id AS value, title AS name FROM role`, (err, roles) => {
            if (err) {
                console.log(err)
                return;
            }
            roleResults = roles;
        });
    db.query(
        `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`, (err, employees) => {
            if (err) console.log(err);
            inquirer.prompt(
                [
                    {
                        message: 'Choose employee',
                        type: 'rawlist',
                        name: 'employees',
                        choices: employees
                    },
                    {
                        message: 'Choose new role',
                        type: 'rawlist',
                        name: 'role',
                        choices: roleResults
                    },
                ]
            ).then((answers) => {
                var employeeName = answers.employees.split(' ');
                var employeeFirstName = employeeName[0];
                var employeeLastName = employeeName[employeeName.length - 1];

                db.query(
                    'UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?',
                    [answers.role, employeeFirstName, employeeLastName],
                    (err, results) => {
                        if (err) console.log(err);
                        console.log(results);
                        startMenu();
                    }
                );
            }
            )
        });
}