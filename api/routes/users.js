const restana = require('restana');
const service = restana();
var fs = require('fs');

const users = service.newRouter();

users.get('/login', (req, res) => {
    fs.readFile('./src/login.html', function(err, contents) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(contents);
        res.end();
        
      });
});

users.post('/login', (req, res) => {
    const {name, password} = req.body;
    res.end()
})

module.exports = users;