// 预发布环境
// var module_name="/uddtriph5";


//添加酒店订单新增参数： addapphotelorder
        // obj.earliestArrivalTime=req.body.earliestArrivalTime;
        // obj.latestArrivalTime=req.body.latestArrivalTime;
        // obj.paymenttype=req.body.paymenttype;


var module_name="";
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
    //定义获取周边信息
    this.api();
    this.member();
    //定义飞机票模块接口
    this.plane();
    //定义火车票接口模块
    this.train();
    //我的订单详情接口
    this.corporatetravel();
}
Interface.prototype.hotel=function(){
    var _this=this;
    var item="hotel";
    var mod=require("./middleware");

    //v3
    //获取酒店基本信息
    this.app.post(module_name+"/gethotelbasisinfo", function(req, res) {
         var obj={};
         obj.hotelId=req.body.id;
         obj.userId=req.body.userId;
         var moddleware = new mod();
            //callback
         moddleware.callH=function(data){
            res.contentType('json');//返回的数据类型
            res.send(data);
            //res.send(data);
            console.log(data);
         }
         moddleware.post(obj,item,"/hotel/v2/gethotelbasisinfo",moddleware.callH);
    });
    //获取房间信息
    this.app.post(module_name+"/getapphotelroomtype", function(req, res) {
         var obj={};
         obj.startDate=req.body.startDate;
         obj.endDate=req.body.endDate;
         obj.hotelId=req.body.hotelId;
         var moddleware = new mod();
            //callback
         moddleware.callH=function(data){
            res.contentType('json');//返回的数据类型
            res.send(data);
            //res.send(data);
            console.log(data);
         }
         moddleware.post(obj,item,"/hotel/v2/getapphotelroomtype",moddleware.callH);
    });

    //获取获取酒店详情(设施)
    this.app.post(module_name+"/gethotelfacinfo", function(req, res){
        var obj={};
        obj.hotelId=req.body.id;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.post(obj, item, "/hotel/v2/gethotelfacinfo", moddleware.callH);
    });
    //获取房间产品信息
    this.app.post(module_name+"/gethotelproductinfo", function(req, res){
        var obj={};
        obj.productId=req.body.productId;
        obj.startDate=req.body.startDate;
        obj.endDate=req.body.endDate;
        obj.productType=req.body.productType;
        obj.elonghotelId=req.body.elonghotelId;
        obj.elonghotelCode=req.body.elonghotelCode;
        obj.elongroomTypeId=req.body.elongroomTypeId;
        obj.elongproductId=req.body.elongproductId;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.post(obj, item, "/hotel/v2/gethotelproductinfo", moddleware.callH);
    });

    //v4
    //获取酒店基本信息
    this.app.post(module_name+"/getelonghotelbasisinfo", function(req, res) {
         var obj={};
         obj.hotelId=req.body.id;
         obj.userId=req.body.userId;
         obj.resourceType=req.body.resourceType;
         var moddleware = new mod();
            //callback
         moddleware.callH=function(data){
            res.contentType('json');//返回的数据类型
            res.send(data);
            //res.send(data);
            console.log(data);
         }
         moddleware.post(obj,item,"/hotel/v2/getelonghotelbasisinfo",moddleware.callH);
    });
    //获取房间信息
    this.app.post(module_name+"/getelongapphotelroomtype", function(req, res) {
         var obj={};
         obj.startDate=req.body.startDate;
         obj.endDate=req.body.endDate;
         obj.hotelId=req.body.hotelId;
         obj.resourceType=req.body.resourceType;
         var moddleware = new mod();
            //callback
         moddleware.callH=function(data){
            res.contentType('json');//返回的数据类型
            res.send(data);
            //res.send(data);
            console.log(data);
         }
         moddleware.post(obj,item,"/hotel/v2/getelongapphotelroomtype",moddleware.callH);
    });

    //获取获取酒店详情(设施)
    this.app.post(module_name+"/getelonghotelfacinfo", function(req, res){
        var obj={};
        obj.hotelId=req.body.id;
        obj.resourceType=req.body.resourceType;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.post(obj, item, "/hotel/v2/getelonghotelfacinfo", moddleware.callH);
    });
    //获取房间产品信息
    this.app.post(module_name+"/getelonghotelproductinfo", function(req, res){
        var obj={};
        obj.productId=req.body.productId;
        obj.startDate=req.body.startDate;
        obj.endDate=req.body.endDate;
        obj.productType=req.body.productType;
        obj.elonghotelId=req.body.elonghotelId;
        obj.elonghotelCode=req.body.elonghotelCode;
        obj.elongroomTypeId=req.body.elongroomTypeId;
        obj.elongproductId=req.body.elongproductId;
        obj.elongroomId=req.body.elongroomId;
        obj.resourceType=req.body.resourceType;        
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.post(obj, item, "/hotel/v2/getelonghotelproductinfo", moddleware.callH);
    });

    //添加酒店订单
    this.app.post(module_name+"/addapphotelorder", function(req, res){
        var obj={};
        obj.productId=req.body.productId;
        obj.resourceId=req.body.resourceId;
        obj.hotelId=req.body.hotelId;
        obj.roomTypeId=req.body.roomTypeId;
        obj.userId=req.body.userId;
        obj.orderAmount=req.body.orderAmount;
        obj.payAmount=req.body.payAmount;
        obj.reserveNum=req.body.reserveNum;
        obj.liveName=req.body.liveName;
        obj.mobile=req.body.mobile;
        obj.checkInDate=req.body.checkInDate;
        obj.checkOutDate=req.body.checkOutDate;
        //obj.yaoqiu=req.body.yaoqiu;
        obj.email=req.body.email;
        obj.productName=req.body.productName;
        obj.hotelName=req.body.hotelName;
        obj.roomName=req.body.roomName;
        obj.uuid=req.body.uuid;
        obj.isCorporateTravel=req.body.isCorporateTravel;
        obj.orderResourceAmount=req.body.orderResourceAmount;
        obj.elonghotelId=req.body.elonghotelId;
        obj.elonghotelCode=req.body.elonghotelCode;
        obj.elongroomTypeId=req.body.elongroomTypeId;
        obj.elongproductId=req.body.elongproductId;

        //增加最晚到店时间
        obj.earliestArrivalTime=req.body.earliestArrivalTime;
        obj.latestArrivalTime=req.body.latestArrivalTime;
        obj.paymenttype=req.body.paymenttype;

        //增加发票
        obj.invoiceType=req.body.invoiceType;
        obj.invoiceTitle=req.body.invoiceTitle;
        obj.invoiceContent=req.body.invoiceContent;
        obj.invoiceMoney=req.body.invoiceMoney;
        obj.remark=req.body.remark;
        obj.applyUser=req.body.applyUser;
        obj.taxpayerNumber=req.body.taxpayerNumber;
        obj.registerAddress=req.body.registerAddress;
        obj.companyPhone=req.body.companyPhone;
        obj.openBank=req.body.openBank;
        obj.bankAccount=req.body.bankAccount;
        obj.invoiceEmail=req.body.invoiceEmail;
        obj.exprressTitle=req.body.exprressTitle;
        obj.expressAmount=req.body.expressAmount;
        obj.expressContactName=req.body.expressContactName;
        obj.expressMobile=req.body.expressMobile;
        obj.expressAddress=req.body.expressAddress;
        obj.invoiceCategory=req.body.invoiceCategory;
        obj.expressType=req.body.expressType;
        obj.isinvoices=req.body.isinvoices;
        obj.firstNightAmount=req.body.firstNightAmount;
        obj.isfirstNight=req.body.isfirstNight;
        obj.prices=req.body.prices;
        obj.elongroomId=req.body.elongroomId;
        obj.resourceType=req.body.resourceType;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.post(obj, item, "/hotel/v2/addapphotelorder", moddleware.callH);
    });

    //获取UUID
    this.app.post(module_name+"/getuuid", function(req, res){
        var obj={};
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.getuuid(obj, "hotel", "/base/v2/getuuid", moddleware.callH);
    });

    //验证酒店订单
    this.app.post(module_name+"/checkapphotelresouce", function(req, res){
        var obj={};
        obj.resourceId=req.body.resourceId;
        obj.checkInDate=req.body.checkInDate;
        obj.checkOutDate=req.body.checkOutDate;
        obj.reserveNum=req.body.reserveNum;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.post(obj, item, "/hotel/v2/checkapphotelresouce", moddleware.callH);
    });

    // 获取酒店订单详情
    this.app.post(module_name+"/gethotelorderdetail", function(req, res){
        var obj={};
        obj.orderId=req.body.orderId;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.post(obj, item, "/hotel/v2/gethotelorderdetail", moddleware.callH);
    });
}
Interface.prototype.api=function(){
    var _this=this;
    var item="api";
    var mod=require('./middleware');

    //获取周边的POI列表
    this.app.post(module_name+"/getaroundpoilist", function(req, res){
        var obj={};
        obj.type=req.body.type;
        obj.longitude=req.body.longitude;
        obj.latitude=req.body.latitude;
        obj.distance=req.body.distance;
        obj.number=req.body.number;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.post(obj, item, "/poi/v2/getaroundpoilist", moddleware.callH);
    });

    //根据条件搜索线路-参团
    this.app.post(module_name+"/gettour", function(req, res){
        var obj={};
        obj.keyword=req.body.keyword;
        obj.siteIds=req.body.siteIds;
        obj.tourType=req.body.tourType;
        obj.tourHoliday=req.body.tourHoliday;
        obj.startCityId=req.body.startCityId;
        obj.tourPlaies=req.body.tourPlaies;
        obj.tourSights=req.body.tourSights;
        obj.travelDaies=req.body.travelDaies;
        obj.travelDateRange=req.body.travelDateRange;
        obj.tourPriceRange=req.body.tourPriceRange;
        obj.sortField=req.body.sortField;
        obj.sortType=req.body.sortType;
        obj.page=req.body.page;
        obj.size=req.body.size;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.post1(obj, item, "/searchtour/v2/app/gettour", moddleware.callH);
    });

    // 获取产品评分选项名称,以及相关评论权限
    this.app.post(module_name+"/getcommentconfigbyproducttype", function(req, res){
        var obj={};
        obj.productTypeId=req.body.productTypeId;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.post(obj, item, "/comment/v2/getcommentconfigbyproducttype", moddleware.callH);
    });

    //获取产品评论的统计信息,评论总数,满意评论数,一般评论数,差评数以及各项指数
    this.app.post(module_name+'/getcommentbaseinfobyproductid',function(req,res){
        var obj={};
        obj.productId=req.body.productId;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.post(obj,item,"/comment/v2/getcommentbaseinfobyproductid",moddleware.callH);
    });
    
    //获取产品的评论列表
    this.app.post(module_name+"/getcommentlistbyproductid", function(req, res){
        var obj={};
        obj.productId=req.body.productId;
        obj.productTypeId=req.body.productTypeId;
        obj.commentType=req.body.commentType;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.post(obj, item, "/comment/v2/getcommentlistbyproductid", moddleware.callH);
    });
    
    //获取当地玩乐的玩乐类型
    this.app.post(module_name+"/getlastdictionary", function(req, res){
        var obj={};
        obj.dValue=req.body.dValue;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.post(obj, item, "/base/v2/getlastdictionary", moddleware.callH);
    });
}

