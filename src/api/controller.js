const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {
    var service = require('./service.js');
    var place = require('./routes/place.js');
    const reqURL = url.parse(req.url, true);

    // GET Endpoints
    if (reqURL.pathname == '/api/place' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqURL.pathname);
        place.getAll(req, res);
    } 
    else if (reqURL.pathname == '/api/place/' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqURL.pathname);
        place.get(req, res);
    }
    else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqURL.pathname);

        service.invalidRequest(req, res);

    }
});