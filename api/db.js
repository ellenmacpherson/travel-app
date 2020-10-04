const mysql = require('mysql');

exports.connect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_BASIC_USER,
    password: process.env.DB_BASIC_PASS,
    database: process.env.DB_NAME
});