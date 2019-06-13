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
				res.json({ ticket })
			}
		})
		.catch(console.error());
	
	
	// res.json({
	// 	message: 'Post request to tickets received',
	// 	request: req.body
	// })
})

module.exports = router;