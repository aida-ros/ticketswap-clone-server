const express = require("express");

const app = express();
const port = process.env.PORT || 4000;

const cors = require("cors");
const bodyParser = require("body-parser");

// ROUTERS

app
  .use(cors())
  .use(bodyParser.json())

const server = app.listen(4000, console.log(`Listening on port ${port}`));

const Test = require('./test/model')