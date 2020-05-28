const path = require('path');
const express = require('express');
// Database
var monk = require('monk');
var db = monk('localhost:27017/agencydb');

var indexRouter = require('./routes/index');
var customerRouter = require('./routes/customers');
var performerRouter = require('./routes/performers');
var projectRouter = require('./routes/projects');
var projectInProgressRouter = require('./routes/projectInProgress');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(__dirname))

// db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/service/customers', customerRouter);
app.use('/service/performers', performerRouter);
app.use('/service/projects', projectRouter);
app.use('/service/projectInProgress', projectInProgressRouter);

const host = "localhost";
const port = "5000";
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`)
});

module.exports = app;
