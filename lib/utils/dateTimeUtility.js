'use strict';

const Moment = require('moment-timezone');

let externals = {};

/**
 * currentYearMonth returns the current date's year and month in YYMM format.
 *
 * @return {string}
 */
externals.currentYearMonth = function() {
  return Moment().tz('Asia/Kolkata').format('YYMM');
};

module.exports = externals;
