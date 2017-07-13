'use strict';

const $ = require(__base + 'lib');

const Mongoose = require('mongoose');

module.exports = new Mongoose.Schema({
  category_id: String, // not adding 'required' validator validations wil be
                       // running before generating category_id to avoid
                       // dangling ids in database in case of validation fails.
  name: {
    type: Mongoose.Schema.Types.Mixed,
    validate: {
      validator: function(data) {
        if (!Object.keys(data).length) {
          return false;
        }
        let hasDefaultLanguage = false;
        let hasUnsupportedLanguage = false;
        Object.keys(data).forEach((lang) => {
          if ($.constants.supportedLanguages
              .indexOf(lang.toLowerCase()) === -1) {
            hasUnsupportedLanguage = true;
          }
          if (lang.toLowerCase() === $.constants.defaultLanguage) {
            hasDefaultLanguage = true;
          }
        });

        if (!hasDefaultLanguage || hasUnsupportedLanguage) {
          return false;
        }
        return true;
      },
      message: 'Category names are not valid.',
    },
  },
  children: [ // these are category_ids.
    String,
  ],
}, {
  bufferCommands: false, // disable command buffering.
  collection: 'assets',
  strict: 'throw',
});
