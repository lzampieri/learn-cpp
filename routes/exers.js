var express = require('express');
var router = express.Router();
var exercises = require('../models').exercises;

/* GET home page. */
router.get('/:exid', async function(req, res, next) {
  var exer = await exercises.findOne(
    { where: {
      id: req.params.exid
    }});
  if (exer == null) {
    return res.redirect('/exercises');
  }
  var apps = await exer.getApplications();
  return res.render('exers_index', {
    title: exer.title,
    exer: exer,
    apps: apps
  });
});

module.exports = router;