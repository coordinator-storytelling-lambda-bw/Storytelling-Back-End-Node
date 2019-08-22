const db = require('../data/db.js')

module.exports = {
    register,
    login
}

function register (user) {

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