const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "company"
  });

connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
});

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
                    'View employees?',
                    'Update employee role?'
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
                add_department();
                break;

            case 'Add a role?':
                add_role();
                break;
                
            case 'Add an employee?':
                add_employee();
                break;
            case 'View a department?':
                inquirer.prompt(
                    [
                        {
                            type: 'rawlist',
                            message: 'What department would you like to view?',
                            name: 'department',
                            choices: department_list()
                        }
                    ]
                ).then(function(res) {
                    //Add function to add department to database 
                    console.log(res); 
                    view_department(res.department);
                    
                });
                break;
            case 'View a role?':
                inquirer.prompt(
                    [
                        {
                            type: 'rawlist',
                            message: 'What role would you like to view?',
                            name: 'role',
                            choices: role_list()
                        }
                    ]
                ).then(function(res) {
                    //Add function to add department to database 
                    console.log(res); 
                    view_role(res.role);
                
                });
                break;
            case 'View employees':
                inquirer.prompt(
                    [
                        {
                            type: 'rawlist',
                            message: 'What employee would you like to view?',
                            name: 'employee',
                            choices: employee_list()
                        }
                    ]
                ).then(function(res) {
                    //Add function to add department to database  
                    console.log(res);
                    view_employee(res.employee);
                    
                });
                break;
            // case 'Update employee role':
            //     inquirer.prompt(
            //         [
            //             {
            //                 type: "list"

            //             }
            //         ]
            //     )
            //     break;
        };
        
    })
};


function add_department(){
    //This function will add department to the database.
    
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
        const querySQL = "INSERT INTO department SET ?";
        const department = {name: res.add_dep}
        connection.query(querySQL, department, function(err){
            if (err) throw err;
            console.log("New department successflly added!");
            company_directory();
        });
    });   
};

function add_role(){
    //This function will add role to database.
    const queryDep = "SELECT * FROM department"
    
    connection.query(queryDep, function(err,data){
        if (err) throw err;
        const departments = [];
      
        for(let i = 0; i < data.length; i++){
            departments.push(data[i].name);
        };

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
                    choices: departments
                }
            ]
        ).then(function(res) {
            //Add function to add role to database
            const querySQL = "INSERT INTO role SET ?"
            let dep_id = "";
            for(let i = 0; i < data.length; i++){
                if(data[i].name === res.dep_list){
                    dep_id = data[i].id;
                };
            };    
            console.log(dep_id);
            const role = { title: res.title, salary: res.salary, department_id: dep_id}
            
            connection.query(querySQL, role,function(err){
                    if (err) throw err;
                    console.log("New role successflly added!");
                    company_directory();
                }
            );
        }); 
    });
};  

function add_employee(){
    //This function will add role to database.
    const queryRole = "SELECT * FROM role"
    
    connection.query(queryRole, function(err, role_data){
        if (err) throw err;
        const roles = [];
        for(let i = 0; i < role_data.length; i++){
            roles.push(role_data[i].title);
        };
    
        const queryManager = "SELECT * FROM employee";
        connection.query(queryManager, function(err, manager_data){
            if (err) throw err;
            const managers = [];
            for(let i = 0; i < manager_data.length; i++){
                managers.push(`${manager_data[i].first_name} ${manager_data[i].last_name}`);
            };
            console.log(managers);
        
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
                        type: 'rawlist',
                        message: 'What is the employees role?',
                        name: 'title',
                        choices: roles
                    },
                    {
                        type: 'rawlist',
                        message: 'Who is the employees manager?',
                        name: 'manager',
                        choices: managers
                    },
                ]

            ).then(function(res) {
                //Add function to add role to database
                const querySQL = "INSERT INTO employee SET ?"
                let role_id = "";
                let manager_id = "";
                for(let i = 0; i < role_data.length; i++){
                    if(role_data[i].title === res.title){
                        role_id = role_data[i].id;
                    };
                }; 
  
                console.log(role_id);
                const role = { first_name: res.first_name, last_name: res.last_name, role_id: role_id, manager: res.manager}
                
                connection.query(querySQL, role,function(err){
                        if (err) throw err;
                        console.log("New Employee successflly added!");
                        company_directory();
                    }
                );
            }); 
        });    
    });
};  

function role_list(){
    //This function will get list of available roles (titles).
};

function view_role(title){
    //This function will return the role selected 
}

// ------ Manager related Functions--------
function manager_list(){
    //This function will get the list of available managers
};

// ------ Employee related Functions--------
function employee_list(){
    //This function will get the list of available managers
};


company_directory();