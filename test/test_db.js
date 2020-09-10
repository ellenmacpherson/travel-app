require('dotenv').config()

var expect = require('chai').expect;

const mysql = require('mysql');

describe('Test DB interactions.', function(){
    var connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_TEST_USER,
        password: process.env.DB_TEST_PASS
    });

    it('Initial server response should contain OkPacket...', function(done){
        
        connection.connect((err, result) => {
            if (err) throw err;
            expect(result.constructor.name).to.equal("OkPacket");
            done();
        });
    });

    it('Test database creation...', function(done){
        var sqlquery = "CREATE DATABASE IF NOT EXISTS test_db";
        connection.query(sqlquery, (err, result) => {
            if (err) throw err;
            done();
        })
    })

    it('Create a table...', function(done){
        var sqlquery = "CREATE TABLE IF NOT EXISTS test_db.things (name VARCHAR(20), job VARCHAR(20), success BOOL)";
        connection.query(sqlquery, (err, result) => {
            if (err) throw err;
            done();
        })
    })

    it('Populate table with data...', function(done){
        var sqlquery = "INSERT INTO test_db.things (name, job, success) VALUES ?;";
        var entries = [
            ['Alice', 'sender', 1],
            ['Bob', 'receiver', 1],
            ['Eve', 'eavesdropper', 0]
        ];
        connection.query(sqlquery, [entries], (err, result) => {
            if (err) throw err;
            expect(result.affectedRows).to.equal(entries.length);
            done();
        })
    })

    it('Request information from DB...', function(done){
        var sqlquery = "SELECT success FROM test_db.things WHERE name='Eve';";
        connection.query(sqlquery, (err, result, fields) => {
            if (err) throw err;
            expect(result[0].success).to.equal(0)
            done();
        })
    })

    it('Deconstruct the test database...', function(done){
        var sqlquery = "DROP DATABASE test_db;";
        connection.query(sqlquery, (err, result) => {
            if (err) throw err;
            done();
        })
    })
    
    it('Connection with server should close...', function(done){
        connection.end((err) => {
            if (err) throw err;
            // The connection is terminated gracefully
            // Ensures all remaining queries are executed
            // Then sends a quit packet to the MySQL server.
            done();
        });
    });
 });