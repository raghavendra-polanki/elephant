'use strict';

const $ = require(__base + 'lib');

const Joi = require('joi');

const requestSchema = Joi.object().keys({
  is_active: Joi.boolean().required(),
  url: Joi.object().keys({
    src: Joi.string().valid($.constants.videoSources).required(),
    id: Joi.string().required(),
    channel_id: Joi.string().required(),
    channel_name: Joi.string().required(),
  }),
  title: Joi.string().required(),
  desc: Joi.string().required(),
  length: Joi.number().required(),
  rating: Joi.string().valid($.constants.videoRatings).required(),
});

const processRequest = async (req, res, next) => {
  let videoData;
  try {
    let requestParameters = req.body;
    const {error, value} = Joi.validate(requestParameters, requestSchema);
    if (error != null) {
      res.status(400).json({status: 'INVALID_ARGUMENT', error: error.message});
      return;
    }

    videoData = new $.model.Video(requestParameters);

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
    res.status(400).json({status: 'INVALID_ARGUMENT', error: err});
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
