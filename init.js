global.__basedir = __dirname;

const express = require('express')
const app = express();

const routes = require('./routes'),
    setup = require('./setup');

app.use(express.json());
app.use('/', routes);

app.listen(3000, () => {
    setup.dbSetup();
    console.log("Listening on port 3000.")
})