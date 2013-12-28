
/*
 * GET home page.
 */

exports.index = function(req, res) {
    res.render('index');
};



exports.post = function(req, res) {
    console.log(req.files);
};