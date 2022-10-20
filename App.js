const express = require('express');
const bodyParser = require('body-parser')
const app = express();

//Use bodyParser()
app.use(
  bodyParser.urlencoded({ extended: true })
);
app.use(bodyParser.json());

global.points = [];

const pointsRouter = require("./API/route");
app.use("/", pointsRouter);

app.listen(3000, function () {
  console.log("Started application on port %d", 3000)
});
