'use strict';

const $ = require(__base + 'lib');

const Joi = require('joi');

const requestSchema = Joi.object().keys({
  id: Joi.string().alphanum().required(),
  parents: Joi.array().unique().items(Joi.string().alphanum().required()),
});

const processRequest = async (req, res, next) => {
  try {
    let requestParameters = req.body;
    const {error, value} = Joi.validate(requestParameters, requestSchema);
    if (error != null) {
      res.status(500).json({status: 'INVALID_ARGUMENT', error: error.message});
      return;
    }
  } catch (err) {
    $.log.Error(err);
    res.status(500).json({status: 'INTERNAL', error: 'something went wrong.'});
    return;
  }
};

module.exports = function(req, res, next) {
  processRequest(req, res, next)
  .then((data) => {
    console.log(data);
    if (data !== undefined) {
      res.status(200).json({status: 'OK', data: data});
    }
  })
  .catch((err) => {
    $.log.Error(err);
    res.status(500).json({status: 'INTERNAL', error: 'something went wrong.'});
  });
};
