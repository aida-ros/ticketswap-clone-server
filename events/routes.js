const express = require("express");
const Event = require("./model");
const { riskOfAllTickets } = require('../alg/alg')
// auth not implemented due to an unsolved error
const auth = require('../auth/middleware')

const router = express.Router()

// GETs all events
router.get('/events', (req, res) => {
	const limit = req.query.offset || 9
	const offset = req.query.offset || 0
	
	Event.findAll({
		limit, offset
	})
		.then(events => {
			res.status(200).json({ events })
		})
		.catch(console.error());
})

router.post('/events', (req, res, next) => {
	Event.create(req.body)
		.then(event => {
			res.status(201).json({ 
				message: 'Event created',
				event: event })
		})
		.catch(err => next(err));
})

// GETs a specific event defined by id
// Also used to calculate riskRate for multiple tickets on an event page
router.get('/events/:id', (req, res) => {
	const id = req.params.id
	Event.findByPk(id)
		.then(async event => {
			if (!event) {
				res.status(404).json({
					message: 'This event does not exist'
				})
			} else {
				// return await riskOfAllTickets(event.dataValues)
				res.json({ event })
			}
		})
		// .then(promises => Promise.all(promises))
		// .then(result => {
		// 	console.log('RESULT OBJECT', result)
		// 	res.json({ result })
		// })
		.catch(console.error());
})

module.exports = router;
