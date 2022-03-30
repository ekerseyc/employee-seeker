const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

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
        `SELECT id AS value, dept_name AS name FROM department`, (err, departments) =>
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
            [answers.name, answers.department, answers.salary],
            (err, results) => {
                console.log(result);
                startMenu();
            }
        );
    }
    ));
}
// function addRole();
//     let departments = ['Unassigned'];
//         let questions = [
//             'Please enter the role\'s title',
//             'Please enter the role\'s salary (numbers only, no commas)',
//             'Please select the role\'s department'
//         ];
//         inquirer.prompt([
//             {
//                 type: 'input',
//                 name: 'role',
//                 message: questions[0]
//             },
//             {
//                 type: 'number',
//                 name: 'salary',
//                 message: questions[1]
//             },
//             {
//                 type: 'list',
//                 name: 'department',
//                 message: questions[2],
//                 choices: departments
//             }
//         ]).then((data) => {
//             let deptId = null;
//             for (let i = 0; i < results.length; i++) {
//                 if (results.name === data.department) {
//                 deptId = res[i].id;
//                 break;
//             }
//         }
//     })
    // add employee
    // change role