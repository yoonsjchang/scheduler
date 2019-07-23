const router = require('express').Router();
const mysql = require('mysql');
const config = require(__dirname + '/../../config.js');

var conn = mysql.createConnection({
    host: config.mysql.hostname,
    user: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.dbname
});

conn.connect();

router.get('/:id', (req, res) => {
    let query = "SELECT * FROM `users` WHERE userId = " + mysql.escape(req.params.id);
    conn.query(query, (err, data) => {
        if(err) res.send(err);
        res.send(data);
    })
});

router.post('/', (req, res) => {

});

module.exports = router;