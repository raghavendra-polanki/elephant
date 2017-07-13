'use strict';

const $ = require(__base + 'lib');

let externals = {};

const compileValidationErrors = (error) => {
  if (error.name == 'ValidationError') {
    let valErrors = [];
    for (let field of error.errors) {
      valErrors.push(error.errors[field].message);
    }
    return valErrors;
  } else {
    return 'error while validating schema';
  }
};

externals.validateInstanceSchema = (instance) => {
  return new $.promise((resolve, reject) => {
    instance.validate((err) => {
      if (err) {
        console.error(err);
        reject(compileValidationErrors(err));
      } else {
        resolve();
      }
    });
  });
};

module.exports = externals;
