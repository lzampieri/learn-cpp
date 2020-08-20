var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/appactivation', async function(req, res, next) {
  if(req.user && models.users.canmanage(req.user.role) ) {
    var appid = req.body.appid;
    var active = req.body.active;
    try {
      await models.applications.update( {active: active} , { where: { id: appid } } );
    } catch(err) {
      console.log(err);
    }
    res.json({status: 'ok'});
  }
});

router.get('/addapp', function(req, res, next) {
  if(req.user && models.users.canmanage(req.user.role) ) {
    res.render('management_addapp', { title: "Add application" });
  }
  else res.redirect('/');
});

router.post('/addapp', async function(req, res, next) {
  var name = req.body.appname;
  var url = req.body.appurl;
  var internal = req.body.internal;
  var description = req.body.description;

  try {
      var application = await models.applications.create({
          name: name,
          url: url,
          internal: internal,
          description: description
      });
  } catch (err) {
      console.log(err);
      return res.json({status: 'error', message: 'Application name already exists.'});
  }

  if (application) {
      res.json({status: 'ok'});
  } else {
      res.json({status: 'error', message: 'Unexplained error. Retry.'})
  }
});

router.post('/exactivation', async function(req, res, next) {
  if(req.user && models.users.canmanage(req.user.role) ) {
    var exid = req.body.exid;
    var active = req.body.active;
    try {
      await models.exercises.update( {active: active} , { where: { id: exid } } );
    } catch(err) {
      console.log(err);
    }
    res.json({status: 'ok'});
  }
});



router.get('/addex', function(req, res, next) {
  if(req.user && models.users.canmanage(req.user.role) ) {
    res.render('management_addex', { title: "Add Exercise" });
  }
  else res.redirect('/');
});

router.get('/addex_getapp', async function(req, res, next) {
  var apps = await models.applications.findAll( { where: { active: true }} );
  return res.json( apps );
})

router.post('/addex', async function(req, res, next) {
  var title = req.body.title;
  var hardness = req.body.hardness;
  var description = req.body.description;
  var applist = JSON.parse(req.body.applist);

  console.log(applist);
  if ( hardness > 5 || hardness < 1 )
    return res.json({status: 'error', message: 'Insert an hardness between 1 and 5.'});

  try {
      var exercise = await models.exercises.create({
          title: title,
          hardness: hardness,
          description: description
      });
      if( applist.length > 0)
        var exercise_withapp = await exercise.addApplications( applist );
      else exercise_withapp = exercise;
  } catch (err) {
      console.log(err);
      return res.json({status: 'error', message: err});
  }

  if (exercise_withapp) {
      res.json({status: 'ok'});
  } else {
      res.json({status: 'error', message: 'Unexplained error. Retry.'})
  }
});

module.exports = router;
