var exerciseList = require('./exercises.json')

// Exercise calculator
module.exports.calculate = function(user_info, request_info, callback) {
	var caloriesBurned = 0;
	console.log(request_info);
	for (key in exerciseList) {
		if (request_info.exercise == key) {
			console.log("Exercise detected: "+key)
			var caloriesBurned = user_info.weight * exerciseList[key] * 5
		}
	}
	if (caloriesBurned > 0) {
		formatAnswer(request_info.exercise, caloriesBurned, function(resp) {
			callback(resp);
		});
	} else {
		callback({
			message: "This exercise is currently not supported. Please try again later!",
			metrics: 0
		});
	}
}

function formatAnswer(exercise, calories, callback) {
	callback({
		message: "Doing the exercise, " + exercise + ", burns approximately " + calories + " calories",
		metrics: {
			calories: calories
		}
	});
}
