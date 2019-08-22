require('dotenv').config()

module.exports = {
    jwtSecret: process.env.JWT_SECRETS || 'This is a secret for my app'
}