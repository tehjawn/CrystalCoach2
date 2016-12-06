// Exercise calculator
module.exports.calculate = function(user_info, request_info) {
	return "Doing the exercise, " + request_info.exercise + ", burns approximately " + Math.round(Math.random()*200) + " calories"
}