'use strict';

const $ = require(__base + 'lib');

module.exports = {
  pattern: {
    cmd: 'generate_category_id',
  },
  description: 'Service to generate a new category ID',
  handler: (message, callback) => {
    $.log.Debug('inside generate_category_id service');

    $.mongodb.db.collection('category_counter').findAndModify(
      {prefix: $.utils.dateTime.CurrentYYMMDD()}, [],
      {$inc: {count: 1}},
      {upsert: true, new: true}, (err, doc) => {
        if (err != null) {
          $.log.Error(err);
          return callback(err, null);
        }
        return callback(null, {id: doc.value.count});
      });
  },
};
