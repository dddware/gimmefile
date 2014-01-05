var express = require('express')
  , mongoose = require('mongoose')
  , path = require('path')
  , route = require('./controllers');



module.exports = function()
{
  var app = express();
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.use(app.router);



  // 404 handling

  app.use(function (req, res, next) {
    next(new Error(404));
  });



  // Error handling (dev)

  app.configure('development', function () {
    app.use(express.errorHandler());

  });

  // Error handling (prod)

  app.configure('production', function () {
    app.use(function (err, req, res, next) {
      var code = parseInt(err.message);
      code = code || 500;

      res.status(code);
      res.render('error/' + code);
    });
  });



  mongoose.connect('mongodb://localhost/gimmefile');
  route(app);

  return app;
};