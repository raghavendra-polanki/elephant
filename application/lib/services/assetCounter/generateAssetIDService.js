'use strict';

const $ = require(__base + 'lib');

module.exports = {
  pattern: {
    cmd: 'generate_asset_id',
  },
  description: 'Service to generate a new asset ID',
  handler: (message, callback) => {
    console.log('inside generate_asset_id');

    return new Promise((resolve, reject) => {
      $.mongodb.db.collection('asset_counter').findAndModify(
        {prefix: $.utils.dateTime.currentYearMonthDate()}, [],
        {$inc: {count: 1}},
        {upsert: true, new: true}, (err, doc) => {
          if (err != null) {
            console.error(err);
            return reject(err);
          }
          return resolve(doc.value.count);
        });
    });
  },
};
