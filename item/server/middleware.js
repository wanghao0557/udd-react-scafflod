function Moddleware(){
     this.init=function(paramdata,itemname){
            var data = paramdata;
			var postData = {
				    param:JSON.stringify(data)
				}
			
			var apk=require("./apk");
			console.log(apk)
			
			var key = new apk();

			this.itemkey=key.get_itemapk(itemname);
			postData.timestamp = key.timestamp;
			postData.sign = key.get_itemsign(itemname,postData.param);
			return postData;
     }
}
Moddleware.prototype.get=function(paramdata,itemname,propath,call){
    
}
Moddleware.prototype.post=function(paramdata,itemname,propath,call){
	var http = require('http');
    var postData=this.init(paramdata,itemname);
    var querystring = require('querystring');
	var queryPostData = querystring.stringify(postData);
	//执行请求
	var req = http.request({
	    host: itemname+'.uddtrip.com.cn',
	    //port: 80,
	    path: propath,
	    method: 'POST',
	    headers:{
	        'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
	        'UDD-ApiKey':this.itemkey.key,
	        'UDD-Token':this.itemkey.token
	    }}, function(res) {
	      //console.log('STATUS: ' + res.statusCode);
	      //console.log('HEADERS: ' + JSON.stringify(res.headers));
	      res.setEncoding('utf8');
	      var content="";
	      res.on('data', function (chunk) {
	      	  console.log(chunk);
	          content+=chunk;
	      });
	      res.on('end', function () {
	      	  console.log("获取数据结束"+content);
              call(content);
	      });
	});

	req.write(queryPostData);
	//req.on();
	req.end();
}

Moddleware.prototype.getuuid=function(paramdata,itemname,propath,call){
	var http = require('http');
    var postData=this.init(paramdata,itemname);
    var querystring = require('querystring');
	var queryPostData = querystring.stringify(postData);
	//执行请求
	var req = http.request({
	    host: "192.168.1.90",
	    port: 8106,
	    path: propath,
	    method: 'POST',
	    headers:{
	        'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
	        'UDD-ApiKey':this.itemkey.key,
	        'UDD-Token':this.itemkey.token
	    }}, function(res) {
	      //console.log('STATUS: ' + res.statusCode);
	      //console.log('HEADERS: ' + JSON.stringify(res.headers));
	      res.setEncoding('utf8');
	      var content="";
	      res.on('data', function (chunk) {
	      	  console.log(chunk);
	          content+=chunk;
	      });
	      res.on('end', function () {
	      	  console.log("获取数据结束"+content);
              call(content);
	      });
	});

	req.write(queryPostData);
	//req.on();
	req.end();
}

Moddleware.prototype.post1=function(paramdata,itemname,propath,call){
	var http = require('http');
    var postData=this.init(paramdata,itemname);
    var querystring = require('querystring');
	var queryPostData = querystring.stringify(postData);
	//执行请求
	var req = http.request({
	    host: '192.168.1.91',
	    port: 8110,
	    path: propath,
	    method: 'POST',
	    headers:{
	        'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
	        'UDD-ApiKey':this.itemkey.key,
	        'UDD-Token':this.itemkey.token
	    }}, function(res) {
	      //console.log('STATUS: ' + res.statusCode);
	      //console.log('HEADERS: ' + JSON.stringify(res.headers));
	      res.setEncoding('utf8');
	      var content="";
	      res.on('data', function (chunk) {
	      	  console.log(chunk);
	          content+=chunk;
	      });
	      res.on('end', function () {
	      	  console.log("获取数据结束"+content);
              call(content);
	      });
	});

	req.write(queryPostData);
	//req.on();
	req.end();
}

