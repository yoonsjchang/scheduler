const router = require('express').Router();
const conn = require(__basedir + '/mysql')

//get current user's events
router.get('/', (req, res, next) => {
    res.send('events here');
    next();
});

//get an event by id
router.get('/:eventId', (req, res, next) => {
    let query = "SELECT * FROM `events` WHERE eventId = ?";
    conn.query(query, req.params.eventId, (err, data) => {
        if(err) return next(err);
        res.send(data[0]);
        next();
    })
});

//get a specified user's events
router.get('/users/:userId/events', (req, res, next) => {
    next();
});

//add an event for a specified user
router.post('/users/:userId/events', (req, res, next) => {
    next();
});

//remove a specified user's event
router.delete('/users/:userId/events/:eventId', (req, res, next) => {
    next();
});

module.exports = router;