//我的接口方法
Interface.prototype.member=function(){
    var _this=this;
    var item="member";
    var mod=require('./middleware');
    // 订单详细情页接口
    this.app.post(module_name+'/getapporderinfo',function(req,res){
        var obj = {};
        obj.orderId=req.body.orderId;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.post2(obj, item,"/member/v2/getapporderinfo",moddleware.callH)
    });

    // 删除订单接口
    this.app.post(module_name+'/deleteorder',function(req,res){
        var obj = {};
        obj.orderId=req.body.orderId;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.post2(obj, item,"/member/v2/deleteorder",moddleware.callH)
    });

    // 取消订单接口
    this.app.post(module_name+'/cancleorder',function(req,res){
        var obj = {};
        obj.userId=req.body.userId;
        obj.orderId=req.body.orderId;
        obj.orderType=req.body.orderType;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.post2(obj, item,"/member/v2/cancleorder",moddleware.callH)
    });
}

//飞机票接口方法
Interface.prototype.plane=function(){
    var _this=this;
    var item="plane";
    var mod=require('./middleware');
    // 获取价格飞机票价格日历
    this.app.post(module_name+'/getdailylowestprice',function(req,res){
        var obj = {};
        obj.deptCode=req.body.deptCode;
        obj.arrCode=req.body.arrCode;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.plane(obj, item,"/flight/v2/app/getdailylowestprice",moddleware.callH)
    });
    //获取飞机票退改签说明
    this.app.post(module_name+'/getrefundandchangeinstruction',function(req,res){
        var obj = {};
        obj.depCode=req.body.depCode;
        obj.arrCode=req.body.arrCode;
        obj.depDate=req.body.depDate;
        obj.airlineCode=req.body.airlineCode;
        obj.classCode=req.body.classCode;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.plane(obj, item,"/flight/v2/app/getrefundandchangeinstruction",moddleware.callH)
    });    
    //获取飞机保险信息
    this.app.post(module_name+'/getinsuranceproduct',function(req,res){
        var obj = {};
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.plane(obj, item,"/flight/v2/app/getinsuranceproduct",moddleware.callH)
    });
    //提交ID
    this.app.post(module_name+'/addorder',function(req,res){
        var obj = {};
        var flightlistArr=JSON.parse(req.body.flightlist).ticketInfo;
        obj.sourceType=req.body.sourceType;
        obj.linkName=req.body.linkName;
        obj.uuid=req.body.uuid;
        obj.adduser=req.body.adduser;
        obj.linkPhone=req.body.linkPhone;
        obj.sumOrderAmount=req.body.sumOrderAmount;
        obj.expresscharge=req.body.expresscharge;
        obj.isInsurance=req.body.isInsurance;
        obj.isInvoice=req.body.isInvoice;
        obj.invoiceType=req.body.invoiceType;
        obj.invoiceTitle=req.body.invoiceTitle;
        obj.distrAddress=req.body.distrAddress;
        obj.distrLinkName=req.body.distrLinkName;
        obj.distrLinkPhone=req.body.distrLinkPhone; 
        obj.insuranceProductList=req.body.insuranceProductList;
        obj.expressType=req.body.expressType;
        obj.invoiceContent=req.body.invoiceContent;
        obj.taxpayerNumber=req.body.taxpayerNumber;
        obj.registerAddress=req.body.registerAddress;
        obj.companyPhone=req.body.companyPhone;
        obj.openBank=req.body.openBank;
        obj.bankAccount=req.body.bankAccount;
        obj.flightlist=flightlistArr;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.plane(obj, item,"/flight/v2/app/addorder",moddleware.callH)
    });
    // 获取儿童票票价
    this.app.post(module_name+'/getchildpriceandpolicy',function(req,res){
        var obj = {};
            obj.depCode=req.body.depCode;
            obj.arrCode=req.body.arrCode;
            obj.depDate=req.body.depDate;
            obj.flightNo=req.body.flightNo;
            obj.seatCode=req.body.seatCode;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.plane(obj, item,"/flight/v2/app/getchildpriceandpolicy",moddleware.callH)
    });

    // 下单实时验价接口，仅限于成人运价验价
    this.app.post(module_name+'/checkpriceandstock',function(req,res){
        var obj = {};
            obj.depCode=req.body.depCode;
            obj.arrCode=req.body.arrCode;
            obj.depDate=req.body.depDate;
            obj.flightNo=req.body.flightNo;
            obj.seatCode=req.body.seatCode;
            obj.parPrice=req.body.parPrice;
            obj.settlePrice=req.body.settlePrice;
            obj.airportTax=req.body.airportTax;
            obj.fuelTax=req.body.fuelTax;
            console.log(obj);
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.plane(obj, item,"/flight/v2/app/checkpriceandstock",moddleware.callH)
    });
}

