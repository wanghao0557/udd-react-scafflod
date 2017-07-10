var webpack = require('webpack');
var path = require('path');
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');//http://www.jianshu.com/p/c0e1fc31940b
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var itemName = process.env.ITEM_NAME || '';
var port = process.env.PORT || 8888;

var set = {
	outputPath: __dirname+'/apps/'+itemName+'/',
	outputPublicPath: 'http://localhost:'+port+'/',
	devtool: 'cheap-module-eval-source-map'
};

module.exports = {
	entry: {
		index: ['./apps/'+itemName+'/index.jsx', hotMiddlewareScript]
	},
	output: {
		path: set.outputPath,
		publicPath: set.outputPublicPath,
		filename: 'js/[name].js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel',
				query: {
					compact: false //[BABEL] Note: The code generator has deoptimised the styling of "F:/udd-react-scafflod/note/node_modules/.4.17.4@lodash/lodash.js" as it exceeds the max of "500KB". 关键的地方在于babel-loader的compact参数设置，因为默认的compact值为'auto'。
				}
			},
			{
				test: /\.(css|scss)$/,
				loader: extractTextWebpackPlugin.extract("style", "css!sass"),
				options: {
					minimize: true
				}
			},
			{
				test: /\.(png|gif|jpe?g)$/,
				loader: 'url-loader?limit=5120&name=imgs/[name].[hash:8].[ext]'//=> 如果 "file.png" 大小低于 5kb 将返回 data URL
			},
			{
				test: /\.(eot|ttf|woff)$/,
				loader: 'url-loader?limit=5120&name=fonts/[name].[hash:8].[ext]'
			},
			{
				test: /\.svg$/,
				loader: 'file-loader?name=fonts/[name].[hash:8].[ext]'
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.css', '.scss', '.json', '.tff']
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'react-router': 'ReactRouter',
		'zepto': '$'
	},
	plugins: [
		new extractTextWebpackPlugin('css/[name].css'),
		new htmlWebpackPlugin({
			filename:'/index.html',
			template: './apps/'+itemName+'/index_template.html',
			hash: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.OccurenceOrderPlugin()
	]
}