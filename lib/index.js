'use strict';

const Express = require('express');
const Glob = require('glob');
const Path = require('path');

// internals
const internals = {
    server: null,
    status: 'OFF',
    serverConf: null,
};

// Utilities
const getUtilities = function() {
    let options = {
        nodir: true,
        strict: true,
        cwd: process.cwd(),
    };
    return Glob.sync($.path.utils + '/*Utility.js', options);
};

const addUtilities = function() {
    console.log('\n===== Adding utilities... =====');

    $.utils = {};
    let files = getUtilities();
    files.forEach(function(file) {
        console.log(file);
        let fileName = Path.basename(file);
        let utilityName = fileName.substring(0, fileName.indexOf('Utility'));

        $.utils[utilityName] = require(file);
    });
};

const addRoutes = function(app, label) {
  console.log('\n====== Adding "' + label + '" routes... ======');

  app.use('/', require($.path.routes + '/' + label));
};

const init = function() {
  console.log('\nInitializing app...');
  console.log('Environment: ' + $.NODE_ENV);
  console.log(process.env);

  $.path = {};
  $.path.root = Path.resolve(__dirname + '/..');
  $.path.routes = Path.resolve($.path.root + '/lib/routes');
  $.path.utils = Path.resolve($.path.root + '/lib/utils');

  addUtilities();
};

// externals
const $ = {};

$.Server = function() {
  console.log('===== Starting Servers =====');
  if (internals.server && internals.status === 'ON') {
      return internals.server;
  } else if (internals.status === 'OFF') {
    internals.server = {};

    let connection = {
      port: 17883,
      label: 'api',
    };

    let app = Express();

    let server = app.listen(connection.port, function() {
        // let host = server.address().address;
        let port = server.address().port;

        // Added custom label to identify type of server later on
        server.label = connection.label;

        addRoutes(app, connection.label);

        console.log(connection.label + ' app listening at port: %s', port);

        internals.server[connection.label] = server;
        internals.status = 'ON';
    });
  }
};

init();

module.exports = $;