//火车票接口方法
Interface.prototype.train=function(){
    var _this=this;
    var item="train";
    var mod=require('./middleware');
    // 火车票创建订单
    this.app.post(module_name+'/appaddorder',function(req,res){
        var obj = {};
        obj.uuid=req.body.uuid;
        obj.form=req.body.form;
        obj.trainNumber=req.body.trainNumber;
        obj.fromStation=req.body.fromStation;
        obj.toStation=req.body.toStation;
        obj.fromStationCode=req.body.fromStationCode;
        obj.toStationCode=req.body.toStationCode;
        obj.trainDate=req.body.trainDate;
        obj.departureTime=req.body.departureTime;
        obj.arriveTime=req.body.arriveTime;
        obj.ticketNumber=req.body.ticketNumber;
        obj.banquetName=req.body.banquetName;
        obj.contactMobile=req.body.contactMobile;
        obj.contactName=req.body.contactName;
        obj.orderAmount=req.body.orderAmount;
        obj.expressAmount=req.body.expressAmount;
        obj.price=req.body.price;
        obj.adduser=req.body.adduser;
        obj.contactAddress=req.body.contactAddress;
        obj.subOrderVos=JSON.parse(req.body.subOrderVos);
        obj.loginUserName=req.body.loginUserName;
        obj.loginUserPassword=req.body.loginUserPassword;
        obj.isExpressCharge=req.body.isExpressCharge;
        obj.isInsurance=req.body.isInsurance;
        obj.insuranceAmount=req.body.insuranceAmount;
        obj.sourceType=req.body.sourceType;
        obj.sourceId=req.body.sourceId;
        obj.acceptStanding=req.body.acceptStanding;
        obj.expressContactMobile=req.body.expressContactMobile;
        obj.expressContactName=req.body.expressContactName;
        obj.product_id=req.body.product_id;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.train(obj, item,"/trainticket/v3/appaddorder",moddleware.callH)
    });
    //火车票经停站信息
    this.app.post(module_name+'/getapptraininfo',function(req,res){
        var obj = {};
        obj.train_code=req.body.train_code;
        obj.from_station=req.body.from_station;
        obj.to_station=req.body.to_station;
        obj.train_date=req.body.train_date;
        obj.train_no=req.body.train_no;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.train(obj, item,"/trainticket/v3/getapptraininfo",moddleware.callH)
    });
    //火车票订单详情信息
    this.app.post(module_name+'/gettrainorderinfo',function(req,res){
        var obj = {};
        obj.orderId=req.body.orderId;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.train(obj, item,"/trainticket/v3/gettrainorderinfo",moddleware.callH)
    });
    //火车票占座状态
    this.app.post(module_name+'/appgettrainticketseatstatus',function(req,res){
        var obj = {};
        obj.orderId=req.body.orderId;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.train(obj, item,"/trainticket/v3/appgettrainticketseatstatus",moddleware.callH)
    });
    //火车票获取保险列表
    this.app.post(module_name+'/gettraininsuranceinfo',function(req,res){
        var obj = {};
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.train(obj, item,"/trainticket/v3/gettraininsuranceinfo",moddleware.callH)
    });
}

