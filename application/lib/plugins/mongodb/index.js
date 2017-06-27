'use strict';

const Mongoose = require('mongoose');
const Promise = require('bluebird');

module.exports = (options, callback) => {
  return new Promise((resolve, reject) => {
    let dbConnection = Mongoose.createConnection('mongodb://' + options.host +
      ':' + options.port + '/' + options.db);

    dbConnection.on('connecting', () => {
      console.log('Connecting to mongo database');
    });
    dbConnection.on('error', (err) => {
      console.error('Error connecting to mongo database.');
      console.error(err);
      return reject(err);
    });
    dbConnection.once('open', () => {
      console.log('Connected to mongo database');
      return resolve(dbConnection);
    });
  });
};
