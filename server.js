const express = require('express');
const cors = require('cors')
const path = require('path');
const app = express();

app.use(cors());


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
