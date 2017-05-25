var mongoose = require('mongoose');

// Create a schema
var videoCollectionSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoid: String,
  age: Number,
  language: String,
  duration: Number,
  popularity: { likes: Number, shares: Number},
  updated_at: { type: Date, default: Date.now },
  category: [String],
  source_site: String
});

module.exports = mongoose.model('VideoModel', videoCollectionSchema);
