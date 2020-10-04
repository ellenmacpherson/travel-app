// The main .js file for the app => launches the server.
require('dotenv').config()

var path = require('path')
// var fs = require('fs');
const files = require('serve-static')
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const restana = require('restana');

const hostname = process.env.APP_HOST;
const port = process.env.APP_PORT;

const service = restana(); // init the API
const backend = require('./src/api/routers'); // Init API router which connects database stuff
service.use(bodyParser.urlencoded({extended: false}));
service.use(morgan('short')); // Set default middleware
service.use('/db', backend); // add database API methods to /db path

const frontend = files(__dirname); // Using serve-static to serve webpages with restana
//const frontend = files(path.join(__dirname, 'public/'))

service.use('/', frontend) // Use webpages at API root.
//service.use('/', files(path.join(__dirname, 'public/')))

// service.get('/', async (req, res) => {
//     fs.readFile('index.html', (err, html) => {
//         res.statusCode = 200;
//         res.setHeader('Content-type', 'text/html');
//         res.write(html);
//         res.end();
//         res.
//     });
// });

//service.start(process.env.API_PORT).then((server) => {});

const server = http.createServer(service.callback());
server.listen(port, hostname, () => {
    console.log(`App server started on http://${hostname}:${port}/`);
});