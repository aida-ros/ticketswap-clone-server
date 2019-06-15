const express = require("express");
const Ticket = require("./model");
const calculateRisk = require('../alg/alg')
const { riskOfAllTickets } = require('../alg/calc')

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

module.exports = router;