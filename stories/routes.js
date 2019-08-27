const express = require('express')
const router = express.Router()

const {restricted} = require('../Auth/middleware.js')

helpers = require('./helpers.js')

// GET all stories
router.get('/', async (req, res) => {
    try {
        const stories = await helpers.getStories()

        res.status(200).json(stories)
    } catch(err) {
        res.status(500).json({message: 'Something went wrong when retreiving stories'})
    }
})

//GET stories for the logged in user
router.get('/user/stories', restricted, async (req, res) => {
    const {subjectId} = req.decodedToken
    const {type} = req.decodedToken

    try {
        const stories = await helpers.getUserStories(subjectId, type)

        res.status(200).json(stories)
    } catch(err) {
        res.status(500).json({message: 'Something went wrong with the server'})
    }
})

//ADDS a story
router.post('/add', restricted, async (req, res) => {
    const {subjectId} = req.decodedToken
    const {type} = req.decodedToken
    const {body} = req
    const {firstName} = req.decodedToken
    const {lastName} = req.decodedToken

    body.user_id = subjectId
    body.type = type
    body.posted_by = firstName

    try {
        const added = await helpers.addStory(body)

        res.status(201).json(added)
    } catch (err) {
        res.status(500).json({message: 'Something went wrong with the server'})
    }
})



module.exports = router