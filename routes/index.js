const routes = require('express').Router();
const users = require('./users');
const events = require('./events');
const bodyParser = require('body-parser');

routes.get('/', (req, res) => {
    res.send("Testing new");
});

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded());
routes.use('/users', users);
routes.use('/events', events);

module.exports = routes;