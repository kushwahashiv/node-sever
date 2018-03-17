const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mySurvey');

const Survey = require('./routes/survey');
const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/survey', Survey);

app.get('*', (req, res) => {
    res.send('Welcome to the node server API');
});

// catch 404 and forward to error handler
/*app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});*/

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.format({
        json: () => {
            res.json({ error: err });
        }
    });
});

module.exports = app;
