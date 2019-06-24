let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/dbConfig.js');

let getIndex = require('./routes/index');
let getObixPointDataRouter = require('./routes/get-obix-point-data');
let CentralEditorRouter = require('./routes/CentralEditor.route');
let BassinPointRouter = require('./routes/BassinPoint.route');

let app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
	() => {console.log('Database is connected') },
	err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/', getIndex);
app.use('/get-obix-point-data', getObixPointDataRouter);
app.use('/central-editor', CentralEditorRouter);
app.use('/bassin-point', BassinPointRouter);

module.exports = app;
