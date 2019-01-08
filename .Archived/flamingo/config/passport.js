var Passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function(){
  var User = mongoose.model('User');

  Passport.serializeUser(function(user,done){
    return done(null,user.id);
  });

  Passport.deserializeUser(function(id,done){
    User.findOne({
      _id:id
    },'-password -salt',function(err,user){
      done(err,user);
    });
  });

  require('./strategies/local.js')();
};
