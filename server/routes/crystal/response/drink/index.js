// Drink calculator
module.exports.calculate = function(user_info, request_info) {
	return "The drink, " + request_info.drink + ", is approximately " + Math.round(Math.random()*200) + " calories"
}