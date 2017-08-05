'use strict';

const $ = require(__base + 'lib');

const Express = require('express');
const Fs = require('fs');
const SwaggerUi = require('swagger-ui-express');
const Yaml = require('js-yaml');

const SwaggerDocument = Yaml.safeLoad(
    Fs.readFileSync($.path.docs + '/openapi.yaml', 'utf8'));

const Router = Express.Router();

let options = {
  supportedSubmitMethods: [],
  validatorUrl: null,
};

Router.use('/apidocs',
           SwaggerUi.serve,
           SwaggerUi.setup(SwaggerDocument, false, options));

module.exports = Router;
