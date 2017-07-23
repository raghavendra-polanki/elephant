'use strict';

const $ = require(__base + 'lib');

const Express = require('express');
const BodyParser = require('body-parser');

const Router = Express.Router();

Router.use(BodyParser.json());
Router.use(BodyParser.urlencoded({extended: true}));

// Middleware to log all incoming requests.
Router.use((req, res, next) => {
  $.log.Infof('%s %s', req.method, req.url);
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

// Level 2 APIs.

Router.get('/api/category/list',
  require($.path.routes + '/api/handlers/category/list'));

Router.get('/api/category/get',
  require($.path.routes + '/api/handlers/category/get'));

module.exports = Router;