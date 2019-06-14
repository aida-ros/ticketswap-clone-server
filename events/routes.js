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
	// res.json({
	// 	message: 'Post request to events received',
	// 	request: req.body
	// })
	Event.create(req.body)
		.then(event => {
			res.status(201).json({ 
				message: 'Event created',
				event: event })
		})
})

// GETs a specific event defined by id
router.get('/events/:id', (req, res) => {
	const id = req.params.id
	Event.findByPk(id)
		.then(event => {
			if (!event) {
				res.status(404).json({
					message: 'This event does not exist'
				})
			} else {
				res.json({ event })
			}
		})
		.catch(console.error());
})

module.exports = router;
