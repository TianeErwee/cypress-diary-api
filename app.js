var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var entries = require('./routes/entries');

var app = express();

require('@cypress/code-coverage/middleware/express')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/entries', entries);

module.exports = app;
