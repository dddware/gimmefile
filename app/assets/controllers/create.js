var Bucket = require('../models/bucket');



module.exports =
{
  // Display form

  get: function(req, res) {
    res.render('create');
  }



  // Create bucket

, post: function(req, res) {
    var callback = function(secret) {
      if (! secret) {
        Bucket.getUniqueSecret(callback);
        return;
      }

      Bucket.create({
        secret: secret,
        name: req.body.name,
        description: req.body.description
      }, function (err, bucket) {
        if (err) {
          for (key in err.errors) {
            req.session.flash.error.push(err.errors[key].message);
          }

          req.session.post.name = req.body.name;
          req.session.post.description = req.body.description;

          res.redirect('/');
        } else {
          req.session.flash.success.push('Bucket "' + bucket.name + '" créé avec succès');

          res.redirect('/bucket/' + bucket.secret);
        }
      });
    };

    Bucket.getUniqueSecret(callback);
  }
};