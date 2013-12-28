
/*
 * GET home page.
 */

var fs = require('fs');



exports.index = function(req, res) {
    res.render('index');
};



exports.create = function(req, res) {
};



exports.bucket = function(req, res) {
    res.render('bucket');
};



exports.upload = function(req, res) {
    var upload;

    if (upload = req.files.upload) {
        fs.readFile(upload.path, function (err, data) {
            var dest = upload.path.replace(/\/tmp\//, __dirname + '/upload/');

            fs.writeFile(dest, data, function (err) {
                console.log(err);
                res.redirect("back");
            });
        });
    }
};