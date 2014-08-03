var express = require('express');
var compress = require('compression');
var session = require('express-session');
var logger = require('morgan');
var csrf = require('lusca').csrf();

var _ = require('lodash');
var path = require('path');
var connectAssets = require('connect-assets');

var app = express();

var hour = 3600000;
var day = hour * 24;
var week = day * 7;

/*
 * CSRF whitelist
 */
var csrfExclude = ['/sampleCsrfExclude'];

app.locals.pretty = true;

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(connectAssets({
  paths: [path.join(__dirname, 'public/css'), path.join(__dirname, 'public/js')],
  helperContext: app.locals
}));
app.use(logger('dev'));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'keyboard cat'
}));
app.use(function(req, res, next) {
  if (_.contains(csrfExclude, req.path)) return next();
  csrf(req, res, next);
});
app.use(express.static(path.join(__dirname, 'public'), {maxAge: week}));


app.get('/', function(req, res) {
  res.render('layout', {
    title: 'Home'
  });
});


app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});

