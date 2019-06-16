const express = require("express");
const Event = require("./model");
const { riskOfAllTickets } = require('../alg/alg')
const auth = require('../auth/middleware')

const router = express.Router()

// GETs all events
router.get('/events', (req, res) => {
	const limit = req.query.offset || 9
  const offset = req.query.offset || 0
	console.log('RECEIVED REQ.QUERY', req.query)
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
router.get('/events/:id', (req, res) => {
	const id = req.params.id
	Event.findByPk(id)
		.then(event => {
			if (!event) {
				res.status(404).json({
					message: 'This event does not exist'
				})
			} else {
				// return riskOfAllTickets(event.dataValues)
				res.json({ event })
			}
		})
		// .then(result => {
		// 	console.log('RESULTTTTTT', result)
		// 	res.json({ result })
		// })
		.catch(console.error());
})

module.exports = router;
