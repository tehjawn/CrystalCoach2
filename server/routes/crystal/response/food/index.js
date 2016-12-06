// Food calculator
var request = require('superagent')

module.exports.calculate = function(user, food, callback){
  request
  .get("api.nal.usda.gov/ndb/search/?format=json&q="+food+"&sort=n&max=25&offset=0&api_key=SCMSpSwujpUJpHPo2l8UlFj6Eplm1SozFqYa7kdc")
  .end(function(err,res){
    // console.log("Searching for a ndbno for " + food)
    var ndbno = res.body.list.item[0].ndbno
    request
    .get("api.nal.usda.gov/ndb/reports/?ndbno="+ndbno+"&type=f&format=json&api_key=SCMSpSwujpUJpHPo2l8UlFj6Eplm1SozFqYa7kdc")
    .end(function(err,res){
    	// console.log("Searching for a calorie approximation for food #" + n)
      callback("The food " + food + " is approximately " + res.body.report.food.nutrients[0].value + " calories.")
    })
  })
}