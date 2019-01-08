/* eslint-disable */
// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
mongoose.Promise = require('bluebird');
mongoose.set('debug', true)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('connection is open')
});

var kittySchema = mongoose.Schema({
    name: String
});
kittySchema.statics.findByName = function (name, cb) {
  this.find({ name: new RegExp(name, 'i') }, cb);
}
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name"
  console.log(greeting);
}
var Kitten = mongoose.model('Kitten', kittySchema);

// var fluffy = new Kitten({ name: 'fluffy' });
// var mmm = new Kitten({name: 'mmm'});
// mmm.save()
// fluffy.save(function (err, fluffy) {
//   if (err) return console.error(err);
//   fluffy.speak();
//   Kitten.find({ name: /^fluff/ }, function (err, kittens) {
//     if (err) return console.error(err);
//     console.log(kittens)
//   })
// })

module.exports = {
  Kitten
}
