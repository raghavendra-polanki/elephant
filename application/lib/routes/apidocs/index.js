'use strict';

const $ = require(__base + 'lib');

const Express = require('express');
const SwaggerUi = require('swagger-ui-express');

const SwaggerDocument = require($.path.docs + '/openapi.json');

const Router = Express.Router();

Router.use('/apidocs', SwaggerUi.serve, SwaggerUi.setup(SwaggerDocument));

module.exports = Router;
