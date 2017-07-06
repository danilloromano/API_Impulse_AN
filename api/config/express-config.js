var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var jwt = require('jsonwebtoken');


module.exports = function(){
  var app = express();
  app.set('secret','squirtingPussy');
  app.use(express.static('../public'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(expressValidator());


  consign()
   .include('routs/auth.js')
   .then('routs')
   .then('model')
   .then('DAO')
   .into(app);

  return app;
}
