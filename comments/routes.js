const express = require("express");
const Comment = require("./model");


const router = express.Router()

router.get('/comments', (req, res) => {
  res.send('hello world!')
})

module.exports = router;
