'use strict';

const Mongoose = require('mongoose');

Mongoose.Promise = require('bluebird');

module.exports = function(options, callback) {
  let options = {
    host: process.env.MONGO_PORT_27017_TCP_ADDR,
    post: process.env.MONGO_PORT_27017_TCP_PORT,
    db: 'elephant-dev',
  };
  mongoose.connect('mongodb://' + options.host + ':' + options.port + '/' +
      options.db)
  .then(() =>  {
    console.log('Connected mongodb server.')
    callback();
  })
  .catch((err) => {
    console.error('Error connecting to mongodb server. ' + err);
    callback(err);
  });
};
