var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./database');
var mongoose = require('mongoose');


var routes = require('./routes/index');
var upload = require('./routes/upload');
var photo = require('./routes/photo');
var gallery = require('./routes/gallery');
var view = require('./routes/view');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db.openConnection();
var conn = mongoose.connection;

function exitHandler() {
  conn.close();
}

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function () {
  app.use('/', routes);
  app.use('/upload', upload);
  app.use('/photo', photo);
  app.use('/gallery', gallery);
  app.use('/view', view);


  // catch 404 and forward to error handler
    /*app.use(function(req, res, next) {
     var err = new Error('Not Found');
     err.status = 404;
     next(err);
     });
     */
  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  process.on('exit', exitHandler);
  process.on('SIGINT', exitHandler);

});






module.exports = app;
