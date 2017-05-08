var express = require("express");
var path = require("path");
var port = process.env.PORT || 8888;
var app = express();

//实现webpack热更新
var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./webpack.config.js');

var compiler = webpack(webpackDevConfig);

// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {

    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));

//定义ajax数据接口
if(false){
   var interface = require("./server/interface-local");
   interface.init(app);
}else{
   var interface = require("./server/interface-server");
   interface.init(app);
}
//访问url地址
var itemName = process.env.ITEM_NAME || "";
var testId = null;
if(itemName=="hotel"){
    testId = "102000044"
}
app.listen(port,function(){
    console.log("localhost:8888/"+itemName,"testId="+testId);
});

app.use("/", express.static(path.join(__dirname, "./apps"))); 
app.get("/hotel", function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, "./apps/hotel") })
});

app.get("/hotel/v3", function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, "./apps/hotel3") })
});

//酒店
// app.get("/hotel/v3",function(req,res){
//     res.sendFile('index.html',{root:path.join(__dirname,"./hotel3")})
// });

//火车票
app.get("/train",function(req,res){
    res.sendFile('index.html',{root:path.join(__dirname,"./apps/train")})
});

//飞机票
app.get("/plane",function(req,res){
    res.sendFile('index.html',{root:path.join(__dirname,"./apps/plane")})
});

//我的
app.get("/wode",function(req,res){
    res.sendFile('index.html',{root:path.join(__dirname,"./apps/wode")})
});

//v2
//火车票
app.get("/train/v3",function(req,res){
    res.sendFile('index.html',{root:path.join(__dirname,"./apps/train2")})
});

//飞机票儿童票
app.get("/plane/v3",function(req,res){
    res.sendFile('index.html',{root:path.join(__dirname,"./apps/plane3")})
});
console.log("ok");
