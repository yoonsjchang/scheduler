const users = require('express').Router();

users.get('/', (req, res) => {
    res.send("user here");
});

module.exports = users;