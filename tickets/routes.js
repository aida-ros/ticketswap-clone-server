const express = require("express");
const Ticket = require("./model");

const router = express.Router()

router.get('/tickets', (req, res) => {
  res.send('hello world!')
})

module.exports = router;