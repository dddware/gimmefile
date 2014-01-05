var express = require('express')
  , route = require('./controllers');



module.exports = function()
{
  var app = express();
  route(app);

  return app;
};