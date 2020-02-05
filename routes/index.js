const routes = require('express').Router();
const jwt = require('jsonwebtoken');
const users = require('./users');
const events = require('./events');
const login = require('./login');

const secret = process.env.AUTH_SECRET;

routes.use('/login', login);
routes.use('/users', requireJwt, users);
routes.use('/events', requireJwt, events);

function requireJwt(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).json({error: "Unauthorized"});
    }
    try{
        let decode = jwt.verify(req.headers.authorization.substring(7), secret);
        req.user = decode;
    }
    catch(err) {
        return res.status(403).json({error: "Forbidden"});
    }
    return next();
}

module.exports = routes;