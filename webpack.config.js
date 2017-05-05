var path = require('path');
var webpack = require('webpack');
var extractTextWebpackPlugin = require("extract-text-webpack-plugin");
var htmlWebpackPlugin = require("html-webpack-plugin");
var hotMiddlewareScript = "webpack-hot-middleware/client?reload=true";

var itemName = process.env.ITEM_NAME || "";

var set = {
	outputPath: __dirname + '/apps/' + itemName + '/',
	outputPublicPath: 'http://localhost:8888/',
	devtool: 'cheap-module-eval-source-map'
}

module.exports = {
	entry: {
		index: [__dirname+"/apps/"+itemName+"/index.jsx", hotMiddlewareScript]
	},
	output: {
		path: set.outputPath,
		publicPath: set.outputPublicPath,
		filename: "js/[name].js"
	},
	devtool: "source-map",
	module: {
		loaders: [
			{ test: /\.(js|jsx)$/, loader: "babel" },
			{ test: /\.(css|scss)$/, loader:extractTextWebpackPlugin.extract("style", "css!sass") }
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.css', '.scss', '.json', '.ttf']
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM' 
	},
	plugins: [
		new extractTextWebpackPlugin("css/[name].css"),
		new htmlWebpackPlugin({
			filename: "/index.html",
			template: './apps/' + itemName + '/index.html',
			hash: true
		}),
		new webpack.HotModuleReplacementPlugin()
	]
}