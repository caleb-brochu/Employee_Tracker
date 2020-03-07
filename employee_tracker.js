const inquirer = require('inquirer');

function company_directory() {
    inquirer.prompt(
        [
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'todo',
                choices: [
                    'Add a department?',
                    'Add a role?',
                    'Add an employee?',
                    'View a department?',
                    'View a role?',
                    'View employees',
                    'Update employee roll'
                    //'Update employee manager?'
                    //'View employees by manager?'
                    //'Delete a department?',
                    //'Delete a role?',
                    //'Delete an employee?',
                    //'View budget by department?'
                ]
            }
        ]
    ).then(function(res) {
        switch(res.todo ) {
            case "Add a department?":

            inquirer.prompt(
                [
                    {
                        type: 'input',
                        message: 'What department would you like to add?',
                        name: 'add_dep'
                    }
                ]
            ).then(function(res) {
                //Add function to add department to database  
                add_department(res.add_dep);
                company_directory();
            });

            case 'Add a role?':
                inquirer.prompt(
                    [
                        {
                            type: 'input',
                            message: 'What role would you like to add?',
                            name: 'title'
                        },
                        {
                            type: 'input',
                            message: 'What is the salary for this role?',
                            name: 'salary'
                        },
                        {
                            type: 'list',
                            message: 'What is the salary for this role?',
                            name: 'dep_list',
                            choices: [department_list()]
                        },
                    ]
                ).then(function(res) {
                    //Add function to add role to database
                    add_role(res.title, res.salary, res.department); 
                    company_directory();
                });
            case 'Add an employee?':
                inquirer.prompt(
                    [
                        {
                            type: 'input',
                            message: 'What is the employees first name?',
                            name: 'first_name'
                        },
                        {
                            type: 'input',
                            message: 'What is the employees last name?',
                            name: 'last_name'
                        },
                        {
                            type: 'list',
                            message: 'What is the employees role?',
                            name: 'role',
                            choices: [role_list()]
                        },
                        {
                            type: 'list',
                            message: 'Who is the employees manager?',
                            name: 'role',
                            choices: [manager_list()]
                        },
                    ]
                ).then(function(res) {
                    //Add function to add department here 
                    console.log(`${res.add_dep} added!`)
                    company_directory();
                })
            case 'View a department?':
                inquirer.prompt(
                    [
                        {
                            type: 'list',
                            message: 'What department would you like to view?',
                            name: 'department',
                            choices:[view_department()]
                        }
                    ]
                ).then(function(res) {
                    //Add function to add department to database  
                    add_department(res.add_dep);
                    company_directory();
                });
            case 'View a role?':
            case 'View employees':
            case 'Update employee role':
        };
    
    });
};


// ------ Department related Functions--------
function add_department(department){
    //This function will add department to the database.
    console.log(`${department} added`)
};

function department_list(){
    //This function will get list of all available departments.
};

function view_department(){
    // This function will console log a table of department contents
}



// ------ Role related Functions--------
function add_role(title, salary, department){
    //This function will add role to database.
    console.log(`${title} added`)

};

function role_list(){
    //This function will get list of available roles (titles).
};


// ------ Manager related Functions--------
function manager_list(){
    //This function will get the list of available managers
};

// ------ Employee related Functions--------
function employee_list(){
    //This function will get the list of available managers
};


company_directory();