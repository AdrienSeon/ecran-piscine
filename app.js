var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var getIndex = require('./routes/index');
var getObixPointDataRouter = require('./routes/get-obix-point-data');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/', getIndex);
app.use("/get-obix-point-data", getObixPointDataRouter);

module.exports = app;
