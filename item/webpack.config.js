var webpack = require("webpack");
var path = require("path");
var extractTextWebpackPlugin = require("extract-text-webpack-plugin");
var htmlWebpackPlugin = require("html-webpack-plugin");
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var itemName = process.env.ITEM_NAME || "";
//var itemName="hotel";
console.log(itemName);
console.log(process.env.NODE_ENV);
var set = {
    outputPath: __dirname + '/apps/' + itemName + '/',
    outputPublicPath: 'http://localhost:8888/',
    devtool: 'cheap-module-eval-source-map'
}
if (process.env.NODE_ENV=="build") {
    set.outputPath = __dirname + "/dist/native-h5/"+itemName+"/";
    set.outputPublicPath = "/"+itemName+"/";
    //set.outputPublicPath = "/";
    set.devtool = false;
}
console.log(set.outputPublicPath);
module.exports = {
    entry:{
        index:["./apps/"+itemName+"/index.jsx",hotMiddlewareScript]
    },
    output:{
        path: set.outputPath,
        publicPath:set.outputPublicPath,
        filename:'js/[name].js'
    },
    devtool: 'source-map',
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
             template:'./apps/'+itemName+'/index.html',    //html模板路径
             hash: true
         }),
         new webpack.optimize.OccurenceOrderPlugin(),
         new webpack.HotModuleReplacementPlugin(),
         new webpack.NoErrorsPlugin()
         
     ] 
}