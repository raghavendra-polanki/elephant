'use strict';

// internals
var internals = {
    server: null,
    status: "OFF",
    serverConf: null
};

// externals
var $ = {};

$.Server = function() {
  console.log("===== Starting Servers =====");
};

module.exports = $;
