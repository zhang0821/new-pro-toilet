var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var users = require('./routes/users');
var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
var consolidate=require('consolidate');
var jade=require('jade');
var ejs=require('ejs');


app.set('views', path.join(__dirname, 'views'))
	.set('view engine','html');
app.set('views','./views');
app.engine('html',consolidate.ejs);



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
var pgdb=require("./pgsql/postgre");
var globalInfo;
var message='\'111\'';
//var operatorStr="select * from smoke_para a where a.dev_eui = '++' ";
var operatorStr="select * from smoke_para a where a.dev_eui = "+message;
//var operatorStr='select * from smoke_para ';
    setInterval(function(){
      pgdb.getQueryResult(operatorStr,function(results){
        if(globalInfo!=results){
         
if(results.rowCount > 0){
                results.rows.forEach(function(item){
                    var resultSet = 'id:' + item['id']+"smoke_status"+item['smoke_status']; 
			console.log("appjs"+resultSet);


                });
            }

        }
      });
    },10000);
*/


app.use('/', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('login', {
      msg: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('login', {
    msg: err.message,
    error: {}
  });
});


module.exports = app;
