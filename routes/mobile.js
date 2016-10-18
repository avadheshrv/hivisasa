/* aa */
var express = require('express');
var router  = express.Router();
var moment  = require('moment');
var request = require('request');
var app     = express();
//var apiUrl  = app.get('apiUrl');
var apiUrl  = 'http://api.hivisasa.com';

//var mediaBaseUrl = app.get('mediaBaseUrl');
var mediaBaseUrl = 'http://static-hivisasa-com.s3-accelerate.amazonaws.com';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { county: '' });
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
    var categoryDetail = '';
    var bind = {};
    request(options, function (error, response, body){
        if (!error && response.statusCode == 200) {
            categoryDetail = body; 
        }else {
            categoryDetail = 'Not Found';
        }
        console.log('categoryDetail: '+categoryDetail);
        
        bind['mediaBaseUrl'] = mediaBaseUrl;
        bind['county'] = county;
        bind['category'] = category;
        categoryDetail = JSON.parse(categoryDetail);
        bind['categoryDetail'] = categoryDetail;
        bind['moment'] = moment;
        
        return res.render('desktop/categoryDetails', bind);
    });
});

/*
 *  Route to render all top articles from specific county and category
 */
router.get('/articles/:county/:category/top', function(req, res){
    var county = req.params.county;
    var category = req.params.category;
    
    var options = {
        uri : apiUrl+'/articles/'+county+'/'+category+'/top',
        method : 'GET'
    }; 
    var categoryDetail = '';
    var bind = {};
    request(options, function (error, response, body){
        if (!error && response.statusCode == 200) {
            categoryDetail = body; 
        }else {
            categoryDetail = 'Not Found';
        }

        bind['mediaBaseUrl']    = mediaBaseUrl;
        bind['county']          = county;
        bind['category']        = category;
        categoryDetail          = JSON.parse(categoryDetail);
        bind['categoryDetail']  = categoryDetail;
        bind['moment']          = moment;
        
        return res.render('desktop/categoryDetails', bind);
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
            
            
            
            res.render('desktop/articleDetail',{
                'county':county,
                'moment': moment,
                'apiImgUrlPath':mediaBaseUrl,
                'category':category,
                'articleDetail':articleDetail,
                'relatedArticles':apiResponseRelated
            });
        });
    });
});

module.exports = router;
