
/*
 * GET home page.
 */

require('../models/bucket');

var mongoose = require('mongoose');
var Bucket = mongoose.model('Bucket');



exports.get = function(req, res) {
  res.render('create');
};



exports.post = function(req, res) {
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
        res.render('create', { errors: err.errors });
      } else {
        req.session.success = req.session.success || [];
        req.session.success.push('lolilol');
        res.redirect('/bucket/' + bucket.secret);
      }
    });
  };

  Bucket.getUniqueSecret(callback);
};