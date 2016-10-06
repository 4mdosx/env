var users = require('../controllers/user.server.controller.js');

module.exports = function(app){
  app.route('/users').post(users.create);
};
