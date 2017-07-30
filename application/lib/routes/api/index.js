'use strict';

const $ = require(__base + 'lib');

const Express = require('express');
const BodyParser = require('body-parser');

const Router = Express.Router();

Router.use(BodyParser.json());
Router.use(BodyParser.urlencoded({extended: true}));

// Middleware to log all incoming requests.
Router.use((req, res, next) => {
  let requesterIP;
  try {
    requesterIP = (req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress).split(",")[0];
  } catch(err) {
    $.log.Errorf('unable to read requester IP for:');
    $.log.Error(req);
  }

  $.log.Infof('%s -> %s %s', requesterIP, req.method, req.url);
  if (req.method === 'GET') {
    $.log.Debug(req.query);
  } else if (req.method === 'POST') {
    $.log.Debug(req.body);
  }
  next();
});

// Level 1 APIs.

Router.post('/api/category/insert',
  require($.path.routes + '/api/handlers/category/insert'));

Router.post('/api/category/set_parent',
  require($.path.routes + '/api/handlers/category/setParent'));

Router.post('/api/video/insert',
  require($.path.routes + '/api/handlers/video/insert'));

// Level 2 APIs.

Router.get('/api/category/list',
  require($.path.routes + '/api/handlers/category/list'));

Router.get('/api/category/get',
  require($.path.routes + '/api/handlers/category/get'));

module.exports = Router;
