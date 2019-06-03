const express = require('express');
const cors = require('cors')
const path = require('path');
const app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, HEAD, OPTIONS");
	res.header("Access-Control-Allow-Credentials: true");
	res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, X-Requested-With, Content-Type, Accept, Authorization, Lang");
	next();
});

app.use(express.static(path.join(__dirname, 'build')));

app.all("*", function(req, res, next) {
  if (req.method.toLowerCase() !== "options") {
    return next();
  }
  return res.send(204);
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);
