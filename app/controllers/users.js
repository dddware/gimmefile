var path = require('path');



module.exports =
{
  // Display SPA

  display: function(req, res) {
    res.render('users');
  }



  // Render partial

, partial: function(req, res) {
    res.render(path.join('partials', req.params.name));
  }
};