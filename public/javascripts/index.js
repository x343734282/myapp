/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2020-10-29 13:41:16
 * @version $Id$
 */

function load() {
	// wx.config({
	// 	debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	// 	appId: 'wxd26bcfd571d534ed', // 必填，公众号的唯一标识
	// 	timestamp: 1603950970330, // 必填，生成签名的时间戳
	// 	nonceStr: 'abcefg', // 必填，生成签名的随机串
	// 	signature: 'f1b14319bb728f1103df910ee5513b3abccbfd95',// 必填，签名
	// 	jsApiList: ['chooseImage', 'uploadImage'] // 必填，需要使用的JS接口列表
	// });

	// wx.ready(function() {
	// 	// chooseImage();
	// 	// document.querySelector('#btnCapture').addEventListener('click', chooseImage);
		document.querySelector('#btnCapture').addEventListener('click', ajax);
	// });

	// wx.error(function(res) {
	// 	document.querySelector('#error').innerHTML = JSON.stringify(res);
	// });
}

function ajax() {
	var xhr = new XMLHttpRequest();

	xhr.open('get', '/users/item');

	xhr.onreadystatechange = function(e) {
		if (this.readyState == 4 && this.status == 200) {
			var headers = xhr.getAllResponseHeaders();
			console.log(JSON.stringify(headers));
			// var binStr = this.responseText;
			// for (var i = 0, len = binStr.length; i < len; ++i) {
			//   var c = binStr.charCodeAt(i);
			//   //String.fromCharCode(c & 0xff);
			//   var byte = c & 0xff;  // byte at offset i
			// }
		}
	}

	xhr.send();
}

function chooseImage(argument) {
	// body...
	wx.chooseImage({
		count: 1, // 默认9
		sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
		sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
		success: function(res) {
			var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
			// document.querySelector('image').src = localIds[0];
			wx.getLocalImgData({
				localId: localIds[0], // 图片的localID
				success: function(res) {
					var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
					document.querySelector('#image').src = 'data:image/png;base64,' + localData;

					sendData(localData, function() { });
				}
			});
		}
	});
}


function sendData(base64, callback) {
	// body...
	$.post('upload', { imageBase64: base64 }, function(response) {
		if (response.status != 200) {
			alert('上传出错');
		} else {
			alert('上传成功');
		}

		callback(response);
	});
}

window.onload = load;