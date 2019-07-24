const router = require('express').Router();
const mysql = require('mysql2');
const config = require(__dirname + '/../../config');
const conn = require(__dirname + '/../../mysql');

router.get('/:id', (req, res) => {
    let query = "SELECT * FROM `users` WHERE userId = ?";
    conn.query(query, req.params.id, (err, data) => {
        if(err) return res.send(err);
        res.send(data);
    })
});

router.post('/', (req, res) => {
    let query = "INSERT INTO `users` (`username`, `email`, `firstname`, `lastname`) VALUES ?";
    let params = [req.body.username, req.body.email, req.body.firstname, req.body.lastname];
    console.log(req.body);
    conn.query(query, params, (err, data) => {
        if(err) return res.send(err);
        res.send("Successfully added new user.");
    })
});

module.exports = router;