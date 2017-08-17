'use strict';

const $ = require(__base + 'lib');

const padNumber = (num, size) => {
  let s = num.toString();
  while (s.length < size) {
    s = '0' + s;
  }
  return s;
};

const packageVideoID = (record) => {
  return record.prefix + padNumber(record.count, 5);
};

module.exports = {
  pattern: {
    cmd: 'generate_video_id',
  },
  description: 'Service to generate a new video ID',
  handler: (message, callback) => {
    $.log.Debug('service generate_video_id');

    $.mongodb.db.collection('video_counter').findAndModify(
      {prefix: $.utils.dateTime.CurrentYYMMDD()}, [],
      {$inc: {count: 1}},
      {upsert: true, new: true}, (err, doc) => {
        if (err != null) {
          $.log.Error(err);
          return callback(err, null);
        }
        return callback(null, {id: packageVideoID(doc.value)});
      });
  },
};
