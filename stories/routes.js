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

//GET individual Story
router.get('/individual/story/:id', restricted, async (req, res) => {
    try {
        const story = await helpers.individual(req.params.id)

        if(!story) {
            res.status(404).json({message: `Story with an ID of ${req.params.id} couldn\'t be found`})
        } else {
            res.status(200).json(story)
        }
    } catch(err) {
        res.status(500).json({message: 'Something went wrong when retreiving a story'})
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

//DELETE a story by it's ID
router.delete('/delete/:id', restricted, async (req, res) => {
    const { id } = req.params

    try {
        const deleted = await helpers.deleted(id)
        
        if(!deleted) {
            res.status(404).json({ message: `Story with an ID of ${id} couldn\'t be found` })
        } else {
            res.status(200).json(deleted)
        }
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong when deleting a Story!' })
    }
})

//Edit a story
router.put('/edit/:id', restricted, async (req, res) => {
    const { id } = req.params
    const { body } = req
    if(body.story.length === 0 || body.country.length === 0 || body.title.length === 0) {
        res.status(400).json({message: 'You can\'t have any empty inputs'})
    } else {
        try {
            const edited = await helpers.edit(id, body)
    
            if(!edited) {
                res.status(404).json({ message: `Story with an ID of ${id} couldn\'t be found`})
            } else {
                res.status(200).json(edited)
            }
        } catch (err) {
            res.status(500).json({message: 'Something went wrong when editing a story!'})
        }
    }
})



module.exports = router