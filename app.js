require('dotenv').config()
const http = require('http');
var fs = require('fs');

const hostname = process.env.APP_HOST;
const port = process.env.APP_PORT;

//Boot up the API/backend
const API = require('./src/api/server.js');

fs.readFile('index.html', (err, html) => {
  if (err) {
    throw err;
  }
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
  
  server.listen(port, hostname, () => {
    console.log(`App server started on http://${hostname}:${port}/`);
  });
});