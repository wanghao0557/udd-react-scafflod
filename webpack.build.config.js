var path = require('path');
var webpack = require('webpack');
var extractTextWebpackPlugin = require("extract-text-webpack-plugin");
var htmlWebpackPlugin = require("html-webpack-plugin");
var WebpackMd5Hash = require('webpack-md5-hash');

var itemName = process.env.ITEM_NAME || "";

var set = {
	outputPath: __dirname + '/dist/' + itemName + '/',
	outputPublicPath: '/'+itemName+'/'
}

module.exports = {
	entry: {
		index: __dirname+"/apps/"+itemName+"/index.jsx"
	},
	output: {
		path: set.outputPath,
		publicPath: set.outputPublicPath,
		filename: "js/[name].js"
	},
	devtool: false,
	module: {
		loaders: [
			{ test: /\.(js|jsx)$/, loader: "babel" },
			{ test: /\.(css|scss)$/, loader:extractTextWebpackPlugin.extract("style", "css!sass") },
			{ test: /\.(png|gif|jpe?g)$/, loader: 'url-loader?limit=5120&name=img/[name].[hash:8].[ext]' },
			{ test: /\.(eot|ttf|woff2?)$/, loader: 'url-loader?limit=5120&name=fonts/[name].[hash:8].[ext]' },
			{ test: /\.svg$/, loader: 'file-loader?name=svg/[name].[hash:8].[ext]' }
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.css', '.scss', '.json', '.ttf']
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'react-router': 'ReactRouter'
	},
	plugins: [
		new extractTextWebpackPlugin("css/[name].css"),
		new htmlWebpackPlugin({
			filename: "/index.html",
			template: './apps/' + itemName + '/index_template.html',
			hash: true
		}),
		new WebpackMd5Hash(),
		new webpack.optimize.UglifyJsPlugin()
	]
}