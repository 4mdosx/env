var express = require('express'),
    morgan = require('morgan'),    //日志中间件
    compress = require('compress'), //响应内容压缩
    bodyParser = require('body-parser'), //处理请求数据
    methodOverride = require('method-override');  //提供对DELETE PUT的支持

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

  require('../app/routes/index.server.routes')(app);    //配置路由

  return app;
};
