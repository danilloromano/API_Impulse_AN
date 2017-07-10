var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(){
  var app = express();
  app.use(express.static('./api/public'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(expressValidator());


  consign()
   .include('api/routs')
   .then('api/DAO')
   .into(app);

  return app;
}
