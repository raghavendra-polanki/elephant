'use strict';

const $ = require(__base + 'lib');

const Mongoose = require('mongoose');

module.exports = new Mongoose.Schema({
  user_id: String,
  name: [
    {
      first: String,
      middle: String,
      last: String,
      lang: {
        type: String,
        enum: $.constants.supportedLanguages,
      },
    },
  ],
  mob_nos: [
    {
      code: Number,
      num: Number,
    },
  ],
  email_ids: [
    String,
  ],
  pref_langs: [
    {
      type: String,
      enum: $.constants.supportedLanguages,
    },
  ],
  age_group: {
    type: String,
    enum: [
      'below 18',
    	'18 to 21',
    	'21 to 25',
    	'25 to 30',
    	'30 to 50',
    	'above 50',
    ],
  },
  created_at: Number,
  updated_at: Number,
}, {
  bufferCommands: false, // disable command buffering.
  collection: 'assets',
  strict: 'throw',
});
