const express = require("express");
const Comment = require("./model");


const router = express.Router()

router.get('/comments', (req, res) => {
  res.send('hello world!')
})

router.post('/comments', (req, res) => {
	res.json({
		message: 'Post request to comments received',
		request: req.body
	})
})

module.exports = router;
