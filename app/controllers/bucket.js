var Bucket = require('../models/bucket');



module.exports =
{
  // Display bucket page
  
  get: function(req, res, next) {
    Bucket.findOne({ secret: req.params.secret }, 'name description', function (err, bucket) {
      if (! bucket) {
        next(new Error(404));
      } else {
        res.render('bucket', { bucket: bucket });
      }
    });
  }
};