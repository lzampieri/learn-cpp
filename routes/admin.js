var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.get('/users', function(req, res, next) {
  if(req.user && req.user.role == 'admin')
    res.render('fractals', { title: "Fractals" });
  else res.redirect('/');
});

module.exports = router;
