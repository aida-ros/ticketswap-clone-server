const express = require("express");
const User = require("./model");


const router = express.Router()

router.get('/users', (req, res) => {
  User.findAll()
		.then(users => {
			console.log(users)
			res.status(200).json({ users })
		})
		.catch(console.error());
})

router.post('/users', (req, res) => {
	res.json({
		message: 'Post request to users received',
		request: req.body
	})
})

module.exports = router;