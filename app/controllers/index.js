var bucket = require('./bucket')
  , home = require('./home')
  , create = require('./create')
  , upload = require('./upload')
  , users = require('./users')
  , HttpError = require('../HttpError');

require('express-resource');



module.exports = function(app)
{
  // Partial tunnel for Angular
  app.get('/partials/:name.html', function(req, res) {
    res.render(path.join('partials', req.params.name));
  });

  // Homepage
  app.get('/', home.get);

  // Create bucket
  app.get('/create', create.get);
  app.post('/create', create.post);

  // Bucket (secret) page
  app.get('/bucket/:secret', bucket.get);

  // Upload files to bucket
  app.get('/upload/:id', upload.get);
  app.post('/upload/:id', upload.post);

  // I'm a teapot
  app.get('/ddd', function (req, res, next) { next(new HttpError(418)); });



  // Sample Angular app (User CRUD)

  app.get('/test/', users.display);
  app.get('/test', function (req, res) { res.redirect(req.url + '/') });

  app.resource('users', users);
};