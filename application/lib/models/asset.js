'use strict';

const $ = require(__base + 'lib');

const Mongoose = require('mongoose');

module.exports = new Mongoose.Schema({
  id: String, // not adding 'required' validator validations wil be running
              // before generating id to avoid dangling ids in database in case
              // of validation fails.
  urls: [
    {
      url: String,
      src: {
        type: String,
        enum: $.constants.videoSources,
      },
    },
  ],
  title: {
    type: Mongoose.Schema.Types.Mixed,
    validate: $.utils.validation.validateMultiLangStrings,
  },
  desc: {
    type: Mongoose.Schema.Types.Mixed,
    validate: $.utils.validation.validateMultiLangStrings,
  },
  length: Number,
  lang: {
    val: String,
    enum: $.constants.supportedLanguages,
  },
  rating: {
    val: String,
    enum: $.constants.videoRatings,
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
  versionKey: false,
});

/**
  * Indices:
  *
  * db.assets.createIndex({"id": 1}, {unique: true});
  */
