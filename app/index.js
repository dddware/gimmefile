var express = require('express')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , path = require('path')
  , route = require('./controllers')
  , User = require('./models/user')
  , LocalStrategy = require('passport-local').Strategy
  , HttpError = require('./HttpError');



module.exports = function()
{
  var app = express();
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');



  // Partial class

  app.use(function (req, res, next) {
    res.locals.partial = req.url.split('/').pop() || 'home';
    next();
  });



  app.use(app.router);
  mongoose.connect('mongodb://localhost/gimmefile');



  // Passport
  
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());



  // 404 handling

  app.use(function (req, res, next) {
    next(new HttpError(404));
  });



  /*/ Error handling (dev)

  app.configure('development', function () {
    app.use(express.errorHandler());
  });

  // Error handling (prod)

  app.configure('production', function () {*/
  app.configure('development', function () {
    app.use(function (err, req, res, next) {
      console.log(err);
      statusCode = err.statusCode || 500;

      res.status(statusCode);
      res.render('error/' + statusCode);
    });
  });



  route(app);

  return app;
};