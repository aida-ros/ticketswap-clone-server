const express = require("express");
const Event = require("./model");


const router = express.Router()

router.get('/events', (req, res) => {
  res.send('hello world!')
  // Event.findAll({
  //   order: [
  //     ['start_date', 'DESC']
  //   ]
  // })
  // .then(events => )
})

module.exports = router;
