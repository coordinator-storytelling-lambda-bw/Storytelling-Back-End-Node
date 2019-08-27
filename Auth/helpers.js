const db = require('../data/db.js')

module.exports = {
    register,
    login
}

function register(body, type) {
    return db('coordinator')
    .where('username', body.username)
    .first()
    .then(corUser => {
        if(!corUser) {
            return db('donor')
            .where('username', body.username)
            .first()
            .then(donUser => {
                if(!donUser) {
                    console.log('donUser IF')
                    if(type.toLowerCase() === 'coordinator') {
                        return db('coordinator')
                        .insert(body)
                        .then(id => `Welcome your ID is ${id[0]}`)
                    } else {
                        return db('donor')
                        .insert(body)
                        .then(id => `Welcome your ID is ${id[0]}`)
                    }
                } else {
                    return 'User Donor with that username already exists!'
                }
            })
        } else {
            return 'User Coordinator with that ID already exists'
        }
    })
    
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

