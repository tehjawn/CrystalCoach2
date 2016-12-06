const users = require('express').Router()

users.post('/', require('./post-crystal-listen.js'))

module.exports = users