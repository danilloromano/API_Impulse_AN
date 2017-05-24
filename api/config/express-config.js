var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
// var session = require('express-session');

module.exports = function(){
  var app = express();

  app.use(express.static('../public'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(expressValidator());
  // app.use(session({secret: 'squirting'}));

  consign()
   .include('routs')
   .then('DAO')
  //  .then('../public')
   .into(app);

  return app;
}
