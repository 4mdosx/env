var users = require('../../app/controllers/users.server.controller'),
    articles = require('../../app/controllers/article.server.controller');

module.exports = function(app){
  app.route('/api/articles')
    .get(articles.list)
    .post(users.requiresLogin,articles.create);

  app.route('/api/articles')
    .get(articles.read)
    .put(users.requiresLogin, articles.hasAuthorization, articles.update);

  app.param('articleId', articles.articleByID);

};
