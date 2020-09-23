// Place related API methods
const url = require('url');
const mysql = require('mysql');

exports.getAll = function(req, res) {
    const reqURL = url.parse(req.url, true);

    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_BASIC_USER,
        password: process.env.DB_BASIC_PASS,
        database: process.env.DB_NAME
    });

    var name = reqURL.query.name;

    var sqlQuery = "SELECT * FROM Places;";

    connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result, null, 3));
    })
};

exports.get = function(req, res) {
    const reqURL = url.parse(req.url, true);
    //console.log('Fetching details for place: ' + req.params.id)
    
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_BASIC_USER,
        password: process.env.DB_BASIC_PASS,
        database: process.env.DB_NAME
    });

    var sqlQuery = "SELECT * FROM Places";

    if (reqURL.query.name) {
        var name = reqURL.query.name;
        sqlQuery += " WHERE PlaceName=?;";
    }

    sqlQuery += ";"

    connection.query(sqlQuery, [name], (err, result) => {
        if (err) throw err;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
    })
    
};

exports.post = function(req, res) {
    const reqURL = url.parse(req.url, true);

    body = "";

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {
        postBody = JSON.parse(body);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
    });
};