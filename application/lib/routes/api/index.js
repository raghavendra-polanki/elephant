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

	// $.mongodb.db.collection('asset_counter').findAndModify(
	// 		{prefix: $.utils.dateTime.currentYearMonthDate()}, [],
	// 		{$inc: {count: 1}},
	// 		{upsert: true, new: true}, (err, doc) => {
	// 			console.log(err);
	// 			console.log(doc);
	// 			res.status(200).send('"' + doc.value.count + '"');
	// 		});

	$.act({
		cmd: 'generate_asset_id',
	})
	.then((id) => {
		res.status(200).send(id.toString());
	})
	.catch((err) => {
		console.error(err);
		res.status(500).send('something went wrong');
	});
});

module.exports = Router;
