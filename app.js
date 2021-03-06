var express = require('express');
var path = require('path');
var port = process.env.PORT || 8888;
var app = express();

var webpack = require('webpack'),
	webpackDevMiddleware = require('webpack-dev-middleware'),
	webpackHotMiddleware = require('webpack-hot-middleware'),
	webpackDevConfig = require('./webpack.config.js');
var compiler = webpack(webpackDevConfig);

//Add headers can Access Control for cross-site Requests 跨域服务设置
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');

	//Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET');

	//Request headers you wish allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	//Set to true if you need the website to include cookie in the requests sent
	//to the API or session
	res.setHeader('Access-Control-Allow-Credentials', true);

	//Pass to next layer of middleware
	next();
});

app.use(webpackDevMiddleware(compiler, {
	publicPath: webpackDevConfig.output.publicPath,
	noInfo: true,
	stats: {
		colors: true
	}
}));

app.use(webpackHotMiddleware(compiler));

//定义ajax数据接口
if(process.env.NODE_env == 'dev') {
	var interface = require('./server/interface-local');
	interface.init(app);
} else {
	var interface = require('./server/interface-server');
	interface.init(app);
}

var itemName = process.env.ITEM_NAME || '';

app.listen(port, function() {
	console.log('localhost:'+port+'/'+itemName);
});

app.use('/', express.static(path.join(__dirname, './apps')));

app.get('/hotel', function(req, res) {
	console.log(root);
	res.sendFile('index.html', {root: path.join(__dirname, './apps/hotel')});
});