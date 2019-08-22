const db = require('../data/db.js')

module.exports = {
    allCoordinators,
    allDonors,
    logged,
    editCor,
    editDon,
    deleteUser
}

function allCoordinators() {
    return db('coordinator')
}

function allDonors() {
    return db('donor')
}

function logged(id, type) {
    if(type === 'coordinator') {
        return db('coordinator')
        .where({id})
        .first()
    } else {
        return db('donor')
        .where({id})
        .first()
    }
}

function editCor(id, user) {
    return db('coordinator')
    .where({id})
    .update(user)
    .then(() => oneCoordinator(id))
}

function editDon(id, user) {
    return db('donor')
    .where({id})
    .update(user)
    .then(() => oneDonor(id))
}

function deleteUser(id, type) {
    console.log(id, type)
    if(type === 'coordinator') {
        return db('coordinator')
        .where({id})
        .del()
        
    } else {
        return db('donor')
        .where({id})
        .del()
        
    }
}
