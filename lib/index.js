'use strict';

const Express = require('express');
const path = require('path');

// internals
const internals = {
    server: null,
    status: 'OFF',
    serverConf: null,
};

const init = function () {
  console.log("\nInitializing app...");
  console.log("Environment: " + $.NODE_ENV);

  $.path = {};
  $.path.root = path.resolve(__dirname + '/..');
  $.path.routes = path.resolve($.path.root + '/lib/routes');
};

const addRoutes = function (app, label) {
  console.log("\n====== Adding '" + label + "' routes... ======");

  app.use('/', require($.path.routes + "/" + label));
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
