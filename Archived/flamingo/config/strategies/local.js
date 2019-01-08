var Passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function(){
  Passport.use(new localStrategy(function(username,password,done){
    User.findOne({
        username:username
      },function(err,user){

        if(err){
          return done(err);
        }

        if(!user){
          return done(null,false,{
            message:'Unknown user'
          });
        }

        if(! user.authenticate(password)){
          return done(null,false,{
            message:'Invalid password'
          });
        }

        return done(null,user);
      });
  }));
};
//先是用Mongoose模型User根据传入的用户名对用户进行查找，并执行鉴权。鉴权成功后，将userObj
//传递回函数done
