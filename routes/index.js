var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join('../client/build/index.html', {root: __dirname}));
});

module.exports = router;
