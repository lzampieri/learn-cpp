var express = require('express');
var router = express.Router();
var models = require('../models').models;
const autoTokens = {};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('login', {current_url: req.url});
})

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
})

router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;
  // insert hashing
  let hashed = require("crypto")
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const user = await models.users.findOne({
    where: {
      username: username,
      password: hashed
    }
  });

  if(user) {
    console.log("Logged in! Username: "+username)
    req.session.user = {
      username: username
    }
    res.redirect('/');
  }
  else res.render('login', {message: 'Username and/or password incorrect.', current_url: req.url});
});


module.exports = router;
