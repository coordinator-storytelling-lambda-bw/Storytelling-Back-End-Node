const db = require('../data/db.js')


module.exports = {
    getStories,
    getUserStories,
    addStory,
    checkTitle,
    save,
    getSaved,
    individual,
    deleted,
    edit
}

function getStories() {
    return db('stories')
}

function getUserStories(id, type) {
    if(type === 'coordinator') {
        return db('coordinator')
        .where({id})
        .first()
        .then(user => {
            if(!user) {
                return 'There is a problem with the logged in User'
            } else {
                return db('stories')
                .where({user_id: id})
            }
        })
    } else {
        return db('donor')
        .where({id})
        .first()
        .then(user => {
            if(!user) {
                return 'There is a problem with the logged in User'
            } else {
                return db('stories')
                .where({user_id: id})
            }
        })
    }
}

function checkTitle(title) {
    console.log(title)
    return db('stories')
    .where({ title })
    .first()
}

function addStory(body) {
    return db('stories')
    .insert(body)
    .then(id => {
        return db('stories')
        .where({user_id: body.user_id, type: body.type} )
    })
}

function save(body) {
    return db('save_story')
    .insert(body)
}

function getSaved(id) {
    return db('save_story')
    .where({user_id: id})
    .then(linkers => {
        console.log('linkers', linkers)
        return db('stories')
        .then(stories => {
            const arr = []
            linkers.map(each => {
                stories.map(story => {
                    if(story.id === each.story_id){
                        arr.push(story)
                    }
                })
            })
            return arr
        })
    })
}

function individual(id) {
    return db('stories')
    .where({id})
    .first()
}

function deleted(id) {
    return db('stories')
    .where({ id })
    .del()
    .then(res => {
        if(res) {
            return db('stories')
        }
    })
}

function edit(id, body) {
    return db('stories')
    .where({ id })
    .update(body)
    .then(res => {
        if(res){
            return db('stories')
            .where({ id })
        }
    })
}