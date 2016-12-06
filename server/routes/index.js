var express = require('express');
var router = express.Router();

// Default Path
router.get('/', function (req, res) {});

// Set Generic Paths for Crystal API
router.use('/crystal', require('./crystal'))

module.exports = router;