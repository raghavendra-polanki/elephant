'use strict';

const $ = require(__base + 'lib');

const Express = require('express');

const Router = Express.Router();

Router.get('/', function(req, res) {
	console.log(new Date());
	console.log($.utils.dateTime.currentYearMonth());
	res.send('Hello API');
});

module.exports = Router;
