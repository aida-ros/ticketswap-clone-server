const express = require("express");

const app = express();
const port = process.env.PORT || 4000;

const cors = require("cors");
const bodyParser = require("body-parser");

// ROUTERS

app
  .use(cors())
  .use(bodyParser.json())

app.listen(port, console.log(`Listening on port ${port}`));

const User = require('./users/model')
const Event = require('./events/model')
const Ticket = require('./tickets/model')
const Comment = require('./comments/model')