const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const helpers = require('./helpers.js')

const {generateToken} = require('./middleware.js')


router.post('/register', async (req,res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 4)
    user.password = hash


    try {
        const registered = await helpers.register(user, user.type)

        res.status(201).json(registered)
    } catch (err) {
        res.status(500).json({message: 'Something went wrong when registering user'})
    }
})


router.post('/login', (req, res) => {
    const {username, password} = req.body

    helpers
    .login(username)
    .then(user => {
        if(!user) {
            res.status(404).json({message: 'Can\'t find an User with the specified username'})
        } else {
            if(bcrypt.compareSync(password, user.password)) {
               const token = generateToken(user)
               res.status(201).json({message: `Logged In! Your ID is ${user.id}`, token})
            }
            
        }
        
    })
})

module.exports = router