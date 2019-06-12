const express = require("express");
const Ticket = require("./model");

const router = express.Router()

router.get('/tickets', (req, res) => {
  res.send('hello world!')
})

router.post('/tickets', (req, res) => {
	res.json({
		message: 'Post request to tickets received',
		request: req.body
	})
})

module.exports = router;