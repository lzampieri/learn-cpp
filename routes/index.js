var express = require('express');
const { route } = require('./users');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Learn C++' });
});

router.get('/fractal', function(req, res, next) {
  res.render('fractals', { title: 'Fractals' });
});

module.exports = router;
