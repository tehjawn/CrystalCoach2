// Crystal Response Builder
module.exports.buildResponse = function(intent, params, callback) {

	console.log("Building a " + intent + " response using parameters " + JSON.stringify(params))

	if(intent == "Record Activity - Drink") {
		var drink = require('./drink')
		callback(drink.calculate({}, {
			drink: params.drink || "lemonade"
		}))
	}

	else if (intent == "Record Activity - Food") {
		var food = require('./food')
		console.log("Intent scanned: "+intent)
		console.log("Intent params: "+JSON.stringify(params))

		// Calculate a food response using User, Food, and Response Callback
		food.calculate({}, params.food || "banana", function(resp){
			console.log(resp)
			callback(resp)
		})
	}

	else if (intent == "Record Activity - General Exercises") {
		var exercise = require('./exercise')
		callback(exercise.calculate({}, {
			exercise: params.exercise || "pushups"
		}))
	} else {
		callback("Error - intent not found!")
	}
}