  var mongoose = require('mongoose')
    , crypto = require('crypto')
    , Schema = mongoose.Schema;



// Schema

var bucketSchema = new Schema({
  secret: { type: String/*, required: true*/ }
, name: { type: String, required: true }
, description: { type: String, required: true }
, created_at: { type: Date, default: Date.now }
, updated_at: { type: Date, default: Date.now }
});



// Secret generator

bucketSchema.statics.getUniqueSecret = function (callback) {
  var Bucket = this.model('Bucket')
    , current_date = (new Date()).valueOf().toString()
    , random = Math.random().toString();

  secret = crypto.createHash('sha1').update(current_date + random).digest('hex');

  Bucket.count({ secret: secret }, function (err, count) {
    if (count) {
      secret = null;
    }

    callback(secret);
  });
};



// Rack it up

var Bucket = mongoose.model('Bucket', bucketSchema);
mongoose.connect('mongodb://localhost/gimmefile');