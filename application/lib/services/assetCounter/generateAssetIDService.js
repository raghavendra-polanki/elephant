'use strict';

const $ = require(__base + 'lib');

module.exports = {
  pattern: {
    cmd: 'generate_asset_id',
  },
  description: 'test',
  handler: (message, callback) => {
    console.log('inside generate_asset_id');
    callback();
  },
};
