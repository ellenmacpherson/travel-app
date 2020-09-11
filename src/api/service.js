const url = require('url');

exports.placeRequest = function (req, res) {
    const reqURL = url.parse(req.url, true);

    var name = 'none';
    if (reqURL.query.name) {
        name = reqURL.query.name
    }

    var response = {
        'text': 'Hello ' + name
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
};

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};
