var express = require('express');
var router = express.Router();
var cors = require('cors');
var request=require('request');
var http2=require('http2');

/* GET users listing. */
router.get('/item', function(req, res, next) {
	res.append('Access-Control-Allow-Origin','http://localhost:8110');
  res.send('respond with a resource');
});

router.options('/item',function(req, res, next){
	console.log('options');
	res.append('Access-Control-Allow-Origin','http://localhost:8110');
	res.append('Access-Control-Allow-Headers','X-PINGOTHER, Content-Type');
	res.append('etag',"test");
	res.send();
});


router.get('/test',function(req,res,next){
request.get({uri:'https://www.baidu.com'/*,connection:'close'*/}, (error, innerRes, body) => {
      console.log('agent info:' + JSON.stringify(innerRes.req.agent.options));
       res.render('index', { title: 'Express' });
    });
});
module.exports = router;
