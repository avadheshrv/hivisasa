/* aa */
var express = require('express');
var router  = express.Router();
var moment  = require('moment');
var request = require('request');

var apiUrl  = 'http://api.hivisasa.com';
var mediaBaseUrl = 'http://static-hivisasa-com.s3-accelerate.amazonaws.com';

/* GET home page. */
router.get('/mobile', function(req, res, next) {
  return res.send('mobile');
});

module.exports = router;
