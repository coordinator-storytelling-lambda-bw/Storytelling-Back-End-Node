const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const helpers = require('./helpers.js')

const {generateToken} = require('./middleware.js')


router.post('/login', (req, res) => {
    const {username, password} = req.body

    helpers
    .login(username)
    .then(user => {
        if(!user) {
            res.status(404).json({message: 'Can\'t find an User with the specified username'})
        } else {
            
            const token = generateToken(user)
            res.status(201).json({message: `Logged In! Your ID is ${user.id}`, token})
        }
        
    })
})

module.exports = router