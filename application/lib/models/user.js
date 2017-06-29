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
  profile_img: String,
  pref_langs: [
    {
      type: String,
      enum: $.constants.supportedLanguages,
    },
  ],
  categories: [
    String, // these are category_ids.
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
  gender: {
    type: String,
    enum: [
      'MALE',
      'FEMALE',
      'OTHER',
    ],
  },
  acquisition_channel: {
    type: String,
    enum: [
      'RECOMMENDATIONS',
      'PRINT MEDIA',
      'DIGITAL ADVERTISEMENTS',
      'WORD OF MOUTH',
    ],
  },
  // TODO(surenderthakran): structure user derived data.
  created_at: Number,
  updated_at: Number,
}, {
  bufferCommands: false, // disable command buffering.
  collection: 'assets',
  strict: 'throw',
});
