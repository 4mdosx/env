var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),    //日志中间件
    compress = require('compress'), //响应内容压缩
    bodyParser = require('body-parser'), //处理请求数据
    methodOverride = require('method-override'), //提供对DELETE PUT的支持
    session = require('express-session'),
    flash = require('connect-flash'),
    passport = require('passport');

module.exports = function(){
  var app = express();

  if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
  }else if(process.env.NODE_ENV === 'production'){
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended:true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use(session({
    saveUninitialized:true,
    resave:true,
    secret:config.sessionSecret
  }));
   
  app.set('views','./app/views');
  app.set('view engine','ejs');

  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  //配置路由
  require('../app/routes/index.server.routes')(app);
  require('../app/routes/users.server.routes')(app);
  require('../app/routes/articles.server.routes')(app);

  app.use(express.static('./public'));

  return app;
};
