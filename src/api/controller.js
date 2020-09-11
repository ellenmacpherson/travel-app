const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {
    var service = require('./service.js');
    const reqURL = url.parse(req.url, true);

    // GET Endpoints
    if (reqURL.pathname =='/place' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqURL.pathname);
        service.placeRequest(req, res);
    } 
    else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqURL.pathname);

        service.invalidRequest(req, res);

    }
});