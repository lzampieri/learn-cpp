var express = require('express');
const { route } = require('./users');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Home"});
});

router.get('/exercises', function(req, res, next) {
  models.exercises.findAll().then(exlist => res.render('exercises',{ exlist: exlist, title: "Exercises" }));
});

router.get('/applications', function(req, res, next) {
  models.applications.findAll().then(applist => res.render('applications',{ applist: applist, title: "Applications" }));
});

module.exports = router;
