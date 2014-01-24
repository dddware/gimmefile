var bucket = require('./bucket')
  , home = require('./home')
  , create = require('./create')
  , upload = require('./upload')
  , users = require('./users');

require('express-resource');



module.exports = function(app)
{
  app.get('/', create.get);
  app.post('/', create.post);

  app.get('/home', home.get);

  app.get('/bucket/:secret', bucket.get);

  app.get('/upload/:id', upload.get);
  app.post('/upload/:id', upload.post);

  app.get('/ddd', function (req, res, next) { next(new Error(418)); });



  app.get('/test/', users.display);
  app.get('/test', function (req, res) { res.redirect(req.url + '/') });
  app.get('/partials/:name.html', users.partial);

  app.resource('users', users);
};