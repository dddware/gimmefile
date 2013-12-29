
/*
 * GET home page.
 */

var fs = require('fs');



exports.get = function(req, res) {
  res.render('upload');
};



exports.post = function(req, res) {
  var upload;

  if (upload = req.files.upload) {
    fs.readFile(upload.path, function (err, data) {
      var dest = upload.path.replace(/\/tmp\//, __dirname + '/upload/');

      fs.writeFile(dest, data, function (err) {
        //console.log(err);
        res.redirect("back");
      });
    });
  }
};