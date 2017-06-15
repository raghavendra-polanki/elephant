'use strict';

const Express = require('express');

// internals
const internals = {
    server: null,
    status: 'OFF',
    serverConf: null,
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

        internals.server[connection.label] = server;

        console.log(connection.label + ' app listening at port: %s', port);

        internals.status = 'ON';
    });
  }
};

module.exports = $;
