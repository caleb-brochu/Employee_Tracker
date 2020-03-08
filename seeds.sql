INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Leagal");
INSERT INTO department (name) VALUES ("IT");

INSERT INTO role(title, salary, department_id) VALUES ("Sales Person", 90000, 1);
INSERT INTO role(title, salary, department_id) VALUES ("Sales Manager", 175000, 1);
INSERT INTO role(title, salary, department_id) VALUES ("Engineer Manager", 200000, 2);
INSERT INTO role(title, salary, department_id) VALUES ("Software Engineer", 110000, 2);
INSERT INTO role(title, salary, department_id) VALUES ("Accountant", 120000, 3);
INSERT INTO role(title, salary, department_id) VALUES ("Finance Lead", 300000, 3);
INSERT INTO role(title, salary, department_id) VALUES ("Lawyer", 190000, 4);
INSERT INTO role(title, salary, department_id) VALUES ("Leagal Team Lead", 350000, 4);
INSERT INTO role(title, salary, department_id) VALUES ("Administator", 90000, 5);
INSERT INTO role(title, salary, department_id) VALUES ("Lead IT", 90000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager) VALUES ("John", "Smith", 10, null);
INSERT INTO employee(first_name, last_name, role_id, manager) VALUES ("Mike", "Blumburg", 9, "John Smith");
INSERT INTO employee(first_name, last_name, role_id, manager) VALUES ("Joe", "Biden", 8, "Burnie Sanders");
INSERT INTO employee(first_name, last_name, role_id, manager) VALUES ("Burnie", "Sanders", 7, null);
INSERT INTO employee(first_name, last_name, role_id, manager) VALUES ("Elizabeth", "Warren", 6, null);
INSERT INTO employee(first_name, last_name, role_id, manager) VALUES ("Andrew", "Chan", 5, "Elizabeth Warren");
INSERT INTO employee(first_name, last_name, role_id, manager) VALUES ("Elon", "Musk", 4, "Bill Gates");
INSERT INTO employee(first_name, last_name, role_id, manager) VALUES ("Bill", "Gates", 3, null);
INSERT INTO employee(first_name, last_name, role_id, manager) VALUES ("Paul", "Alen", 2, "Mark Zuckerburg");
INSERT INTO employee(first_name, last_name, role_id, manager) VALUES ("Mark", "Zuckerberg", 1, null);