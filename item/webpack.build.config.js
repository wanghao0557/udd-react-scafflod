var webpack = require("webpack");
var path = require("path");
var extractTextWebpackPlugin = require("extract-text-webpack-plugin");
var htmlWebpackPlugin = require("html-webpack-plugin");
var WebpackMd5Hash = require('webpack-md5-hash');

var itemName = process.env.ITEM_NAME || "";
// 正式环境改为 
var itemPath ="/uddtriph5";
// 测试环境
// var itemPath ="";

module.exports = {
	entry:{
		index:"./apps/"+itemName+"/index.jsx"
	},
	output:{
		path: __dirname + "/dist/native-h5/"+itemName+"/",
        publicPath:itemPath+"/"+itemName+"/",
        filename:'js/[name].js'
	},
    devtool: false,
	module: {
         loaders: [ 
             { test: /\.(js|jsx)$/, loader: 'babel' },
             { test: /\.(css|scss)$/, loader:extractTextWebpackPlugin.extract("style", "css!sass") },
             {test: /\.less$/, loader: 'style!css!less'},
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
        'react-dom': "ReactDOM",
        'react-router': 'ReactRouter'
    },
     plugins:[
         new extractTextWebpackPlugin("css/[name].css"),
         new htmlWebpackPlugin({
             filename:'/index.html',    //生成的html存放路径，相对于 path
             template:'./apps/'+itemName+'/template.html',    //html模板路径
             hash: true
         }),
         new WebpackMd5Hash()

     ] 
}