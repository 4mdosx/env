var express = require('express');
var app = express();

app.use('/',function(reg,res){
  res.send('Hello World');
});

app.listen(3000);
console.log('running at http://localhost:3000/');

module.exports = app;
