const events = require('express').Router();

events.get('/', (req, res) => {
    res.send('events here');
});

module.exports = events;