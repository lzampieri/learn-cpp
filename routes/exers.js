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
  console.log( await exer.countApplications() );
  return res.render('exers_index', {
    title: exer.title,
    exer: exer
  });
});

module.exports = router;