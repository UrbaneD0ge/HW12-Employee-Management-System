// require mysql2
const mysql = require('mysql2');

// Connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Root123',
      database: 'employees_db'
    },
    console.log(`Connected to the employee database.`)
);

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;