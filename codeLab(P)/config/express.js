var express = require('express');

module.exports = function(){
  var app = express();

  app.set('views','./app/views');
  app.set('view engine','ejs');

  //配置路由
  require('../app/routes/index.server.routes')(app);

  app.use(express.static('./public'));

  return app;
};
