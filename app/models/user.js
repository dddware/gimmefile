var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , passportLocalMongoose = require('passport-local-mongoose');



// Schema

var userSchema = new Schema({});
userSchema.plugin(require('mongoose-timestamp'));

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});



// Alias

userSchema.statics.findByEmail = function (email) {
  return userSchema.findByUsername(email);
};



module.exports = mongoose.model('User', userSchema);