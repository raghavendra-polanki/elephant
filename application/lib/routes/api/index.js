'use strict';

const $ = require(__base + 'lib');

const Express = require('express');
const BodyParser = require('body-parser');

const Router = Express.Router();

Router.use(BodyParser.json());
Router.use(BodyParser.urlencoded({extended: true}));

Router.use((req, res, next) => {
  $.log.Info(req.method + " " + req.url);
  if (req.method === "GET") {
    $.log.Debug(req.query);
  } else if (req.method === "POST") {
    $.log.Debug(req.body);
  }
  next();
});

// Level 1 APIs.

Router.post('/api/category/insert',
  require($.path.routes + '/api/handlers/category/insert'));

Router.get('/api/category/list',
  require($.path.routes + '/api/handlers/category/list'));

Router.get('/api/category/get',
  require($.path.routes + '/api/handlers/category/get'));

module.exports = Router;
