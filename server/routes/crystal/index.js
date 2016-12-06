const crystal = require('express').Router()

crystal.use('/listen', require('./listen'))
// crystal.use('/respond', require('./respond'))

crystal.post('/', function (req, res) {
	console.log("Received Listen Request")
	res.send("Listening")
})

module.exports = crystal