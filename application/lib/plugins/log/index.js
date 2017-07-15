'use strict';

const $ = require(__base + 'lib');

const Winston = require('winston');

// TODO(surenderthakran): update logger transport
let logger = new (Winston.Logger)({
  transports: [
    new (Winston.transports.Console)(
      {
        colorize: true,
        prettyPrint: function(object) {
          return JSON.stringify(object);
        },
        timestamp: function() {
          return $.utils.dateTime.LogTime();
        },
      }
    ),
  ],
});

if ($.NODE_ENV === 'development') {
  logger.level = 'debug';
}

let externals = {};

externals.Error = (data) => {
  logger.error(data);
};

externals.Warning = (data) => {
  logger.warn(data);
};

externals.Info = (data) => {
  logger.info(data);
};

externals.Debug = (data) => {
  logger.debug(data);
};

module.exports = (options) => {
  return new $.promise((resolve, reject) => {
    return resolve(externals);
  });
};
