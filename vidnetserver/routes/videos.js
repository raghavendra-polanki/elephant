var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var VideoModel = require('../models/VideoModel.js')


/* GET /videos listing. */
router.get('/', function(req, res, next) {
  VideoModel.find(function (err, videos) {
    if (err) return next(err);
    res.json(videos);
  });
});

router.post('/', function(req, res, next) {
  VideoModel.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/:id', function(req, res, next) {
  VideoModel.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', function(req, res, next) {
  VideoModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
  VideoModel.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;
