process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//设置环境变量：  in shell - export NODE_ENV = development
var   Mongoose = require('./config/mongoose'),
      express = require('./config/express'),
      Passport = require('./config/passport');

var db = Mongoose();
var app = express();
var passport = Passport();

app.listen(3000);

module.exports = app;
console.log('Server running at http://localhost:3000');
