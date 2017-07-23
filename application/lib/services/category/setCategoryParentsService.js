'use strict';

const $ = require(__base + 'lib');

const Async = require('async');

module.exports = {
  pattern: {
    cmd: 'set_category_parents',
  },
  description: 'Service to set parents of a category',
  handler: (message, callback) => {
    $.log.Debugf('service set_category_parents: %j', message);

    Async.eachSeries(message.data.parents, (parentId, cb) => {
      $.model.Category.findOneAndUpdate({id: parentId},
          {'$addToSet': {children: message.data.id}},
          {new: true},
          (err, doc) => {
            if (err) {
              $.log.Error(err);
              return cb(err);
            }
            return cb(null);
          });
    },
    (err) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, null);
    });
  },
};
