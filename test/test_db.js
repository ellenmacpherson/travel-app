require('dotenv').config()

var expect = require('chai').expect;

const mysql = require('mysql');

describe('Test DB connectivity', function(){
    var connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_TEST_USER,
        password: process.env.DB_TEST_PASS
    });
    it('Server should respond with OkPacket...', function(done){
        
        connection.connect((err, result) => {
            if (err) throw err;
            expect(result.constructor.name).to.equal("OkPacket");
            done()
        });
    });
    it('Connection with server should close...', function(done){
        connection.end((err) => {
            // The connection is terminated gracefully
            // Ensures all remaining queries are executed
            // Then sends a quit packet to the MySQL server.
            done()
        });
    });
 });