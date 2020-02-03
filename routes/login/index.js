const router = require('express').Router();
const jwt = require('jsonwebtoken');
const moment = require('moment');
const conn = require(__basedir + '/mysql');

const secret = '8h3qouLp9woP67xFO9TM';

router.post('/register', (req, res, next) => {
    let query = "INSERT INTO `users` (`username`, `email`, `firstname`, `lastname`, `password`) VALUES (?)";
    let params = [req.body.username, req.body.email, req.body.firstname, req.body.lastname, req.body.password];
    console.log(params);
    conn.query(query, [params], (err, data) => {
        if(err) return next(err);
        return res.send("Successfully added new user.");
    })
});

router.post('/authenticate', (req, res, next) => {
    console.log(req.body);
    let query = "SELECT * FROM `users` WHERE username=? AND password=?";
    let params = [req.body.username, req.body.password];
    conn.query(query, params, (err, data) => {
        if(err) return next(err);
        if(data && data.length === 0) {
            return res.status(401).send("Username or password incorrect.")
        }
        else{
            console.log(data)
            //Send back jwt here
            let json = {
                userId: data[0].userId,
                firstname: data[0].firstname,
                lastname: data[0].lastname,
                email: data[0].email
            }
            console.log(json);
            json = jwt.sign(json, secret);
            console.log(json);
            return res.status(200).send(json);
        }
        return next();
    })
})


module.exports = router;