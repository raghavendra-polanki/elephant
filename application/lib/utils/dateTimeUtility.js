'use strict';

const Moment = require('moment-timezone');

let externals = {};

/**
 * currentYearMonth returns the current date's year and month in YYMM format.
 *
 * @return {string}
 */
externals.currentYearMonthDate = function() {
  return Moment().tz('Asia/Kolkata').format('YYMMDD');
};

module.exports = externals;
