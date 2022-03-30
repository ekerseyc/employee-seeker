USE employee_db;

INSERT INTO department (id, dept_name) 
VALUES 
(1, 'Sales'),
(2, 'Engineering'),
(3, 'Finance'),
(4, 'Public Relations');

INSERT INTO `role` (department_id, title, salary) 
VALUES 
(1, 'Sales Manager', 100000),
(1, 'Sales Consultant', 40000),
(2, 'Lead Engineer', 180000),
(2, 'Hardware Engineer', 140000),
(3, 'Accountant', 122000),
(3, 'Account Manager', 135000),
(4, 'PR Legal Consultant', 250000),
(4, 'Social Media Manager', 30000);

INSERT INTO employee (manager_id, first_name, last_name, role_id) 
VALUES 
(NULL, 'Wooyoung', 'Jang', 1),
(NULL, 'Barry', 'White', 2),
(NULL, 'Goldie', 'Hawn', 3),
(NULL, 'Mary', 'Poppins', 4),
(NULL, 'Reba', 'McEntire', 5),
(NULL, 'Tom', 'Collins', 6),
(NULL, 'Phoenix', 'Wright', 7),
(NULL, 'Minjun', 'Kim', 8);