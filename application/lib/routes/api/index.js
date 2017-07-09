'use strict';

const $ = require(__base + 'lib');

const Express = require('express');
const BodyParser = require('body-parser')

const Router = Express.Router();

Router.use(BodyParser.json());
Router.use(BodyParser.urlencoded({ extended: true }));

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

Router.post('/api/insert_category',
						require($.path.routes + '/api/handlers/insertCategory'));

module.exports = Router;
