'use strict';

const Moment = require('moment-timezone');

let externals = {};

/**
 * currentYearMonthDate returns the current date's year and month in YYMMDD
 * format.
 *
 * @return {string}
 */
externals.currentYearMonthDate = () => {
  return Moment().tz('Asia/Kolkata').format('YYMMDD');
};

module.exports = externals;
