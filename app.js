var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var request = require('request');
const helmet = require("helmet");

var https = require('https');

var pool = new https.Agent({ keepAlive: true, scheduling: 'lifo', timeout: 0 });
https.globalAgent = pool;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

//   //intercepts OPTIONS method
//   if ('OPTIONS' === req.method) {
//     //respond with 200
//     res.send(200);
//   }
//   else {
//     //move on
//     next();
//   }
// });


// setInterval(() => {
// request.post({uri:'https://api.weixin.qq.com/sns/oauth2/access_token'/*,connection:'close'*/}, (error, innerRes, body) => {

//        try {
//          console.log('header :'+innerRes.headers.connection);
//         // console.log('agent info:' + JSON.stringify(innerRes.req.agent.options));
//         console.log('header :'+innerRes.connection.remoteAddress);
//       } catch (e) {}

//       if (error) {
//         try {
//           console.error('https request Error', error);
//         } catch (e) {}
//       }


//        // res.render('index', { title: 'Express' });
//     });
// }, 1000);

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

// while (true) {
//   console.log('1');
// }

setTimeout(function() {
  console.log('timeout');
}, 0);

process.nextTick(function() {
  console.log('nextTick');
});
module.exports = app;
