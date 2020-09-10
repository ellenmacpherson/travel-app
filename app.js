const http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  fs.readFile('index.html', function(err, contents) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(contents);
    res.end();
  });
  }).listen(8080);