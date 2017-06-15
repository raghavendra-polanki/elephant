'use strict';

const $ = require(__base + 'lib');

const Express = require('express');
const Router = Express.Router();

Router.get('/', function (req, res) {
	res.send("Hello API");
});

module.exports = Router;
