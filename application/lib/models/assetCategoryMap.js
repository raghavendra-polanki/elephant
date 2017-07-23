'use strict';

const Mongoose = require('mongoose');

module.exports = new Mongoose.Schema({
  asset_id: String,
  category_id: String,
  weightage: Number,
}, {
  bufferCommands: false, // disable command buffering.
  collection: 'asset_category_map',
  strict: 'throw',
});
