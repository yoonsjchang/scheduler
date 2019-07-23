const events = require('express').Router();

events.get('/', (req, res) => {
    res.send('events here');
});

events.get('/:id', (req, res) => {
    
});

module.exports = events;