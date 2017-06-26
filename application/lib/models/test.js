'use strict';

const Mongoose = require('mongoose');

module.exports = () => {
  return new Mongoose.Schema({
    id: 'string',
  });
};
