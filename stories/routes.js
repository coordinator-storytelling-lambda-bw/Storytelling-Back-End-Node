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
    const {username} = req.decodedToken

    body.user_id = subjectId
    body.type = type
    body.posted_by = `${firstName} ${lastName} (${username})`

    try {
        const check = await helpers.checkTitle(body.title)

        if(check) {
            res.status(406).send('A story with that Title already exists!')
        } else {
            if(body.story.length === 0 || body.country.length === 0 || body.title.length === 0) {
                res.send('Please fill out all the required fields!')
            } else {
                try {
                    const added = await helpers.addStory(body)
            
                    res.status(201).json(added)
                } catch (err) {
                    res.status(500).json({message: 'Something went wrong with the server, while adding story'})
                }
            }
        }
    } catch(err) {
        res.status(500).json({message: 'Something went wrong with the server'})
    }
})

//Save a story
router.post('/save/:id', restricted, async (req, res) => {
    const body = req.body
    const {subjectId} = req.decodedToken

    body.user_id = subjectId
    body.story_id = req.params.id

    console.log(body)
    try {
        const save = await helpers.save(body)
        if(!save) {
            res.send('Story couldn\'t be saved')
        } else {
            res.status(201).json({message: 'Story successfuly saved'})
        }
    } catch (err) {
        res.status(500).json({message: 'Something went wrong when creating the server'})
    }
})

//GET SAVED STORIES
router.get('/saved', restricted, async (req, res) => {
    const {subjectId} = req.decodedToken

    try {
        const list = await helpers.getSaved(subjectId)
        console.log(list, 'list')

        res.status(200).json(list)
    } catch (err) {
        res.status(500).json({message: 'Something went wrong with the server'})
    }
})



module.exports = router