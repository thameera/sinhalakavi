var express = require('express');
var logger = require('morgan');

var app = express();

app.set('port', process.env.PORT || 8080);
app.use(logger('dev'));

app.get('/', function(req, res) {
  res.send('Sinhala Kavi - Coming soon!');
});

app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});

