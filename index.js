const express = require("express");

const app = express();
const port = process.env.PORT || 4000;

const cors = require("cors");
const bodyParser = require("body-parser");

// ROUTERS
const usersRouter = require('./users/routes')
const eventsRouter = require('./events/routes')
const ticketsRouter = require('./tickets/routes')
const commentsRouter = require('./comments/routes')
const loginRouter = require('./auth/routes')

app
  .use(cors())
  .use(bodyParser.json())
  // .use(usersRouter)
  .use(eventsRouter)
  .use(ticketsRouter)
  .use(commentsRouter)
  .use(loginRouter)

app.listen(port, console.log(`Listening on port ${port}`));