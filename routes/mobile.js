var express = require('express');
var router = express.Router();
var moment = require('moment');
var request = require('request');

var apiUrl = 'http://api.hivisasa.com';
var mediaBaseUrl = 'http://static-hivisasa-com.s3-accelerate.amazonaws.com';


/* GET mobile home page. */
router.get('/', function (req, res, next) {

    var county = 'national';
    var options = {
        //uri : apiUrl+'/articles/'+county+'/'+category,
        uri: apiUrl + '/articles/county/' + county,
        method: 'GET'
    };
    var countyDetail = '';
    var bind = {};
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            countyDetail = body;
        } else {
            countyDetail = 'Not Found';
        }
        console.log('countyDetail: ' + countyDetail);

        bind['mediaBaseUrl'] = mediaBaseUrl;
        bind['county'] = county;
//        bind['category'] = category;
        countyDetail = JSON.parse(countyDetail);
        bind['countyDetail'] = countyDetail;
        bind['moment'] = moment;

        return res.render('mobileIndex', bind);
    });

});

router.get('/:county', function (req, res, next) {

    var county = req.params.county;
    var options = {
        //uri : apiUrl+'/articles/'+county+'/'+category,
        uri: apiUrl + '/articles/county/' + county,
        method: 'GET'
    };
    var countyDetail = '';
    var bind = {};
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            countyDetail = body;
        } else {
            countyDetail = 'Not Found';
        }
        bind['mediaBaseUrl'] = mediaBaseUrl;
        bind['county'] = county;
//        bind['category'] = category;
        countyDetail = JSON.parse(countyDetail);
        bind['countyDetail'] = countyDetail;
        bind['moment'] = moment;

        return res.render('mobileIndex', bind);
    });

});

/*
 *  Route to render article detail view from specific article id
 */
router.get('/article/:articleId', function(req,res){
    var county      = '';
    var category    = '';
    var articleId   = req.params.articleId;
    
    var request = require('request');
    var options = {
        uri : apiUrl+'/articles/'+articleId,
        method : 'GET'
    }; 
    var articleDetail = '';
    request(options, function (error, response, body){
        if(!error && response.statusCode == 200){
            articleDetail = body; 
            articleDetail = JSON.parse(articleDetail);
        }
        //code to get related posts
        var options_related = {
            uri : apiUrl+'/articles/related/'+articleId,
            method : 'GET'
        }; 
        var apiResponseRelated = '';
        request(options_related, function (error, response, body){
            if (!error && response.statusCode == 200) {
                apiResponseRelated = body; 
                apiResponseRelated = JSON.parse(apiResponseRelated);
            }
            
            res.render('mobile/articleDetailDirect',{
                county:articleDetail.county,
                moment: moment,
                mediaBaseUrl:mediaBaseUrl,
                category:articleDetail.category,
                articleDetail:articleDetail,
                relatedArticles:apiResponseRelated
            });
        });
    });
});

/*
 *  Route to render article detail view from specific county and category from article id
 */
router.get('/article/:county/:category/:articleId', function(req,res){
    var county      = req.params.county;
    var category    = req.params.category;
    var articleId   = req.params.articleId;
    
    var request = require('request');
    var options = {
        uri : apiUrl+'/articles/'+articleId,
        method : 'GET'
    }; 
    var articleDetail = '';
    request(options, function (error, response, body){
        if(!error && response.statusCode == 200){
            articleDetail = body; 
            articleDetail = JSON.parse(articleDetail);
        }
        //code to get related posts
        var options_related = {
            uri : apiUrl+'/articles/related/'+articleId,
            method : 'GET'
        }; 
        var apiResponseRelated = '';
        request(options_related, function (error, response, body){
            if (!error && response.statusCode == 200) {
                apiResponseRelated = body; 
                apiResponseRelated = JSON.parse(apiResponseRelated);
            }
            
            res.render('mobile/articleDetailDirect',{
                'county':county,
                'moment': moment,
                'mediaBaseUrl':mediaBaseUrl,
                'category':category,
                'articleDetail':articleDetail,
                'relatedArticles':apiResponseRelated
            });
        });
    });
});

/*
 *  Route to render all articles from specific county and category
 */
router.get('/articles/:county/:category', function(req, res){
    var county      = req.params.county;
    var category    = req.params.category;
    
    var options = {
        uri : apiUrl+'/articles/'+county+'/'+category,
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
        
        bind['mediaBaseUrl'] = mediaBaseUrl;
        bind['county'] = county;
        bind['category'] = category;
        countyDetail = JSON.parse(countyDetail);
        bind['countyDetail'] = countyDetail;
        bind['moment'] = moment;
        return res.render('mobile/categoryDetail', bind);
    });
});




module.exports = router;
