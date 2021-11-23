// Require console.table
const table = require('console.table');
// require mysql2
const mysql = require('mysql2');
// require inquirer
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Root123',
      database: 'movies_db'
    },
    console.log(`Connected to the employee database.`)
  );

