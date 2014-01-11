var express = require('express')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , path = require('path')
  , route = require('./controllers')
  , User = require('./models/user')
  , LocalStrategy = require('passport-local').Strategy;



module.exports = function()
{
  var app = express();
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.use(app.router);

  mongoose.connect('mongodb://localhost/gimmefile');



  // Passport
  
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());



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



  route(app);

  return app;
};