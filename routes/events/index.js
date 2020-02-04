const router = require('express').Router();
const moment = require('moment');
const conn = require(__basedir + '/mysql');

//get current user's events
router.get('/myEvents', (req, res, next) => {
    conn.query("SELECT * FROM events INNER JOIN eventMap ON events.eventId = eventMap.eventId AND eventMap.userId = ?", [req.user.userId], (err, data) => {
        if(err) return next(err);
        res.send(data);
        return next();
    })
});

//get an event by id
router.get('/:eventId', (req, res, next) => {
    let query = "SELECT * FROM `events` WHERE eventId = ?";
    conn.query(query, req.params.eventId, (err, data) => {
        if(err) return next(err);
        res.send(data[0]);
        return next();
    })
});

router.post('/', (req, res, next) => {
    let query = "INSERT INTO events (name, start, end, createdBy, createdOn) VALUES (?, ?, ?, ?, ?)";
    let params = [req.body.eventName, req.body.startTime, req.body.endTime, req.user.userId, moment().format('YYYY-MM-DD HH:mm:ss')]
    conn.query(query, params, (err, data) => {
        if(err) return next(err);
        query = "INSERT INTO eventMap (eventId, userId) VALUES (?, ?)";
        params = [data.insertId, req.user.userId];
        conn.query(query, params, (err, data) => {
            if(err) return next(err);
            res.send("Successfully created new event.");
            return next();
        })
    })
})

//get a specified user's events
//should be an admin command
router.get('/users/:userId/events', (req, res, next) => {
    let query = "SELECT * FROM events INNER JOIN eventMap ON events.eventId = eventMap.eventId WHERE eventMap.userId = ?";
    let params = [req.params.userId];
    conn.query(query, params, (err, data) => {
        if(err) return next(err);
        res.send(data);
        return next();
    })
});

//remove a specified user's event
router.delete('/:eventId', (req, res, next) => {
    //Only the owner should be able to remove the event.
    let query = "DELETE FROM events WHERE eventId = ? AND createdBy = ?";
    let params = [req.params.eventId, req.user.userId];
    conn.query(query, params, (err, data) => {
        if(err) return next(err);
        if(data.affectedRows === 1) res.send("Deleted event " + req.params.eventId);
        else res.send("Failed to delete " + req.params.eventId);
        return next();
    })
});

module.exports = router;