var express = require('express');
var router = express.Router();
var models = require('../models');
let {PythonShell} = require('python-shell');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('apps_fileinput');
});


router.post('/', async function(req, res, next) {
  if( !req.files || Object.keys(req.files).length === 0) {
    return res.render('apps_fileinput', {errmessage: 'Please select a file'});
  }

  let options = { scriptPath: 'python_scripts', mode: 'binary'};
  if(process.env.PYTHON_PATH)
    options.pythonPath = process.env.PYTHON_PATH;

  var image = ''; // here I will concat data in binary codex
  let shell = new PythonShell('test.py', options);
  shell.stdout.on('data', function (data) {
    image += data.toString('binary');
  });
  await shell.send(req.files.thefile.data).end(
    function(err) {
      if(err)
        return res.render('apps_fileinput', {errmessage: err});
      let data = Buffer.from(image,'binary'); // read in binary...
      return res.render('apps_showimage',{ src: data.toString('base64')}); // and convert in graphics!
    }
  );
});

module.exports = router;