Moddleware.prototype.post2=function(paramdata,itemname,propath,call){
	var http = require('http');
    var postData=this.init(paramdata,itemname);
    var querystring = require('querystring');
	var queryPostData = querystring.stringify(postData);
	//执行请求
	var req = http.request({
	    host: '192.168.1.91',
	    port: 8133,
	    path: propath,
	    method: 'POST',
	    headers:{
	        'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
	        'UDD-ApiKey':this.itemkey.key,
	        'UDD-Token':this.itemkey.token
	    }}, function(res) {
	      //console.log('STATUS: ' + res.statusCode);
	      //console.log('HEADERS: ' + JSON.stringify(res.headers));
	      res.setEncoding('utf8');
	      var content="";
	      res.on('data', function (chunk) {
	      	  console.log(chunk);
	          content+=chunk;
	      });
	      res.on('end', function () {
	      	  console.log("获取数据结束"+content);
              call(content);
	      });
	});

	req.write(queryPostData);
	//req.on();
	req.end();
}
Moddleware.prototype.plane=function(paramdata,itemname,propath,call){
	var http = require('http');
    var postData=this.init(paramdata,itemname);
    var querystring = require('querystring');
	var queryPostData = querystring.stringify(postData);
	//执行请求
	var req = http.request({
	    host: 'api.uddtrip.com.cn',
	    path: propath,
	    method: 'POST',
	    headers:{
	        'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
	        'UDD-ApiKey':this.itemkey.key,
	        'UDD-Token':this.itemkey.token
	    }}, function(res) {
	      //console.log('STATUS: ' + res.statusCode);
	      //console.log('HEADERS: ' + JSON.stringify(res.headers));
	      res.setEncoding('utf8');
	      var content="";
	      res.on('data', function (chunk) {
	      	  console.log(chunk);
	          content+=chunk;
	      });
	      res.on('end', function () {
	      	  console.log("获取数据结束"+content);
              call(content);
	      });
	});

	req.write(queryPostData);
	//req.on();
	req.end();
}

Moddleware.prototype.train=function(paramdata,itemname,propath,call){
	var http = require('http');
    var postData=this.init(paramdata,itemname);
    var querystring = require('querystring');
	var queryPostData = querystring.stringify(postData);
	//执行请求
	var req = http.request({
	    host: 'api.uddtrip.com.cn',
	    //port: 80,
	    path: propath,
	    method: 'POST',
	    headers:{
	        'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
	        'UDD-ApiKey':this.itemkey.key,
	        'UDD-Token':this.itemkey.token
	    }}, function(res) {
	      //console.log('STATUS: ' + res.statusCode);
	      //console.log('HEADERS: ' + JSON.stringify(res.headers));
	      res.setEncoding('utf8');
	      var content="";
	      res.on('data', function (chunk) {
	      	  console.log(chunk);
	          content+=chunk;
	      });
	      res.on('end', function () {
	      	  console.log("获取数据结束"+content);
              call(content);
	      });
	});

	req.write(queryPostData);
	//req.on();
	req.end();
}

Moddleware.prototype.corporatetravel=function(paramdata,itemname,propath,call){
	var http = require('http');
    var postData=this.init(paramdata,itemname);
    var querystring = require('querystring');
	var queryPostData = querystring.stringify(postData);
	//执行请求
	var req = http.request({
	    host: 'api.uddtrip.com.cn',
	    //port: 80,
	    path: propath,
	    method: 'POST',
	    headers:{
	        'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
	        'UDD-ApiKey':this.itemkey.key,
	        'UDD-Token':this.itemkey.token
	    }}, function(res) {
	      //console.log('STATUS: ' + res.statusCode);
	      //console.log('HEADERS: ' + JSON.stringify(res.headers));
	      res.setEncoding('utf8');
	      var content="";
	      res.on('data', function (chunk) {
	      	  console.log(chunk);
	          content+=chunk;
	      });
	      res.on('end', function () {
	      	  console.log("获取数据结束"+content);
              call(content);
	      });
	});

	req.write(queryPostData);
	//req.on();
	req.end();
}

//发票配送信息
Moddleware.prototype.invoiceCompany=function(paramdata,itemname,propath,call){
	var http = require('http');
    var postData=this.init(paramdata,itemname);
    var querystring = require('querystring');
	var queryPostData = querystring.stringify(postData);
	//执行请求
	var req = http.request({
	    host: 'corporatetravel.uddtrip.com.cn',
	    //port: 80,
	    path: propath,
	    method: 'POST',
	    headers:{
	        'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
	        'UDD-ApiKey':this.itemkey.key,
	        'UDD-Token':this.itemkey.token
	    }}, function(res) {
	      //console.log('STATUS: ' + res.statusCode);
	      //console.log('HEADERS: ' + JSON.stringify(res.headers));
	      res.setEncoding('utf8');
	      var content="";
	      res.on('data', function (chunk) {
	      	  console.log(chunk);
	          content+=chunk;
	      });
	      res.on('end', function () {
	      	  console.log("获取数据结束"+content);
              call(content);
	      });
	});

	req.write(queryPostData);
	//req.on();
	req.end();
}

Moddleware.prototype.put=function(){
	
}
Moddleware.prototype.dellet=function(){
	
}
module.exports=Moddleware;