'use strict';

const $ = require(__base + 'lib');

let externals = {};

const compileValidationErrors = (error) => {
  if (error.name == 'ValidationError') {
    let valErrors = [];

    Object.keys(error.errors).forEach((field) => {
      valErrors.push(error.errors[field].message);
    });

    return valErrors;
  } else {
    return 'Error while validating schema.';
  }
};

externals.validateInstanceSchema = (instance) => {
  return new $.promise((resolve, reject) => {
    instance.validate((err) => {
      if (err) {
        $.log.Error(err);
        reject(compileValidationErrors(err));
      } else {
        resolve();
      }
    });
  });
};

externals.validateSchemaNames = [
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
      for (let lang in data) {
        if ($.constants.supportedLanguages.indexOf(lang.toLowerCase()) === -1) {
          return false;
        }
      }
      return true;
    },
    message: 'Category names must be in one of the supported language.',
  },
  {
    validator: (data) => {
      for (let lang in data) {
        if (lang.toLowerCase() === $.constants.defaultLanguage) {
          return true;
        }
      }
      return false;
    },
    message: 'Category must have a name in english.',
  },
];

module.exports = externals;