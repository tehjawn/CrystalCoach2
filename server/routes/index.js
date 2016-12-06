var express = require('express');
var router = express.Router();

// Default Path
router.get('/', function (req, res) {});

// 
router.post('/crystal', function (req, res) {
	res.send("Hi there, it's me, Crystal")
})

module.exports = router;