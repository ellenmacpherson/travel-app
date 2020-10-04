// Hold-all for routers that contribute API methods.
const restana = require('restana');
const service = restana();
// Create an api router that other routers will feed into, to be passed on in export
const api = service.newRouter();

const places = require('./routes/places');
api.use('/db', places);

module.exports = api;