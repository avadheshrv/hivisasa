var express = require('express');
var router  = express.Router();
var moment  = require('moment');
var request = require('request');

var apiUrl  = 'http://api.hivisasa.com';
var mediaBaseUrl = 'http://static-hivisasa-com.s3-accelerate.amazonaws.com';


/* GET mobile home page. */
router.get('/', function(req, res, next) {
    
   var county = 'national';
    var options = {
        //uri : apiUrl+'/articles/'+county+'/'+category,
        uri: apiUrl+'/articles/county/'+county,
        method : 'GET'
    }; 
    var countyDetail = '';
    var bind = {};
    request(options, function (error, response, body){
        if (!error && response.statusCode == 200) {
            countyDetail = body; 
        }else {
            countyDetail = 'Not Found';
        }
        console.log('countyDetail: '+countyDetail);
        
        bind['mediaBaseUrl'] = mediaBaseUrl;
        bind['county'] = county;
//        bind['category'] = category;
        countyDetail = JSON.parse(countyDetail);
        bind['countyDetail'] = countyDetail;
        bind['moment'] = moment;
        
        return res.render('mobileIndex', bind);
    });
  
});

router.get('/:county', function(req, res, next) {
    
   var county = req.params.county;
    var options = {
        //uri : apiUrl+'/articles/'+county+'/'+category,
        uri: apiUrl+'/articles/county/'+county,
        method : 'GET'
    }; 
    var countyDetail = '';
    var bind = {};
    request(options, function (error, response, body){
        if (!error && response.statusCode == 200) {
            countyDetail = body; 
        }else {
            countyDetail = 'Not Found';
        }
        console.log('countyDetail: '+countyDetail);
        
        bind['mediaBaseUrl'] = mediaBaseUrl;
        bind['county'] = county;
//        bind['category'] = category;
        countyDetail = JSON.parse(countyDetail);
        bind['countyDetail'] = countyDetail;
        bind['moment'] = moment;
        
        return res.render('mobileIndex', bind);
    });
  
});



module.exports = router;
