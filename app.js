// Dependencies

var express = require('express')
  , routes = {
      create: require('./routes/create')
    , bucket: require('./routes/bucket')
    , upload: require('./routes/upload')
  }
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , livereload = require('express-livereload')
  , MongoStore = require('connect-mongo')(express);

var app = express();
livereload(app, { watchDir: process.cwd() });



// Middlewares

// Logging (dev)
app.configure('development', function () {
  app.use(express.logger('dev'));
});

// Logging (prod)
app.configure('production', function () {
  var logStream = fs.createWriteStream(__dirname + '/production.log', { flags: 'a' });
  app.use(express.logger({ stream: logStream }));
});

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.cookieParser());

// Start session (dev)
app.configure('development', function () {
  app.use(express.session({
    secret: 'ddd'
  }));
});

// Start session (prod)
app.configure('production', function () {
  app.use(express.session({
    secret: '1o)p^#xsl0am=kukk*im!ha&suu^w(_z^r=pn75_%m@&=q&6wr6$96k8o3h*(9%k!b82)uy8#w(sgp9h$dnwyhkzb7%ir9f%chxe4d&liw+l2f=yxyyf#$5c-gvdic!juacd^2(v%g0i8k@aarjb6n'
  , store: new MongoStore({ url: 'mongodb://localhost/gimmefile' })
  }));
});

// Pass flash data to views && clear them
app.use(function (req, res, next) {
  res.locals.flash = req.session.flash || {};
  res.locals.post = req.session.post || {};
  next();
  req.session.flash = null;
  req.session.post = null;
});

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// Set flash data defaults
app.use(function (req, res, next) {
  req.session.flash = req.session.flash || {
    error: [],
    warning: [],
    info: [],
    success: []
  };

  req.session.post = req.session.post || {};
  next();
});

app.use(app.router);

// 404 handling
app.use(function (req, res, next) {
  next(new Error(404));
});

// Error handling (dev)
app.configure('development', function () {
  app.use(express.errorHandler());

});

// Error handling (prod)
app.configure('production', function () {
  app.use(function (err, req, res, next) {
    var code = parseInt(err.message);
    code = code || 500;

    res.status(code);
    res.render('error/' + code);
  });
});



// Routes

app.get('/', routes.create.get);
app.post('/', routes.create.post);

app.get('/bucket/:secret', routes.bucket.get);

app.get('/upload/:id', routes.upload.get);
app.post('/upload/:id', routes.upload.post);

app.get('/ddd', function (req, res, next) { next(new Error(418)); });



// Away we go

http.createServer(app).listen(app.get('port'), function () {
  console.log("Go to http://localhost:" + app.get('port'));
});
