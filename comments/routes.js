const express = require("express");
const Comment = require("./model");

const router = express.Router()

router.get('/comments/:id', (req, res) => {
	console.log('REQUEST RECEIVED:', req.params.id)
	Comment.findAll({
		where: {
			ticketId: req.params.id
		}
	})
		.then(comments => {
			console.log(comments)
			res.status(200).json({ comments })
		})
		.catch(console.error());
})

router.post('/comments', (req, res) => {
	console.log('REQUEST RECEIVED:', req.body)
	Comment.create({ content: req.body.comment, ticketId: req.body.ticketId })
		.then(comment => {
			res.status(201).json({ 
				message: 'comment created',
				comment: comment })
		})
	
	// res.json({
	// 	message: 'Post request to comments received',
	// 	request: req.body
	// })
})

module.exports = router;
