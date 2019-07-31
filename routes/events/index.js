const events = require('express').Router();
const conn = require(__dirname + '/../../mysql')

events.get('/', (req, res) => {
    res.send('events here');
});

events.get('/:id', (req, res) => {
    let query = "SELECT * FROM `events` WHERE eventId = ?";
    conn.query(query, req.params.id, (err, data) => {
        if(err) return res.send(err);
        res.send(data);
    })
});

module.exports = events;