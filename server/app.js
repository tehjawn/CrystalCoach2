#!/usr/bin/env node
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var routes = require('./routes/index');

// Set static files
app.use(express.static('app'));
app.use(express.static('.tmp'));
app.use('/bower_components', express.static(path.dirname(__dirname) + '/bower_components'));

app.use(bodyParser.json());

// Set routes
app.use('/', routes);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening at http://localhost:' + server.address().port);
});
