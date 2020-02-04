const routes = require('express').Router();
const jwt = require('jsonwebtoken');
const users = require('./users');
const events = require('./events');
const login = require('./login');

const secret = '8h3qouLp9woP67xFO9TM';
routes.use('/login', login);
routes.use((req, res, next) => {
    if(!req.headers.authorization) {
        res.status(401).json({error: "Unauthorized"});
        return next();
    }
    try{
        let decode = jwt.verify(req.headers.authorization.substring(7), secret);
        req.user = decode;
    }
    catch(err) {
        res.status(403).json({error: "Forbidden"});
    }
    return next();
});

routes.use('/users', users);
routes.use('/events', events);

module.exports = routes;