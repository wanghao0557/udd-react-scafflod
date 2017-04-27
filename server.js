var express = require("express");
var path = require("path");
var port = process.env.PORT || 8000;
var app = express();

var webpack = require("webpack"),
	webpackDevMiddleware = require("webpack-dev-middleware"),
	webpackHotMiddleware = require("webpack-hot-middleware"),
	webpackDevConfig = require("./webpack.config.js");

var compiler = webpack(webpackDevConfig);

app.use(webpackDevMiddleware(compiler, {
	publicPath: webpackDevConfig.output.publicPath,
	noInfo: true,
	stats: {
		colors: true
	}
}));

app.use(webpackHotMiddleware(compiler));

app.use("/", express.static(path.join(__dirname, "./apps")));

app.get("/", function(req, res){
	res.sendFile('index.html', { root: path.join(__dirname, "./app") });
});