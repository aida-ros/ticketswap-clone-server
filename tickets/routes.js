const express = require("express");
const Ticket = require("./model");
const { calculateRisk } = require('../alg/alg')
const auth = require('../auth/middleware')
const { toData } = require('../auth/jwt')

const router = express.Router()

// GETs all tickets
router.get('/tickets', (req, res) => {
  Ticket.findAll()
		.then(tickets => {
			res.status(200).json({ tickets })
		})
		.catch(console.error());
})

// GETs a specific ticket
router.get('/events/tickets/:id', (req, res) => {
	const id = req.params.id
	Ticket.findByPk(id)
		.then(ticket => {
			if (!ticket) {
				res.status(404).json({
					message: 'This ticket does not exist'
				})
			} else {
				return ticket
			}
		})
		.then(ticket => calculateRisk(ticket.dataValues))
		.then((result) => {
			console.log('RESULT OBJECT:', result)
			res.json(result)

		})
		.catch(console.error());
})

router.post('/tickets', (req, res) => {
	const data = toData(req.body.userId)
	console.log('IDDDD', data.userId)
			Ticket.create({
				userId: data.userId,
				eventId: req.body.eventId,
				price: req.body.price,
				description: req.body.description,
				image: req.body.image
			})
				.then(ticket => {
					res.status(201).json({ 
						message: 'Ticket created',
						ticket: ticket })
						return ticket
				})
				.catch(console.error());
		})

module.exports = router;