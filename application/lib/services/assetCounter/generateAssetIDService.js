'use strict';

const $ = require(__base + 'lib');

module.exports = {
  pattern: {
    cmd: 'generate_asset_id',
  },
  description: 'Service to generate a new asset ID',
  handler: (message, next) => {
    console.log('inside generate_asset_id');

    $.mongodb.db.collection('asset_counter').findAndModify(
      {prefix: $.utils.dateTime.currentYearMonthDate()}, [],
      {$inc: {count: 1}},
      {upsert: true, new: true}, (err, doc) => {
        if (err != null) {
          console.error(err);
          return next(err, null);
        }
        return next(doc.value.count, null);
      });
  },
};
