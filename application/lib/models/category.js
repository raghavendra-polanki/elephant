'use strict';

const $ = require(__base + 'lib');

const Mongoose = require('mongoose');

module.exports = new Mongoose.Schema({
  id: String, // not adding 'required' validator validations wil be running
              // before generating id to avoid dangling ids in database in case
              // of validation fails.
  name: {
    type: Mongoose.Schema.Types.Mixed,
    validate: $.utils.validation.validateMultiLangStrings,
  },
  is_root: {
    type: Boolean,
    required: true,
  },
  children: [ // these are category_ids.
    String,
  ],
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
  collection: 'categories',
  strict: 'throw',
  versionKey: false,
});

/**
  * Indices:
  *
  * db.categories.createIndex({"id": 1}, {unique: true});
  */
