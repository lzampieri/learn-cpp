var express = require('express');
var router = express.Router();
var applications = require('../models').applications;
let {PythonShell} = require('python-shell');

/* GET home page. */
router.get('/:appid', async function(req, res, next) {
  var app = await applications.findOne(
    { where: {
      id: req.params.appid
    }});
  if (app == null) {
    return res.redirect('/applications');
  }
  if (app.internal)
    return res.render('apps_fileinput', {
      title: app.name,
      appname: app.name,
      description: app.description
    });
  else
    return res.redirect(app.url);
});


router.post('/:appid', async function(req, res, next) {
  var app = await applications.findOne(
    { where: {
      id: req.params.appid
    }});
  if (app == null) {
    return res.redirect('/applications');
  }
  var script_url = app.url;

  if( !req.files || Object.keys(req.files).length === 0) {
    return res.render('apps_fileinput', {
      title: app.name,
      appname: app.name,
      description: app.description,
      errmessage: 'Please select a file'});
  }


  let options = { scriptPath: 'python_scripts', mode: 'binary'};
  if(process.env.PYTHON_PATH)
    options.pythonPath = process.env.PYTHON_PATH;

  var image = ''; // here I will concat data in binary codex
  let shell = new PythonShell(script_url, options);
  shell.stdout.on('data', function (data) {
    image += data.toString('binary');
  });
  await shell.send(req.files.thefile.data).end(
    function(err) {
      if(err)
        return res.render('apps_fileinput', {
          title: app.name,
          appname: app.name,
          description: app.description,
          errmessage: err});
      
      let data = Buffer.from(image,'binary'); // read in binary...
      return res.render('apps_showimage', {
        title: app.name,
        appname: app.name,
        errmessage: 'Please select a file',
        src: data.toString('base64')}); // and convert in graphics!
    }
  );
});

module.exports = router;