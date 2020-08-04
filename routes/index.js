var express = require('express');
const { route } = require('./users');
var router = express.Router();
var models = require('../models').models;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { username: req.session.user, current_url: "index" });
});

router.get('/fractal', function(req, res, next) {
  res.render('fractals', { username: req.session.user, current_url: req.url });
});

router.get('/exercises', function(req, res, next) {
  models.exercise.findAll().then(exlist => res.render('exercises',{ exlist: exlist, username: req.session.user, current_url: req.url }));
});

module.exports = router;
