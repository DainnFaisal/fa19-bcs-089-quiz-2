// utilizing packages 
var createError = require('http-errors');
var express = require('express');

// path package for API routes 
var path = require('path');
var cookieParser = require('cookie-parser');


var logger = require('morgan');
// for databases 
var mongoose = require('mongoose');

var config = require('config');
var cors = require('cors');

// index users and merch routers 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/users');

var merchRouter = require('./routes/api/merch');
// generating  express app
var app = express();

// setting up view engine
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// using indexing routers
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
// using merch router
app.use('/api/merch', merchRouter);
app.use(cors());

// Error handling and catching error 404
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // setting locals
    res.locals.message = err.message;

    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // rendering page error
    res.status(err.status || 500);

    res.render('error');
});

// connecting mongoose connection 
mongoose.connect(config.get("db"), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async() => {
        console.log("database connection created");

    }).catch((error) => console.log(error.message));
//exporting module
module.exports = app;