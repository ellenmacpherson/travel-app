// Hold-all for routers that contribute API methods.
const restana = require('restana');
const service = restana();

const places = service.newRouter();

places.get('/places', (req, res) => {
    res.send('Hello world!');
});

places.get('/places/:name', (req, res) => {
    res.send('Hello there, '+req.params.name)
})

module.exports = places;