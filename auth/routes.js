const { Router } = require('express')
const { toJWT, toData } = require('./jwt')

const router = new Router()

router.post('/logins', (req, res) => {
	const username = req.body.username
	const password = req.body.password
	
	if (!username || !password) {
    res.status(400).send({
      message: 'Please supply a valid username and password'
    })
	} else if (username || password) {
		res.send({
			jwt: toJWT({ userId: 1 })
		})
	}
})

module.exports = router