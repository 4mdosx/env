var config = require('./config'),
Mongoose = require('mongoose');

module.exports = function(){
  var db = Mongoose.connect(config.db);

  require('../app/models/users.server.model');
  require('../app/models/article.server.model.js');

  return db;
};
