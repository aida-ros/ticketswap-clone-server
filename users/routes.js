const express = require("express");
const User = require("./model");


const router = express.Router()

router.get('/users', (req, res) => {
  res.send('hello world!')
})

module.exports = router;