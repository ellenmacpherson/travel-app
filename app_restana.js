// The main .js file for the app => launches the server.
require('dotenv').config()

var fs = require('fs');
const http = require('http');
const morgan = require('morgan');
const restana = require('restana');

const hostname = process.env.APP_HOST;
const port = process.env.APP_PORT;

const service = restana();
const places = require('./src/api/routers');
service.use(morgan('combined'));
service.use('/db', places);

service.get('/', async (req, res) => {
    fs.readFile('index.html', (err, html) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/html');
        res.write(html);
        res.end();
    });
});

//service.start(process.env.API_PORT).then((server) => {});

const server = http.createServer(service.callback());
server.listen(port, hostname, () => {
    console.log(`App server started on http://${hostname}:${port}/`);
});