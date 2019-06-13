const express = require("express");
const { toJWT, toData } = require('./jwt')
const User = require('../users/model')
const bcrypt = require('bcrypt')
const auth = require('./middleware')

const router = express.Router()

// router.get('/users', (req, res) => {
//   const username = req.body.username
//   const password = req.body.password

//   if (!username || !password) {
//     res.status(400).send({
//       message: 'Please supply a valid username and password'
//     })
//   }
//   else {
//     // 1. find user based on username address
//     User
//       .findOne({
//         where: {
//           username: req.body.username
//         }
//       })
//       .then(entity => {
//         if (!entity) {
//           res.status(400).send({
//             message: 'User with that username does not exist'
//           })
//         }
//         // 2. use bcrypt.compareSync to check the password against the stored hash
//         if (bcrypt.compareSync(req.body.password, entity.password)) {
//           // 3. if the password is correct, return a JWT with the userId of the user (user.id)
//           res.send({
//             jwt: toJWT({ userId: entity.id })
//           })
//         }
//         else {
//           res.status(400).send({
//             message: 'Password was incorrect'
//           })
//         }
//       })
//       .catch(err => {
//         console.error(err)
//         res.status(500).send({
//           message: 'Something went wrong'
//         })
//       })
//   }
// })

router.get('/secret-endpoint', auth, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  })
})

router.get('/users', (req, res) => {
	console.log("USERNAMEEEEEE", req)
	
	// User.findOne({
	// 	where: {
	// 		username: req.body.username,
	// 		password: req.body.password
	// 	}
	// })
	// 	.then(user => {
	// 		if (!user) {
	// 			return res.status(400).send({
	// 				message: 'User does not exist'
	// 		})
	// 	} else {
	// 		console.log(user)
	// 		res.status(200).json({ 
	// 			message: 'User found',
	// 			user: user })
	// 	}
	// 	})
})

router.post('/users', (req, res) => {
	User.create(req.body)
		.then(user => {
			res.status(201).json({ 
				message: 'User created',
				user: user })
		})
})

module.exports = router