const db = require('../data/db.js')

module.exports = {
    register,
    login
}

function register(body, type) {
    if(type.toLowerCase() === 'coordinator') {
        return db('coordinator')
        .insert(body)
        .then(id => id[0])
    } else {
        return db('donor')
        .insert(body)
        .then(id => id[0])
    }
}

function login (username) {
    // if(user.type === 'donor') {
    //     return db('donor', 'coordinator')
    // } else {
    //     return db('coordinator')
    // }
    return db('donor')
    .where({username})
    .first()
    .then(user => {
        if(!user) {
            return db('coordinator')
            .where({username})
            .first()
        } else {
            return user
        }
    })
}

