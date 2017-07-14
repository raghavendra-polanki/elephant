'use strict';

const $ = require(__base + 'lib');

const Express = require('express');
const BodyParser = require('body-parser');

const Router = Express.Router();

Router.use(BodyParser.json());
Router.use(BodyParser.urlencoded({extended: true}));

// middleware to change all fields in input to lowercase.
Router.use((req, res, next) => {
  $.log.Info('inside middleware');
  $.log.Info(req.body);
  next();
});

// Level 1 APIs.

Router.post('/api/insert_category',
  require($.path.routes + '/api/handlers/insertCategory'));

module.exports = Router;
