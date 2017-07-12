'use strict';

const $ = require(__base + 'lib');

const Mongoose = require('mongoose');

module.exports = new Mongoose.Schema({
  category_id: String, // not adding required validator since we will be running
                       // validation before generating category_id to avoid
                       // dangling ids in database in case of validation fails.
  name: {
    type: [
      {
        val: {
          type: String,
          required: true,
        },
        lang: {
          type: String,
          enum: $.constants.supportedLanguages,
          required: true,
        },
      },
    ],
    validate: {
      validator: function(names) {
        return names.length;
      },
      message: 'A Category must have atleast one valid name.',
    },
  },
  parent: [ // these are category_id.
    String,
  ],
}, {
  bufferCommands: false, // disable command buffering.
  collection: 'assets',
  strict: 'throw',
});
