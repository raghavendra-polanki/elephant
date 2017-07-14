'use strict';

const $ = require(__base + 'lib');

module.exports = {
  pattern: {
    cmd: 'generate_category_id',
  },
  description: 'Service to generate a new category ID',
  handler: (message, callback) => {
    $.mongodb.db.collection('category_counter').findAndModify(
      {prefix: $.utils.dateTime.currentYearMonthDate()}, [],
      {$inc: {count: 1}},
      {upsert: true, new: true}, (err, doc) => {
        if (err != null) {
          console.error(err);
          return callback(err, null);
        }
        return callback(null, {id: doc.value.count});
      });
  },
};
