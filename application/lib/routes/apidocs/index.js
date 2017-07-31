'use strict';

const $ = require(__base + 'lib');

const Express = require('express');
const SwaggerUi = require('swagger-ui-express');

const SwaggerDocument = require($.path.docs + '/openapi.json');

const Router = Express.Router();

let options = {
  supportedSubmitMethods: [],
  validatorUrl: null,
};

Router.use('/apidocs',
           SwaggerUi.serve,
           SwaggerUi.setup(SwaggerDocument, false, options));

module.exports = Router;
