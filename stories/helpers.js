const db = require('../data/db.js')


module.exports = {
    getStories,
    getUserStories,
    addStory
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

function addStory(body) {
    return db('stories')
    .insert(body)
    .then(id => {
        return db('stories')
        .where({user_id: body.user_id, type: body.type} )
    })
}