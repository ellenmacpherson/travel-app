// The main .js file for the app => launches the server.
const dotenv = require('dotenv');
dotenv.config();

const path = require('path')
const files = require('serve-static')
const http = require('http');
const bodyParser = require('body-parser'); // Required for POST methods
const morgan = require('morgan');
const restana = require('restana');

const hostname = process.env.APP_HOST;
const port = process.env.APP_PORT;

const service = restana(); // init the API
const backend = require('./api/routers'); // Init API router which connects database stuff
service.use(bodyParser.urlencoded({extended: false}));
service.use(morgan('short')); // Set default middleware
service.use('/db', backend); // add database API methods to /db path

service.use('/', files(path.join(__dirname, 'src'))); // Serve webpages from src dir.

service.start(port, hostname).then((server) => {
    console.log(`App server started on http://${hostname}:${port}/`);
});