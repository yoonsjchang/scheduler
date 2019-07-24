const mysql = require('mysql2');
const config = require('./config');

module.exports = mysql.createConnection({
    host: config.mysql.hostname,
    user: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.dbname
});
