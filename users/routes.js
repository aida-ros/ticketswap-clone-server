const express = require("express");
const User = require("./model");
const bcrypt = require('bcrypt');

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
  const user = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  }
	User.create(user)
		.then(user => {
			res.status(201).json({ 
				message: 'User created',
				user: user })
		})
})

module.exports = router;