Interface.prototype.corporatetravel=function(){
    var _this=this;
    var item="corporatetravel";
    var mod=require('./middleware');
     //订单详细情页接口
    this.app.post(module_name+'/getappcorpratetravelorderinfo',function(req,res){
        var obj = {};
        obj.orderId=req.body.orderId;
        obj.orderType=req.body.orderType;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.corporatetravel(obj, item,"/order/v2/getappcorpratetravelorderinfo",moddleware.callH)
    });
     //取消订单接口
    this.app.post(module_name+'/cancleappcorpratetravelorder',function(req,res){
        var obj = {};
        obj.orderId=req.body.orderId;
        obj.orderType=req.body.orderType;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.corporatetravel(obj, item,"/order/v2/cancleappcorpratetravelorder",moddleware.callH)
    });
    //删除订单接口
    this.app.post(module_name+'/deleteapporder',function(req,res){
        var obj = {};
        obj.orderId=req.body.orderId;
        obj.userId=req.body.userId;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.corporatetravel(obj, item,"/order/v2/deleteapporder",moddleware.callH)
    });

    //根据公司id获取公司发票配送信息
    this.app.post(module_name+'/getappdispatchbyuserid',function(req,res){
        var obj = {};
        obj.userId=req.body.userId;
        var moddleware=new mod();
        moddleware.callH=function(data){
            res.contentType('json');
            res.send(data);
        }
        moddleware.invoiceCompany(obj, item,"/v2/getappdispatchbyuserid",moddleware.callH)
    });
}
module.exports=new Interface();