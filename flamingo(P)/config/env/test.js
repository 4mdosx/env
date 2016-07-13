module.exports = {
  db:'mongodb://localhost/mean-book-test',
  sessionSecret:'Your Application Session Secret',
  viewEngine:'ejs',
  facebook:{
    client:'APP_ID',
    clientSecret:'APP_SECRET',
    callbackURL:'http://localhost:3000/oauth/facebook/callback'
  },
  twitter:{
    client:'APP_ID',
    clientSecret:'APP_SECRET',
    callbackURL:'http://localhost:3000/oauth/facebook/callback'
  },
  google:{
    client:'APP_ID',
    clientSecret:'APP_SECRET',
    callbackURL:'http://localhost:3000/oauth/facebook/callback'
  }
};
