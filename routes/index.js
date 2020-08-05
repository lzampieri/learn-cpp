var express = require('express');
const { route } = require('./users');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Home"});
});

router.get('/fractal', function(req, res, next) {
  res.render('fractals', { title: "Fractals" });
});

router.get('/exercises', function(req, res, next) {
  models.exercises.findAll().then(exlist => res.render('exercises',{ exlist: exlist, title: "Exercises" }));
});

module.exports = router;
