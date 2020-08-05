var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.get('/users', async function(req, res, next) {
  if(req.user && req.user.role == 'admin') {
    var users = await models.users.findAll( { order: [ ['username', 'ASC' ]]});
    res.render('admin_users', { title: "Users manager", users: users });
  }
  else res.redirect('/');
});

router.post('/users', async function(req, res, next) {
  if(req.user && req.user.role == 'admin') {
    var userid = req.body.userid;
    var newrole = req.body.role;
    try {
      await models.users.update( {role: newrole} , { where: { id: userid } } );
    } catch(err) {
      console.log(err);
    }
    console.log(userid);
    console.log(newrole);
    res.json({status: 'ok'});
  }
});

module.exports = router;
