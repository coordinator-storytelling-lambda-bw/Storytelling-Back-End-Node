const express = require('express')
const router = express.Router()

const {restricted} = require('../Auth/middleware.js')

const helpers = require('./helpers.js')

// GET all Coordinators
router.get('/coordinators', async (req, res) => {
    
    try {
        const cor = await helpers.allCoordinators()
        res.status(200).json(cor)
    } catch(err) {
        res.status(500).json({ message: 'Something went wrong when fetching Coordinators!'})
    }
    
})

// GET all Donors
router.get('/donors', async (req, res) => {
    try {
        const don = await helpers.allDonors()
        
        res.status(200).json(don)
    } catch(err) {
        res.status(500).json({ message: 'Something went wrong when fetching Donors!'})
    }
    
})

//GET single Coordinator
router.get('/logged', restricted, async (req, res) => {
    const {subjectId, type} = req.decodedToken

    try {
        const user = await helpers.logged(subjectId, type)

        if(!user) {
            res.status(404).json({message: `An user with an ID of ${id} could not be found`})
        } else {
            res.status(201).json(user)
        }
    } catch (err) {
        res.status(500).json({message: 'Something went wrong when fetching the User'})
    }
})

//GET single Donor
router.get('/logged/donor', restricted, async (req, res) => {
    const {subjectId} = req.decodedToken
    console.log(req.decodedToken)

    try {
        const user = await helpers.oneDonor(subjectId)

        if(!user) {
            res.status(404).json({message: `An user with an ID of ${id} could not be found`})
        } else {
            res.status(201).json(user)
        }
    } catch (err) {
        res.status(500).json({message: 'Something went wrong when fetching the User'})
    }
})

//UPDATE a Coordinator
router.put('/coordinators/update/:id', async (req, res) => {
    const {firstName, lastName, email, username, password, country, type, workTitle} = req.body
    const {id} = req.params

    if(!firstName || !lastName || !email || !username || !password || !country || !type || !workTitle){
        res.status(400).json({message: 'Please make sure all the fields are populated'})
    } else {
        try {
            const update = await helpers.editCor(id, req.body)
            console.log(update)
            res.status(201).json(update)
        } catch (err) {
            res.status(500).json({message: 'Something went wrong with an user'})
        }
    }
})

router.put('/donors/update/:id', async (req, res) => {
    const {firstName, lastName, email, username, password, country, type} = req.body
    const {id} = req.params

    if(!firstName || !lastName || !email || !username || !password || !country || !type){
        res.status(400).json({message: 'Please make sure all the fields are populated'})
    } else {
        try {
            const update = await helpers.editDon(id, req.body)
    
            res.status(201).json(update)
        } catch (err) {
            res.status(500).json({message: 'Something went wrong with an user'})
        }
    }
})

router.delete('/delete', restricted, async (req, res) => {
    const {subjectId, type} = req.decodedToken
    // console.log(subjectId, type)

    try{
        const deleted = await helpers.deleteUser(subjectId, type)
        console.log('deleted', deleted)
        if(!deleted) {
            res.status(404).json({message: `User with an ID of ${subjectId} couldn\'t be found`})
        } else {
            res.status(200).json({message: `Deleted! User with an ID of ${subjectId} was deleted!`})
        }
    } catch (err) {
        res.status(500).json({message: 'Something went wrong with the server'})
    }
})


module.exports = router