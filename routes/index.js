var express = require('express');
var router = express.Router();
var request = require('request');
var https = require('https');
const path = require('path');
const fs = require("fs");
var csvWriter = require('csv-write-stream');
var writer = csvWriter();


var pool = new https.Agent({ keepAlive: true, scheduling: 'lifo', maxSockets: 100 });
// https.globalAgent=pool;
/* GET home page. */
router.get('/', function(req, res, next) {
	// res.sendFile(path.join(__dirname + '/../views/index.html'));
	// request.get({uri:'https://www.baidu.com'/*,connection:'close'*/}, (error, innerRes, body) => {
	//   console.log('remote address:'+innerRes.connection.remoteAddress);
	//        try {
	//         console.log('agent info:' + JSON.stringify(innerRes.req.agent.options));
	//       } catch (e) {}

	//       if (error) {
	//         try {
	//           console.error('https request Error', error);
	//         } catch (e) {}
	//       }


	//        res.render('index', { title: 'Express' });
	//     }).on('socket',socket=>{

	//     });
	// req.headers["user-agent"];

	// writer.pipe(fs.createWriteStream('out.csv'));
	// for (var i = 1000 - 1; i >= 0; i--) {
	// 	writer.write({ hello: i + "" });
	// }
	// writer.end();
	res.render('index', { title: 'Express', agent: req.headers["user-agent"] });
});

router.get('/sap', function(req, res, next) {
	// res.status=302;

});

router.get('/sap/callback', function(req, res, next) {
	// res.status=302;
	// res.location=''

	res.send('ok');
});

router.post('/upload', function(req, res, next) {
	let fileName = new Date().getTime() + '.png';
	let filePath = path.join(__dirname + '/../public/images/' + fileName);
	var base64String = req.body.imageBase64;
	const imageUrl = 'http://productcode.innocellence.com/' + 'public/images/' + fileName;
	const token = '38_HML4ZX117wkMq8zqiD8lVGNNBxSdbfGG9wOCLzepdz5UeWtvkKAqaYKK3q-ClYQB96LNGiu96XCASbY22H1Vn3RHGI3ooXpTnzXDcdiONakTwHYNvBwpCg2uiCLP1sSfbGg1sL2YNQyum27pFQXcAAALWD';


	fs.writeFile(filePath, base64String, { encoding: 'base64' }, function(error) {
		if (error) {
			console.log(JSON.stringify(error));
			res.json({ status: 99 });
		} else {
			// request.get(`https://api.weixin.qq.com/cv/ocr/comm?img_url=${imageUrl}&access_token=${token}`, function(arg1, arg2, response) {
			// 	let responseData = JSON.parse(response);
			// 	if (responseData.errcode === 0) {
			// 		res.json({ status: 200, items: responseData.items });
			// 	} else {
			// 		console.log(JSON.stringify(responseData));
			// 		res.json({ status: 99, message: 'ocr error' });
			// 	}
			// });
			res.json({ status: 200 });
		}
	});
});

module.exports = router;
