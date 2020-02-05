const router = require('express').Router();
const conn = require(__basedir + '/mysql');

router.get('/:userId/info', (req, res, next) => {
    let query = "SELECT * FROM `users` WHERE userId = ?";
    conn.query(query, req.params.userId, (err, data) => {
        if(err) return next(err);
        res.send(data[0]);
        next();
    })
});

router.get('/info', (req, res, next) => {
    res.status(200).json(req.user);
    return next();
});

router.delete('/:userId', (req, res, next) => {
    let query = "DELETE FROM `users` WHERE userId = ?";
    conn.query(query, req.params.userId, (err, data) => {
        if(err) return next(err);
        res.send(data);
        return next();
    })
});

module.exports = router;