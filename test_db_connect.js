require('dotenv').config()

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

connection.end((err) => {
    // The connection is terminated gracefully
    // Ensures all remaining queries are executed
    // Then sends a quit packet to the MySQL server.
  });