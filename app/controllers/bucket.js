var Bucket = require('../models/bucket')
  , HttpError = require('./HttpError');



module.exports =
{
  // Display bucket page
  
  get: function(req, res, next) {
    Bucket.findOne({ secret: req.params.secret }, 'name description secret', function (err, bucket) {
      if (! bucket) {
        next(new HttpError(404));
      } else {
        res.render('bucket', { bucket: bucket, url: req.protocol + "://" + req.get('host'), uri: req.url });
      }
    });
  }
};