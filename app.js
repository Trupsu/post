var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var fs = require('fs');

var indexRouter = require('./routes/index');
var postRouter = require('./routes/post.routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/post', postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// mongoose.connect('mongodb://localhost/post');
mongoose.connect('mongodb://localhost/post', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(`connection to database established`)
}).catch(err => {
  console.log(`db error ${err.message}`);
  process.exit(-1)
})

var db = mongoose.connection;
var routePath = "./routes/";

app.get('/', function(req, res) {
  res.send('this is server');
});

fs.readdirSync('./routes').forEach(function(file) {
  if (file.substr(-3) == '.js') {
    route = require(routePath + file);
    // route.Controller(app);
  }
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
