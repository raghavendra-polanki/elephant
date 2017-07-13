'use strict';

const $ = require(__base + 'lib');

const Mongoose = require('mongoose');

module.exports = new Mongoose.Schema({
  category_id: String, // not adding 'required' validator validations wil be
                       // running before generating category_id to avoid
                       // dangling ids in database in case of validation fails.
  name: {
    type: Mongoose.Schema.Types.Mixed,
    validate: $.utils.validation.validateSchemaNames,
  },
  children: [ // these are category_ids.
    String,
  ],
}, {
  bufferCommands: false, // disable command buffering.
  collection: 'assets',
  strict: 'throw',
});
