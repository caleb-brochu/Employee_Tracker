DROP DATABASE company;

CREATE DATABASE  company;

USE company;

CREATE TABLE department(
    id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(30) NOT NULL,
    PRIMARY KEY (id),
    department_id INT(20) NOT NULL,
    FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id),
    role_id INT(20) NOT NULL,
    FOREIGN KEY(role_id) REFERENCES role(id),
    manager VARCHAR(50)
);



SELECT employee.id, first_name, last_name, title, department.name, manager
FROM employee INNER JOIN role 
ON employee.role_id = role.id
INNER JOIN department 
ON role.department_id = department.id
WHERE department.name = "Sales"
ORDER BY employee.id;