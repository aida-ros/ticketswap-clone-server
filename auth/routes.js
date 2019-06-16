const { Router } = require('express')
const { toJWT, toData } = require('./jwt')
const bcrypt = require('bcrypt');
const User = require('../users/model')

const router = new Router()

router.post('/logins', (req, res) => {
	const username = req.body.username
	const password = req.body.password

	if (!username || !password) {
		res.status(400).send({
			message: 'Please supply a valid username and password'
		})
	}
	else {
		User
			.findOne({
				where: {
					username: req.body.username
				}
			})
			.then(user => {
				if (!user) {
					res.status(400).send({
						message: 'User with that username does not exist'
					})
				}

				if (bcrypt.compareSync(req.body.password, user.password)) {
					res.send({
						jwt: toJWT({ userId: user.id })
					})
				}
				else {
					res.status(400).send({
						message: 'Password was incorrect'
					})
				}
			})
			.catch(err => {
				console.error(err)
				res.status(500).send({
					message: 'Something went wrong'
				})
			})
	}
})

router.get('/secret-endpoint', (req, res) => {
	const auth = req.headers.authorization && req.headers.authorization.split(' ')
	if (auth && auth[0] === 'Bearer' && auth[1]) {
		try {
			const data = toData(auth[1])
			res.send({
				message: 'Thanks for visiting the secret endpoint.',
				data
			})
		}
		catch (error) {
			res.status(400).send({
				message: `Error ${error.name}: ${error.message}`,
			})
		}
	}
	else {
		res.status(401).send({
			message: 'Please supply some valid credentials'
		})
	}
})

module.exports = router