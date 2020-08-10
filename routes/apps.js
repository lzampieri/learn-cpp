var express = require('express');
var router = express.Router();
var models = require('../models');
let {PythonShell} = require('python-shell');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('apps_default');
});


router.post('/', function(req, res, next) {
  if( !req.files || Object.keys(req.files).length === 0) {
    return res.render('apps_default', {errmessage: 'Please select a file'});
  }

  let options = { scriptPath: 'python_scripts', mode: 'binary'};
  if(process.env.PYTHON_PATH)
    options.pythonPath = process.env.PYTHON_PATH;

  let shell = new PythonShell('test.py', options);
  shell.stdout.on('data', function (data) {
    let result_string = data.toString('binary');
    //console.log(result_string);
    res.json({ result: result_string});
  });
  shell.send(req.files.thefile.data).end();
});

module.exports = router;