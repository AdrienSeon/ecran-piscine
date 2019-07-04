const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config.js');
const getIndex = require('./routes/index');
const getObixPointDataRouter = require('./routes/get-obix-point-data');
const CentralEditorRouter = require('./routes/CentralEditor.route');
const BassinPointRouter = require('./routes/BassinPoint.route');

let app = express();

const connectionString = 'mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name
mongoose.Promise = global.Promise;
mongoose.connect(connectionString, { useNewUrlParser: true }).then(
	() => {console.log('Database is connected') },
	err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
//app.use(logger('dev'));

app.use('/', getIndex);
app.use('/get-obix-point-data', getObixPointDataRouter);
app.use('/central-editor', CentralEditorRouter);
app.use('/bassin-point', BassinPointRouter);

module.exports = app;
