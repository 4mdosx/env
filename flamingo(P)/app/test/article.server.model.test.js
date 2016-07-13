var app = require('../../server.js'),
  should = require('should'),
  mongoose = require('mongonse'),
  User = mongoose.model('User'),
  Article = mongoose.model('Article');

var user,article;

describe('Article Mondel Unit', function() {
  beforeEach(function(done){
    user = new User({
      firstName:'Full',
      lastName:'Name',
      displayName:'Full Name',
      email:'test@test.com',
      username:'username',
      password:'password'
    });

    user.save(function(){
      article = new Article({
        title:'Article Title',
        content:'Aticle Content',
        user:'user'
      });
    });

    done();
  });
});

describe('Testing the save method', function() {
  it('should be able to save without problems',function(){
    article.save(function(err){
      should.not.exist(err);
    });
  });

  it('Should not be able to save a article without a title', function(){
    article.title = "";

    article.save(function(err){
      should.exist(err);
    });
  });
});

afterEach(function(done){
  Article.remove(function(){
    User.remove(function(){
      done();
    });
  });
});
