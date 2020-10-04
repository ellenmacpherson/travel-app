// The main .js file for the app => launches the server.
const dotenv = require('dotenv');
dotenv.config();

const path = require('path') // for filepath handling
const serveStatic = require('serve-static') // for serving webpages
const bodyParser = require('body-parser'); // for POST methods
const morgan = require('morgan'); // for console logging API requests
const restana = require('restana'); // for building the API

const hostname = process.env.APP_HOST;
const port = process.env.APP_PORT;

const service = restana(); // init the API
const backend = require('./api/routers'); // Init API router which connects database stuff
service.use(bodyParser.urlencoded({extended: false}));
service.use(morgan('short')); // Set default middleware
service.use('/db', backend); // add database API methods to /db path

var serve = serveStatic(path.join(__dirname, 'src'), {
    'dotfiles': 'ignore'
});
service.use('/', serve); // Serve webpages from src dir.

const users = require('./api/routes/users');
service.use('/', users)

service.start(port, hostname).then((server) => {
    console.log(`App server started on http://${hostname}:${port}/`);
});