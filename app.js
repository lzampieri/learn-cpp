require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var cookie_secret = "polloarrosto";

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var managementRouter = require('./routes/management');

var models = require('./models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));


app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(cookie_secret));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var session = require("express-session");
var passport = require('passport');

var expireDate = new Date();
expireDate.setDate(expireDate.getDate() + 1);

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSIONSDB_SECRET,
  cookie: { expires: expireDate }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, {id: user.id, username: user.username, role: user.role});
});

passport.deserializeUser(function(user, done) {
  done(null, {id: user.id, username: user.username, role: user.role});
});

app.use(function(req,res,next) {
  if(req.user) {
    res.locals.user_id = req.user.id;
    res.locals.username = req.user.username;
    res.locals.userrole = req.user.role;
    res.locals.canmanage = models.users.canmanage(req.user.role);
  }
  res.locals.current_url = req.url;
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/management', managementRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

// database connection
models.sequelize.sync();

module.exports = app;
