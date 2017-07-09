'use strict';

const $ = require(__base + 'lib');

const Express = require('express');

const Router = Express.Router();

Router.get('/', function(req, res) {
	// $.model.Test.create({
	// 	id: 'abc',
	// }, (err, doc) => {
	// 	console.error(err);
	// 	console.log(doc);
	// });

	$.act({
		cmd: 'generate_asset_id',
	})
	.then((result) => {
		console.log('generate_asset_id returned');
		console.log(result);
		res.status(200).send(result.id.toString());
	})
	.catch((err) => {
		console.error('in catch()');
		console.error(err);
		res.status(500).send('something went wrong');
	});
});

module.exports = Router;
