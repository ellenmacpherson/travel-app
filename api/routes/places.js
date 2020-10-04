// Hold-all for routers that contribute API methods.
const restana = require('restana');
const service = restana();

const places = service.newRouter();

places.get('/places', (req, res) => {
    const db = require('../db').connect;
    var sqlQuery = "SELECT * FROM Places;";

    db.query(sqlQuery, (err, result) => {
        if (err) throw err;
        res.statusCode = 200;
        //res.setHeader('Content-Type', 'application/json');
        //res.end(JSON.stringify(result, null, 3));
        res.send(result);
    })
});

places.get('/places/:name', (req, res) => {
    
    const db = require('../db').connect;
    var sqlQuery = "SELECT * FROM Places WHERE PlaceName = ?;";
    db.query(sqlQuery, [decodeURI(req.params.name)], (err, result) => {
        if (err) throw err;
        res.statusCode = 200;
        res.send(result);
    })
})

places.post('/places/create', (req, res) => {
    console.log('Post request received.');
    var restext = "POST request contains: "
    restext += req.body.create_place_name
    restext += " and "
    restext += req.body.create_place_url
    res.send(restext)
})

module.exports = places;