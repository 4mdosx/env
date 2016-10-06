module.exports = function(app){
  var article = require('../controllers/article.server.controller');

  app.get('/article',article.render)
};
