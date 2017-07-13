'use strict';

const $ = require(__base + 'lib');

const Mongoose = require('mongoose');

module.exports = new Mongoose.Schema({
  category_id: String, // not adding 'required' validator validations wil be
                       // running before generating category_id to avoid
                       // dangling ids in database in case of validation fails.
  name: {
    type: Mongoose.Schema.Types.Mixed,
    validate: [
      {
        validator: (data) => {
          if (!Object.keys(data).length) {
            return false;
          }
          return true;
        },
        message: 'Category must have atleast one valid name.',
      },
      {
        validator: function(data) {
          let hasUnsupportedLanguage = false;
          Object.keys(data).forEach((lang) => {
            if ($.constants.supportedLanguages
                .indexOf(lang.toLowerCase()) === -1) {
              hasUnsupportedLanguage = true;
            }
          });

          if (hasUnsupportedLanguage) {
            return false;
          }
          return true;
        },
        message: 'Category names must be in one of the supported language.',
      },
      {
        validator: (data) => {
          let hasDefaultLanguage = false;
          Object.keys(data).forEach((lang) => {
            if (lang.toLowerCase() === $.constants.defaultLanguage) {
              hasDefaultLanguage = true;
            }
          });

          if (!hasDefaultLanguage) {
            return false;
          }
          return true;
        },
        message: 'Category must have a name in english.',
      },
    ],
  },
  children: [ // these are category_ids.
    String,
  ],
}, {
  bufferCommands: false, // disable command buffering.
  collection: 'assets',
  strict: 'throw',
});
