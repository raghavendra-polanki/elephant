'use strict';

const $ = require(__base + 'lib');

module.exports = {
  pattern: {
    cmd: 'generate_asset_id',
  },
  description: 'Service to generate a new asset ID',
  handler: (message, callback) => {
    $.log.Debug('inside generate_asset_id service');

    $.mongodb.db.collection('asset_counter').findAndModify(
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
