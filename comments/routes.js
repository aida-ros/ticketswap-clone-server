const express = require("express");
const Comment = require("./model");


const router = express.Router()

router.get('/comments', (req, res) => {
  Comment.findAll()
		.then(comments => {
			console.log(comments)
			res.status(200).json({ comments })
		})
		.catch(console.error());
})

router.post('/comments', (req, res) => {
	res.json({
		message: 'Post request to comments received',
		request: req.body
	})
})

module.exports = router;
