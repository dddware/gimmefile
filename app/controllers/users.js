var path = require('path')
  , User = require('../models/user');



module.exports =
{
  // Display app

  display: function(req, res) {
    res.render('users');
  }



  // Render partial

, partial: function(req, res) {
    res.render(path.join('partials', req.params.name));
  }



  // GET /

, index: function(req, res, next) {
    User.find(function (err, users) {
      if (err) {
        res.send(err);
      } else {
        res.send(users);
      }
    });
  }

  // POST /

, create: function(req, res, next) {
    User.register(new User({ email : req.body.email }), req.body.password, function (err, user) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(201);
      }
    });
  }

  // GET /:user

, show: function(req, res, next) {
    User.findById(req.params.user, function (err, user) {
      if (err) {
        res.send(err);
      } else if (! user) {
        next(new Error(404));
      } else {
        res.send(user);
      }
    });
  }

  // PUT /:user

, update: function(req, res) {
    User.findById(req.params.user, function (err, user) {
      if (err) {
        res.send(err);
      } else if (! user) {
        next(new Error(404));
      } else {
        var setEmailAndSave = function() {
          user.email = req.body.email;

          user.save(function (err) {
            if (err) {
              res.send(err);
            } else {
              res.send(user);
            }
          });
        };

        if (req.body.password) {
          user.setPassword(req.body.password, function () {
            setEmailAndSave();
          });
        } else {
          setEmailAndSave();
        }
      }
    });
  }

  // DELETE /:user

, destroy: function(req, res) {
    User.remove({ _id: req.params.user }, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send(204);
      }
    });
  }
};