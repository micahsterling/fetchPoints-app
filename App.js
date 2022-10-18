const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

//Use bodyParser()
app.use(
  bodyParser.urlencoded({ extended: true })
);
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})

global.points = [];

app.listen(4000, function () {
  console.log("Started application on port %d", 4000)
});