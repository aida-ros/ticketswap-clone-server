const express = require("express");
const Event = require("./model");


const router = express.Router()

// GETs all events
router.get('/events', (req, res) => {
	Event.findAll()
		.then(events => {
			console.log(events)
			res.status(200).json({ events })
		})
		.catch(console.error());
})

router.post('/events', (req, res) => {
	res.json({
		message: 'Post request to events received',
		request: req.body
	})
})

module.exports = router;
