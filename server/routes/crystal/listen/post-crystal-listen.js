var apiai = require('apiai')
var config = require('../../../config.json')
var app = apiai(config.apiai.client_access_token)

var crystal = require('../response')

module.exports = (req, res) => {
	
	var response

	// Expect req to be a JSON object
	console.log(req.body) // { userInput: 'I ate a banana' }

	// Make a request to API.AI with the userInput
	var request = app.textRequest(req.body.userInput, {
		sessionId: req.body.userId || 1
	})
	
	// After receiving a response from API.AI, build a response and return it to the original caller (the user)
	request.on('response', function(resp) {
		crystal.buildResponse(resp.result.metadata.intentName, resp.result.parameters, function(crystal_response){
			res.json({
				message: crystal_response
			})
		})
	})

	request.on('error', function(err) {
		console.log(err)
		res.json({
			message: "Error connecting to API.AI"
		})
	})

	request.end()
}