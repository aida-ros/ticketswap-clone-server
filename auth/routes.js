const { Router } = require('express')
const { toJWT, toData } = require('./jwt')
const bcrypt = require('bcrypt');
const User = require('../users/model')
const auth = require('./middleware')

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

router.get('/secret-endpoint', auth, (req, res) => {
	res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  })
})

module.exports = router