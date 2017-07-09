'use strict';

const $ = require(__base + 'lib');

const MongoClient = require('mongodb').MongoClient;

let externals = {};

module.exports = (options) => {
  return new $.promise((resolve, reject) => {
    let mongodbAddress = 'mongodb://' + options.host + ':' + options.port + '/'
        + options.db;
    MongoClient.connect(mongodbAddress, function(err, db) {
      if (err) {
        console.error('Error connecting to mongo database.');
        return reject(err);
      } else {
        console.log('Connected to mongo database');
        externals.db = db;
        return resolve(externals);
      }
    });
  });
};
