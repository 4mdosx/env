const express = require('express');
const config = require('./config');
//middleware
const compression = require('compression');  //内容压缩
const morgan = require('morgan');  //日志
const bodyParser = require('body-parser');  //数据请求处理
const methodOverride = require('method-override'); //support HTTP DELETE & PUT
const session = require('express-session');



module.exports = function(){
  var app = express();
  //middleware *FIFO

  if(process.env.NODE_ENV === "devlopment"){
    app.use(morgan('dev'));
  }else if(process.env.NODE_ENV === "production"){
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

  app.set('views', './views');
  app.set('view engine', 'jade');

  //配置路由
  // require('../app-blog/routes/index.server.routes')(app);
  require('../cms-blog/cms-index.server.route')(app);
  app.use(express.static('./public'));

  return app;
};
