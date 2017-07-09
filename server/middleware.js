function Middleware() {
	this.init = function(paramdata, itemname) {
		var data = paramdata;
		var postData = {
			param: JSON.stringify(data);
		};
		var apk = require('./apk');
		var key = new apk();
		this.itemKey = key.get_itemapk(itemname);
		postData.timestamp = key.timestamp;
		postData.sign = key.get_itemsign(itemname, postData.param);
		return postData;
	}
}

Middleware.prototype.post = function(paramdata, itemname, propath, call) {
	var http = require('http');
	var postData = this.init(paramdata, itemname);
	var querystring = require('querystring');
	var queryPostData = querystring.stringify(postData);

	var req = http.request({
		host: '',
		port: 80,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
			'UDD-ApiKey': this.itemkey.key,
			'UDD-Token': this.itemkey.token
		}
	}, function(res) {
		res.setEncoding('utf-8');
		var content = '';
		res.on('data', function(chunk) {
			content+=chunk;
		});
		res.on('end', function() {
			console.log('获取数据结束'+content);
			call(content);
		})
	});
	req.write(queryPostData);
	req.end();
}