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

// Creates a new user
router.post('/users', (req, res) => {
	// res.json({
	// 	message: 'Post request to users received',
	// 	request: req.body
	// })
	User.create(req.body)
		.then(event => {
			res.status(201).json({ 
				message: 'User created',
				event: event })
		})
})

// User.create({ username: 'FirstUser', password: 'something' })
// User.create({ username: 'SecondUser', password: 'test' })
// User.create({ username: 'ThirdUser', password: 'secret' })

module.exports = router;