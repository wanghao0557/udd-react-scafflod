function Interface(){
    this.app=null;
}
Interface.prototype.init=function(app){
	this.app=app;
	//获取req.body值
	var bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));


    //定义酒店模块接口
    this.hotel();
}
Interface.prototype.hotel=function(){
	var hotel = require("./data/hotel");
	this.app.post("/hotel/room", function(req, res) {
         var data=hotel.room(req.body.id);
         res.contentType('json');
         res.send(data);
    })
    this.app.post("/hotel/detail", function(req, res) {
         var data=hotel.detail(req.body.id);
         res.contentType('json');
         res.send(data);
    })


    //获取酒店基本信息
    this.app.post("/gethotelbasisinfo", function(req, res) {
         var data=hotel.gethotelbasisinfo(req.body.id);
         res.contentType('json');
         res.send(data);
    });
    //获取房间信息
    this.app.post("/getapphotelroomtype", function(req, res) {
         console.log(req.body.startDate);
         console.log(req.body.endDate);
         console.log(req.body.hotelId);
         var data=hotel.getroomtype(req.body.id);
         res.contentType('json');
         res.send(data);
    });
    //获取获取酒店详情(设施)
    this.app.post("/gethotelfacinfo", function(req, res){
        var data=hotel.gethotelfacinfo(req.body.id);
        console.log(req.body.id)
        res.contentType('json');
        res.send(data);
    });
    //获取房间产品信息
    this.app.post("/gethotelproductinfo", function(req, res){
        var data=hotel.gethotelproductinfo();
        console.log(req.body.id)
        res.contentType('json');
        res.send(data);
    });
}
module.exports=new Interface();