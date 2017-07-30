'use strict';

const $ = require(__base + 'lib');

const processRequest = async (req, res, next) => {
  let videoData;
  try {
    videoData = new $.model.Video(req.body);

    let currentTimestamp = Date.now();
    videoData.set({
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
      curator_id: 'initial', // TODO(surenderthakran): update when user addition
                             // is enabled.
    });

    // validate category schema.
    await $.utils.validation.validateInstanceSchema(videoData);
  } catch (err) {
    $.log.Error(err);
    res.status(500).json({status: 'INVALID_ARGUMENT', error: err});
    return;
  }
};

module.exports = function(req, res, next) {
  processRequest(req, res, next)
  .then((data) => {
    if (data !== undefined) {
      res.status(200).json({status: 'OK', data: data});
    }
  })
  .catch((err) => {
    $.log.Error(err);
    res.status(500).json({status: 'INTERNAL', error: 'something went wrong.'});
  });
};
