
const hostname = process.env.APP_HOST;
const backport = process.env.API_PORT;

const server = require('./controller.js');

module.exports = server.listen(backport, hostname, () => {
    console.log(`API listening at http://${hostname}:${backport}/`);
});