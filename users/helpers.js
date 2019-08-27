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
    console.log('hellp')
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
    .then(ids => {
        console.log(ids)
        return db('coordinator')
        .where('id', ids)
        .first()
    })
}

function editDon(id, user) {
    return db('donor')
    .where({id})
    .update(user)
    .then(ids => {
        return db('donor')
        .where({id: ids})
        .first()
    })
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
