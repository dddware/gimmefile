
/**
 * Module dependencies.
 */

var express = require('express')
  , create = require('./routes/create')
  , bucket = require('./routes/bucket')
  , upload = require('./routes/upload')
  , http = require('http')
  , path = require('path')
  , livereload = require('express-livereload');

var app = express();
livereload(app, { watchDir: process.cwd() });

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', create.get);
app.post('/', create.post);

app.get('/bucket/:secret', bucket.get);

app.get('/upload/:id', upload.get);
app.post('/upload/:id', upload.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
