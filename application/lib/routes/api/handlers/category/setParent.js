'use strict';

const $ = require(__base + 'lib');

const processRequest = async (req, res, next) => {
  try {
    console.log(req.body);
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
