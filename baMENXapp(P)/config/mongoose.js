const config = require('./config');
const Mongoose = require('mongoose');

module.exports = function(){
  var db = Mongoose.connect(config.db);

  require('../app/models/user.server.model.js');
  
  return db;
};
