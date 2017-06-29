'use strict';

const $ = require(__base + 'lib');

const Mongoose = require('mongoose');

module.exports = new Mongoose.Schema({
  asset_id: String,
  urls: [
    {
      url: String,
      src: {
        type: String,
        enum: ['YOUTUBE', 'VIMEO'],
      },
    },
  ],
  title: [
    {
      val: String,
      lang: {
        type: String,
        enum: $.constants.supportedLanguages,
      },
    },
  ],
  desc: [
    {
      val: String,
      lang: {
        type: String,
        enum: $.constants.supportedLanguages,
      },
    },
  ],
  length: Number,
  lang: {
    val: String,
    enum: $.constants.supportedLanguages,
  },
  rating: {
    val: String,
    enum: ['U', 'UA', 'A'],
  },
  curator_id: String,
  curated_on: Number,
  verifier_id: String,
  verified_on: Number,
  created_at: Number,
  updated_at: Number,
}, {
  bufferCommands: false, // disable command buffering.
  collection: 'assets',
  strict: 'throw',
});
