'use strict';

const $ = require(__base + 'lib');

const Mongoose = require('mongoose');

module.exports = new Mongoose.Schema({
  id: String, // not adding 'required' validator because validations will be
              // running before generating 'id' to avoid dangling ids in
              // database in case of validation fails.
  is_active: {
    type: Boolean,
    required: true,
  },
  urls: {
    type: String,
    enum: $.constants.videoSources,
    required: true,
  },
  title: {
    type: Mongoose.Schema.Types.Mixed,
    validate: $.utils.validation.validateMultiLangStrings,
  },
  desc: {
    type: Mongoose.Schema.Types.Mixed,
    validate: $.utils.validation.validateMultiLangStrings,
  },
  length: {
    type: Number,
    required: true,
  },
  likes: {
    src: {
      type: Number,
      required: true,
    },
    app: {
      type: Number,
      required: true,
    },
  },
  rating: {
    type: String,
    enum: $.constants.videoRatings,
    required: true,
  },
  curator_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Number,
    required: true,
  },
  updated_at: {
    type: Number,
    required: true,
  },
}, {
  bufferCommands: false, // disable command buffering.
  collection: 'videos',
  strict: 'throw',
  versionKey: false,
});

/**
  * Indices:
  *
  * db.videos.createIndex({"id": 1}, {unique: true});
  */
