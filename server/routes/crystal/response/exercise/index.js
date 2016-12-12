// Exercise calculator
module.exports.calculate = function(user_info, request_info, callback) {
	var caloriesBurned = 0;
	console.log(request_info);
	if (request_info.exercise == "ran") {
		console.log("Ran detected");
		formatAnswer(request_info.exercise, 50, function(resp) {
			callback(resp);
		});
	} else {
		callback("This exercise is currently not supported");
	}
}

function formatAnswer(exercise, calories, callback) {
	callback({
		message: "Doing the exercise, " + exercise + ", burns approximately " + calories + " calories",
		metrics: {
			calories: calories
		});
}