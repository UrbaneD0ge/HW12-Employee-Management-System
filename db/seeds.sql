INSERT INTO department
  (name)
VALUES  ("Magical Engineering"),
        ("Unicorn Maintenance"),
        ("R&DnD"),
        ("Glitter Removal");

INSERT INTO role
  (title, salary, department_id)
VALUES  ("O Level Wizard", 10000, ),
        ("Wizrobe", 15000, 1),
        ("Lead Unicorn Mech", 20000, 2),
        ("Horn Sharpener", 25000, 2),
        ("Lv57 Neckbeard", 30000, 3),
        ("8 Eyed Spiderdweeb", 35000, 3),
        ("NaNaNaNaDustBuster", 40000, 4),
        ("Dr. Ectomy", 45000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);