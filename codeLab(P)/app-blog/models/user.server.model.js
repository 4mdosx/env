var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  username:String,
  password:String
});

mongoose.model('User',UserSchema);
