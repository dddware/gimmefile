require('../models/bucket');
var mongoose = require('mongoose');
var Bucket = mongoose.model('Bucket');



exports.get = function(req, res) {
  Bucket.findOne({ secret: req.params.secret }, 'name description', function (err, bucket) {
    if (err) {
      return handleError(err);
    }

    res.render('bucket', { bucket: bucket });
  });
};