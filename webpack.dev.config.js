var webpack = require("webpack");
var path = require("path");
var extractTextWebpackPlugin = require("extract-text-webpack-plugin");
var htmlWebpackPlugin = require("html-webpack-plugin");
var hotMiddlewareScript = "webpack-hot-middleware/client?reload=true";

var itemName = process.env.ITEM_NAME || "";

var set = {
	outputPath: __dirname + '/app/' + itemName + '/',
	outputPublicPath: 'http://localhost:8000/',
	devtool: 'cheap-module-eval-source-map'
}

if (process.env.NODE_ENV == "build") {
	set.outputPath = __dirname + "dist/native-h5/"+itemName+"/";
	set.outputPublicPath = "/" + itemName + "/";
	set.devtool = false;
}

module.exports = {
	entry: {
		index: ["./apps/"+itemName+"index.jsx", hotMiddlewareScript]
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
			{ test: /\.(css|scss)$/, loader: extractTextWebpackPlugin.extract("style", "css!sass") },
			{ test: /\.(png|gif|jpe?g)$/, loader: "url-loader?limit=5120&name=img/[name].[hash:8].[ext]" },
			{ test: /\.(eot|ttf|woff2?)$/, loader: "url-loader?limit=5120&name=fonts/[name].[hash:8].[ext]" },
			{ test: /\.svg$/, loader: "file-loader?name=svg/[name].[hash:8].[ext]" }
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.css', '.scss', '.json', '.ttf']
	}
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'react-router': 'ReactRouter' 
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: "/index.html",
			template: './apps/' + itemName + '/index.html',
			hash: true
		}),
		new extractTextWebpackPlugin("css/[name].css")
	]
}