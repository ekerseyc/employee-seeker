const options = [
    // Main Selection Menu
    {
        type: 'list',
        message: 'Please Select an Option',
        name: 'mainMenu',
        choices: [
            { value: 'View All Departments' },
            { value: 'View All Roles' },
            { value: 'View All Employees' },
            new inquirer.Separator(),
            { value: 'Add a Department' },
            { value: 'Add a Role' },
            { value: 'Add an Employee' },
            { value: 'Update an Employee Role' },
        ]
    },
    // Add Department Questions
    {
        type: 'input',
        message: 'Please enter the new department name',
        name: 'newDept',
        when: (options) => {
            if (options.mainMenu === 'Add a Department') {
                return true;
            }
        }
    },
    // Add Role Questions
    {
        type: 'input',
        message: 'Please enter the new role name',
        name: 'newRole',
        when: (options) => {
            if (options.mainMenu === 'Add a Role') {
                return true;
            }
        }
    },
    {
        type: 'input',
        message: 'Please enter the salary for the new role (numbers only, no commas)',
        name: 'salary',
        when: (options) => {
            if (options.newRole) {
                return true;
            }
        }
    },
    {
        type: 'list',
        message: 'Please select the department this role is in',
        name: 'roleDept',
        choices: [
            { value: 'Sales' },
            { value: 'Engineering' },
            { value: 'Finance' },
            { value: 'Public Relations' },
        ],
        when: (options) => {
            if (options.newDept) {
                return true;
            }
        }
    },
    // Add New Employee Questions
    {
        type: 'input',
        message: 'Please enter the employee\'s first name',
        name: 'employeeFirst',
        when: (options) => {
            if (options.mainMenu === 'Add an Employee') {
                return true;
            }
        }
    },
    {
        type: 'input',
        message: 'Please enter the employee\'s last name',
        name: 'employeeLast',
        when: (options) => {
            if (options.employeeFirst) {
                return true;
            }
        }
    },
    {
        type: 'input',
        message: 'Please enter the employee\'s role',
        name: 'employeeRole',
        when: (options) => {
            if (options.employeeLast) {
                return true;
            }
        }
    },
    {
        type: 'input',
        message: 'Please enter the employee\'s manager',
        name: 'employeeManager',
        when: (options) => {
            if (options.employeeLast) {
                return true;
            }
        }
    },
    // Update an employee
];