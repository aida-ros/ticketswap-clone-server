const express = require("express");
const Ticket = require("./model");

const router = express.Router()

// GETs all tickets
router.get('/tickets', (req, res) => {
  Ticket.findAll()
		.then(tickets => {
			console.log(tickets)
			res.status(200).json({ tickets })
		})
		.catch(console.error());
})

router.post('/tickets', (req, res) => {
	res.json({
		message: 'Post request to tickets received',
		request: req.body
	})
})

module.exports = router;