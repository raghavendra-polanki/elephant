'use strict';

const $ = require(__base + 'lib');

const Mongoose = require('mongoose');

module.exports = new Mongoose.Schema({
  category_id: String,
  name: [
    {
      val: String,
      lang: {
        type: String,
        enum: $.constants.supportedLanguages,
      },
    },
  ],
  parent: String, // this is category_id.
}, {
  bufferCommands: false, // disable command buffering.
  collection: 'assets',
  strict: 'throw',
});
