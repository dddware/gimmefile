var Bucket = require('../models/bucket')
  , fs = require('fs')
  , HttpError = require('../HttpError');



module.exports =
{
  // Display form

  get: function(req, res, next) {
    Bucket.findOne({ _id: req.params.id }, 'name description', function (err, bucket) {
      if (! bucket) {
        next(new HttpError(404));
      } else {
        res.render('upload', { bucket: bucket });
      }
    });
  }



  // Upload file to bucket

, post: function(req, res) {
    var upload;

    if (upload = req.files.upload) {
      fs.readFile(upload.path, function (err, data) {
        var dest = upload.path.replace(/\/tmp\//, __dirname + '/upload/');

        fs.writeFile(dest, data, function (err) {
          //console.log(err);
          res.redirect('back');
        });
      });
    }
  }
};