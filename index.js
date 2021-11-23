const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

init();

function init() {
  doTheThing();
}

function doTheThing() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
        },
        {
          name: "View All Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "Remove Role",
          value: "REMOVE_ROLE"
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT"
        },
        {
          name: "View Total Utilized Budget By Department",
          value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]).then(res => {
    let choice = res.choice;
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        viewEmployeesByDepartment();
        break;
      case "VIEW_EMPLOYEES_BY_MANAGER":
        viewEmployeesByManager();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "REMOVE_EMPLOYEE":
        removeEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      case "UPDATE_EMPLOYEE_MANAGER":
        updateEmployeeManager();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "REMOVE_DEPARTMENT":
        removeDepartment();
        break;
      case "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT":
        viewUtilizedBudgetByDepartment();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "REMOVE_ROLE":
        removeRole();
        break;
      default:
        quit();
    }
  })
}

function viewEmployees() {
  db.findAllEmployees()
    .then(([employees]) => {
      console.log("\n");
      console.table(employees);
    })
    .then(() => doTheThing());
}

function viewEmployeesByDepartment() {
  db.findAllDepartments()
    .then(([departments]) => {
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Which department would you like to view?",
          choices: departmentChoices
        }
      ])
        .then(res => db.findAllEmployeesByDepartment(res.departmentId))
        .then(([employees]) => {
          console.log("\n");
          console.table(employees);
        })
        .then(() => doTheThing())
    });
}

function viewEmployeesByManager() {
  db.findAllEmployees()
    .then(([managers]) => {
      const managerChoices = managers.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
      prompt([
        {
          type: "list",
          name: "managerId",
          message: "Which employee do you want to see direct reports for?",
          choices: managerChoices
        }
      ])
        .then(res => db.findAllEmployeesByManager(res.managerId))
        .then(([employees]) => {
          console.log("\n");
          if (employees.length === 0) {
            console.log("This employee is UNMANAGED!! [panic]");
          } else {
            console.table(employees);
          }
        })
        .then(() => doTheThing())
    });
}

function removeEmployee() {
  db.findAllEmployees()
    .then(([employees]) => {
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee do you want to remove?",
          choices: employeeChoices
        }
      ])
        .then(res => db.removeEmployee(res.employeeId))
        .then(() => console.log("FIRE'D."))
        .then(() => doTheThing())
  })
}

function updateEmployeeRole() {
  db.findAllEmployees()
    .then(([employees]) => {
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee's role do you want to update?",
          choices: employeeChoices
        }
      ])
        .then(res => {
          let employeeId = res.employeeId;
          db.findAllRoles()
            .then(([roles]) => {
              const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
              }));
              prompt([
                {
                  type: "list",
                  name: "roleId",
                  message: "Which role do you want to assign the selected employee?",
                  choices: roleChoices
                }
              ])
                .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                .then(() => console.log("Promoted! Or Demoted!??"))
                .then(() => doTheThing())
            });
        });
  })
}

function updateEmployeeManager() {
  db.findAllEmployees()
    .then(([employees]) => {
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee's manager do you want to sack?",
          choices: employeeChoices
        }
      ])
        .then(res => {
          let employeeId = res.employeeId
          db.findAllPossibleManagers(employeeId)
            .then(([managers]) => {
              const managerChoices = managers.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
              }));
              prompt([
                {
                  type: "list",
                  name: "managerId",
                  message:
                    "Which employee do you want to set as manager for the selected employee?",
                  choices: managerChoices
                }
              ])
                .then(res => db.updateEmployeeManager(employeeId, res.managerId))
                .then(() => console.log("Personal overlord designated!"))
                .then(() => doTheThing())
          })
      })
    })
}

function viewRoles() {
  db.findAllRoles()
    .then(([roles]) => {
      console.log("\n");
      console.table(roles);
    })
    .then(() => doTheThing());
}

function addRole() {
  db.findAllDepartments()
    .then(([departments]) => {
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));
      prompt([
        {
          name: "title",
          message: "What is the name of the role?"
        },
        {
          name: "salary",
          message: "What is the salary for this role?"
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does this role belong to?",
          choices: departmentChoices
        }
      ])
      .then(role => {
        db.createRole(role)
          .then(() => console.log(`Added ${role.title} to the database`))
          .then(() => doTheThing())
      })
    })
}

function removeRole() {
  db.findAllRoles()
    .then(([roles]) => {
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }));
      prompt([
        {
          type: "list",
          name: "roleId",
          message:
            "Who do you want to fire, Michael?",
          choices: roleChoices
        }
      ])
        .then(res => db.removeRole(res.roleId))
        .then(() => console.log("Sack'd!"))
        .then(() => doTheThing())
  })
}

function viewDepartments() {
  db.findAllDepartments()
    .then(([departments]) => {
      console.log("\n");
      console.table(departments);
    })
    .then(() => doTheThing());
}

function addDepartment() {
  prompt([
    {
      name: "name",
      message: "What is the name of this department?"
    }
  ])
    .then(res => {
      let name = res;
      db.createDepartment(name)
        .then(() => console.log(`Created ${name.name} Department`))
        .then(() => doTheThing())
  })
}

function removeDepartment() {
  db.findAllDepartments()
    .then(([departments]) => {
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));
      prompt({
        type: "list",
        name: "departmentId",
        message:
          "Which branch would you like to close, Michael?",
        choices: departmentChoices
      })
        .then(res => db.removeDepartment(res.departmentId))
        .then(() => console.log(`Department removed!`))
        .then(() => doTheThing())
  })
}

function viewUtilizedBudgetByDepartment() {
  db.viewDepartmentBudgets()
    .then(([departments]) => {
      console.log("\n");
      console.table(departments);
    })
    .then(() => doTheThing());
}

function addEmployee() {
  prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ])
  .then(res => {
    let firstName = res.first_name;
    let lastName = res.last_name;

    db.findAllRoles()
      .then(([roles]) => {
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id
        }));
        prompt({
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: roleChoices
        })
          .then(res => {
            let roleId = res.roleId;

            db.findAllEmployees()
              .then(([employees]) => {
                const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                  name: `${first_name} ${last_name}`,
                  value: id
                }));
                managerChoices.unshift({ name: "None", value: null });

                prompt({
                  type: "list",
                  name: "managerId",
                  message: "Who is the employee's manager?",
                  choices: managerChoices
                })
                  .then(res => {
                    let employee = {
                      manager_id: res.managerId,
                      role_id: roleId,
                      first_name: firstName,
                      last_name: lastName
                    }
                    db.createEmployee(employee);
                  })
                  .then(() => console.log(`${firstName} ${lastName} is hired!`))
                .then(() => doTheThing())
            })
          })
        })
      })
}

function quit() {
  console.log("Goodbye.");
  process.exit();
}