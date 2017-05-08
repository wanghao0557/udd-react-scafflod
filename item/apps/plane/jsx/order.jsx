import React from 'react'
import {Link} from 'react-router'
import uddh5 from '../../common/js/common.js'
import Alert from '../../common/ui/alert/alert.jsx'
import BaiduMobStat from '../../common/js/mobstat.js'
require('../../common/ui/alert/alert.scss')
// import Debug from '../../common/ui/debug/debug.jsx'
// require('../../common/ui/debug/debug.scss')
var PlaneOrder = React.createClass({
	getInitialState:function(){
		return{
			uuid:"",
			flage:true,
			baoxiao:false,
			priceDetail:false,
			userInfo:[],
			tel:'',
			messageShow:false,
			uuid:'',
			flightlist:[],
			isPublic:null,
			disabled:false,
			insuranceProductList:[],
			invoiceId:null,
			expressId:null,
			price:null,
			loading:false,
			kuaidifei:15,
			userName:'',
			invoiceType:'',
			invoiceTitle:'',
			distrAddress:'',
			distrLinkName:'',
			distrLinkPhone:'',
			ticketNum:0,
			// 新增state  判断是否此航班是否可定儿童票
			childTicket:false,
			// 儿童数组 儿童人数（可预订儿童票的前提下）
 			childInfo:[],
 			// 购买优惠票的儿童人数
 			privilegeChildInfo:[],
 			// 计算后成人票机票单价  初始化为0
 			ticekPrice:0,
 			adultPriceGo:0,
 			adultPriceBack:0,
 			goChildPrice:{},
 			backChildPrice:{},
 			// 计算后儿童票总价
 			childPriceGo:0,
 			childPriceBack:0
		}
	},
	componentWillMount: function(){
		$.post(uddh5.apihost+'/getuuid', function(data){
			this.setState({
				uuid: data.data
			});
		}.bind(this));
		BaiduMobStat.onPageStart('Order-Fill');
    },
     componentWillUnmount: function(){
        BaiduMobStat.onPageEnd('Order-Fill');
    },
	componentDidMount:function(){
		var isPublic = uddh5.getCookie('isPublic');
		this.setState({
			isPublic:isPublic
		})
		if(this.isMounted()){
			// 与App的交互
			var requestHybrid = {
				tagname: 'forward',
				topage: 'title',
				type:'native',
				item:'plane',
				param: {
					typeId: 'c10169',
					title: '订单填写'
				}
			}
			var native_callback=function(data){
				var goBack = JSON.parse(data)
				var ticketArr = [];
                //如果app不是最新版没传isStop and stopCity与后台约定isStop=-1，stopCity=''
                if(goBack.go.isStop == undefined){
                    goBack.go.isStop="-1";
                    goBack.go.stopCity="";
                }
                if(goBack.back.isStop == undefined){
                    goBack.back.isStop="-1";
                    goBack.back.stopCity="";
                }
				ticketArr.push(goBack.go)
		    // 如果没有预定返程票，app在返程票对象内返回flightRangetype=0，以此来判断是否订购返程票
				if(goBack.back.flightRangetype){
					ticketArr.push(goBack.back)
				}
				// 测试改动地方  购买的航班是否可定儿童票
				var ChildTicket = this.verifyChildTicketFn(ticketArr);
				// 设置机票单价
				this.ticekPrice(ticketArr);
				this.setState({
					flightlist:ticketArr,
					childTicket:ChildTicket,
					ticketNum:ticketArr.length
				},function(){this.allPriceFn()});
			}.bind(this)
			uddh5.bridge(native_callback,requestHybrid)
		}
	// 	var goBack = {
	// 	    "go":{
	// 	        "policyId": "181190408",
	//             "airCompany": "吉祥航空2",
	//             "flightNo": "KN5977",
	//             "depCode": "PVG",
	//             "arrCode": "NAY",
	//             "arrTime": "1120",
	//             "depDate": "2017-03-27",
	//             "depTime": "0900",
	//             "planeModel": "73U",
	//             "seatClass": "Y",
	//             "flightRangetype": 1,
	//             "parPrice": "50",
	//             "fuelTax": "0",
	//             "airportTax": "50",
	//             "ticketCost":"800",
	//             "seatMsg": "经济舱",
	//             "airlineCode": "GJ",
	//             "todate": "2016-11-20 11:20:00",
	//             "fromtower": "T1",
	//             "totower": "--",
	//             "fromAirport":"上海",
	//             "toAirport":"北京",
	//             "isStop": "0",//1=是（有）经停，0=不经停
	//             "stopCity": '南京'
	// 	    },
	// 	    "back":{
	// 	        "policyId": "181190408",
	//             "airCompany": "吉祥航空2",
	//             "flightNo": "KN5977",
	//             "depCode": "PVG",
	//             "arrCode": "NAY",
	//             "arrTime": "1120",
	//             "depDate": "2017-03-28",
	//             "depTime": "0944",
	//             "planeModel": "73U",
	//             "seatClass": "Y",
	//             "flightRangetype": 2,
	//             "parPrice": "50",
	//             "fuelTax": "50",
	//             "airportTax": "0",
	//             "ticketCost":"800",
	//             "seatMsg": "头等",
	//             "airlineCode": "CA",
	//             "todate": "2016-11-18 11:20:00",
	//             "fromtower": "T1",
	//             "totower": "--",
	//             "fromAirport":"上海",
	//             "toAirport":"北京",
	//             "isStop": "1",//1=是（有）经停，0=不经停
	//             "stopCity": '南京'
	// 	    }
	// 	}
 //        if(goBack.go.isStop == undefined){
 //        	goBack.go.isStop="-1";
 //        	goBack.go.stopCity="";
 //        }
 //        if(goBack.back.isStop == undefined){
 //        	goBack.back.isStop="-1";
 //        	goBack.back.stopCity="";
 //        }
	// 	var ticketArr = [];
	// 	ticketArr.push(goBack.go)
	// 	if(goBack.back.flightRangetype){
	// 		ticketArr.push(goBack.back)
	// 	}
	// 	// 测试改动地方  购买的航班是否可定儿童票
	// 	var ChildTicket = this.verifyChildTicketFn(ticketArr);
	// 	// 设置机票单价
	// 	this.ticekPrice(ticketArr);
	// 	this.setState({
	// 		flightlist:ticketArr,
	// 		isPublic:isPublic,
	// 		childTicket:ChildTicket,
	// 		ticketNum:ticketArr.length
	// 	})
	},
	// 验证是否可以订购儿童票方法
	verifyChildTicketFn:function(arr){
		var num = 1;
		var childTicket = false;
		// 是否是往返程
		var ticketNumb = arr.length;
		$.map(arr,function(elem,index){
			if(elem.seatClass=="Y"||elem.seatClass=="C"||elem.seatClass=="F"){
				num+=1;
			}else if(elem.airlineCode=="CA"&&elem.seatClass=="P"){
				num+=1;
			}else if(elem.airlineCode=="GJ"&&elem.seatClass=="R"){
				num+=1;
			}else if(elem.airlineCode=="MF"&&(elem.seatClass=="H"||elem.seatClass=="B"||elem.seatClass=="M"||elem.seatClass=="L"||elem.seatClass=="K"||elem.seatClass=="N"||elem.seatClass=="Q"||elem.seatClass=="V")){
				num+=1;
			}
		});

		if(ticketNumb==1&&num==2){
			childTicket=true;
		}else if(ticketNumb==2&&num==3){
			childTicket=true;
		};

		return childTicket;
	},
	// 计算每单机票的成人票价格
	ticekPrice:function(arr){
		var that = this;
		var ticekPrice = 0;
		$.map(arr,function(elem,index){
			var allPrice = elem.parPrice*1+elem.fuelTax*1+elem.airportTax*1;
			ticekPrice+=allPrice;
			if(index==0){
				that.setState({
					adultPriceGo:allPrice
				})
			}else{
				that.setState({
					adultPriceBack:allPrice
				})
			}
		})
		this.setState({
			ticekPrice:ticekPrice
		})
	},
	// 将乘客信息中的ID删除
	deleteId:function(arr){
		// 将乘客信息中的ID删除
		var newArr = arr.concat([]);
		var newUserInfo = $.map(newArr,function(elem,index){
				return(
						{touristname:elem.touristname,touristmobile:elem.touristmobile,cardtype:elem.cardtype,cardno:elem.cardno,birthday:elem.birthday}
					)
		});
		return newUserInfo;
	},
	// 将儿童票价格信息重写
	childTicketPriceObj:function(obj){
		var newObj = {};
		if(obj.childTicketPrice){
			newObj.parPrice = obj.childTicketPrice;
			newObj.ticketCost = obj.childTicketCost;
			newObj.airportTax = obj.childAirportTax;
			newObj.fuelTax = obj.childFuelTax;
		}
		return newObj;
	},
	// 将用户信息及用户地址传入cookie
	localStorageFn:function(){
		localStorage.setItem("passengerInfo",JSON.stringify({val: this.state.userInfo}));
	// 电话号码存储
		localStorage.setItem("flightMobile",JSON.stringify({val: this.state.tel}));	
	// 用户姓名存储
		localStorage.setItem("flightUserName",JSON.stringify({val: this.state.userName}));
	},
	// 添加地址配送ID
	addressFn:function(obj){
		this.setState({
			expressId:obj.addressId,
			distrAddress:obj.address,
			distrLinkName:obj.name,
			distrLinkPhone:obj.mobile
		})
	},
	// 发票抬头
	taitouFn:function(obj){
		this.setState({
			invoiceId:obj.id,
			invoiceTitle:obj.invoiceTitle
		})
	},
	// 输入手机号码
	telFn:function(str){
		this.setState({
			tel:str
		})
	},
	// 输入用户姓名
	userNameFn:function(str){
		this.setState({
			userName:str
		})
	},
	// 乘客信息添加
	userInfoFn:function(arr){
		var that = this;
		this.setState({
			userInfo:arr
		},function(){this.allPriceFn()})
	},
	// 儿童信息
	childInfoFn:function(arr){
		this.setState({
			childInfo:arr
		})
	},
	// 选择优惠票价的儿童信息
	privilegeChildInfoFn:function(arr){
		this.setState({
			privilegeChildInfo:arr
		},function(){this.allPriceFn()})
	},
	// 数组去重
	deleteRepArr:function(arr1,arr2){
		var newarr1 = arr1.concat([])
		var newarr2 = arr2.concat([])
		for (var i = newarr1.length - 1; i >= 0; i--) {
		    var a = newarr1[i];
		    for (var j = newarr2.length - 1; j >= 0; j--) {
		        var b = newarr2[j];
		        if (a.id == b.id) {
		            newarr1.splice(i, 1);
		            newarr2.splice(j, 1);
		            break;
		        }
		    }
		}
		return newarr1;
	},
	// 儿童票价格信息
	childTicketPriceFn:function(obj,flightRangetype){
			var childTicketPrice = obj.childTicketPrice*1+obj.childAirportTax*1+obj.childFuelTax*1;
			if(flightRangetype=="goChildPrice"){
				this.setState({
					[flightRangetype]:obj,
					childPriceGo:childTicketPrice
				},function(){this.allPriceFn()})
			}else{
				this.setState({
					[flightRangetype]:obj,
					childPriceBack:childTicketPrice
				},function(){this.allPriceFn()})
			}
	},
	// 初始状态 保险全部选中
	insuranceFn:function(obj){
		var insuranceProductList = this.state.insuranceProductList;
		insuranceProductList.push(obj);
		this.setState({
				insuranceProductList:insuranceProductList
		});
	},
	// 拼接保险
	insuranceProductListFn:function(obj){
		var insuranceProductList = this.state.insuranceProductList;
        var idx = -1;
        $.map(insuranceProductList,function(elem,index){
        	if(elem.productId==obj.productId){
        		idx=index
        	}
        }.bind(this))
        if(idx!=-1){
        	insuranceProductList.splice(idx,1)
        	this.setState({
        		insuranceProductList:insuranceProductList
        	},function(){this.allPriceFn()})
        }else{
        	insuranceProductList.push(obj)
        	this.setState({
        		insuranceProductList:insuranceProductList
        	},function(){this.allPriceFn()})
        }
	},
	// 将保险ID拼接成字符串
	insuranceProductIdStrFn:function(){
		var insuranceProductIdArr = [];
		var insuranceProductIdStr = '';
		if(this.state.insuranceProductList.length>0){
			$.map(this.state.insuranceProductList,function(elem,index){
				insuranceProductIdArr.push(elem.productId)
			}.bind(this))
			insuranceProductIdStr=insuranceProductIdArr.toString()
		}
		return insuranceProductIdStr
	},
	// 订单总额
	allPriceFn:function(){
		var that = this;
		var insuranceProductList = that.state.insuranceProductList;
		var userNum = that.state.userInfo.length;
		var flightlist = that.state.flightlist;
		var baoxiao = that.state.baoxiao;
		var ticekPrice = that.state.ticekPrice;
		// 儿童
		var childInfo = this.state.childInfo;
		var privilegeChildInfo = this.state.privilegeChildInfo;
		var allPrice = 0;
		// 保险总价
		$.map(insuranceProductList,function(elem,index){
			allPrice+=elem.highestPrice*userNum*flightlist.length;
		})
		// 机票总价 = 机票单价*人数
		if(this.state.childTicket&&(flightlist.length==1)&&this.state.childPriceGo){
			allPrice+=(userNum-childInfo.length+privilegeChildInfo.length)*ticekPrice+(childInfo.length-privilegeChildInfo.length)*this.state.childPriceGo
		}else if(this.state.childTicket&&(flightlist.length==2)&&this.state.childPriceGo&&this.state.childPriceBack){
			allPrice+=(userNum-childInfo.length+privilegeChildInfo.length)*ticekPrice+(childInfo.length-privilegeChildInfo.length)*(this.state.childPriceGo+this.state.childPriceBack)
		}else{
			allPrice+=ticekPrice*userNum;
		}
		// 是否需要保险凭证（快递费）
		if(baoxiao){
			allPrice+=that.state.kuaidifei
		}
		that.setState({
			price:allPrice
		})
	},
	baoXiaoFn:function(){
		this.setState({
			baoxiao:!this.state.baoxiao
		},function(){this.allPriceFn()})
	},
	priceDetailShowFn:function(){
		this.setState({
			priceDetail:true
		})
	},
	priceDetailHideFn:function(){
		this.setState({
			priceDetail:false
		})
	},
	closeAlert: function(){
	    this.setState({
	      messageShow: false
	    });
	},
	openAlert: function(text, duration){
	    var that = this;
	    var duration= duration == undefined? 2000 : duration;
	    this.setState({
	      messageShow: true,
	      textMessage: text
	    });
	    setTimeout(function() {
	      that.closeAlert();
	    }, duration);
	},
	//订单提交成功去支付
	togglePayNative: function(id){
	  //与app的交互支付
	  var requestHybrid={
	    tagname: 'forward',
	    topage:'order',
	    type:"native",
	    item:"plane",
	    param: {
	      typeId: "10119",
	      orderId: id+""
	    }
	  }
	  var native_callback=function(data){
	  }
	  uddh5.bridge(native_callback,requestHybrid);
	},
	// 表单提交
	handleSubmit:function(e){
		e.preventDefault();
		this.priceDetailHideFn();
		if(this.state.userInfo.length<1){
			this.openAlert("请添加乘客");
			return
		}
		if(!this.state.userName){
			this.openAlert("请填写联系人姓名");
			return
		}else if(!(/^[a-zA-Z\u4e00-\u9fa5\s]+$/g).test($.trim(this.state.userName))){
			this.openAlert('请输入中文姓名或英文姓名,不能包含数字、特殊字符')
			return
		}
		if(!this.state.tel){
			this.openAlert("请填写手机号码");
			return
		}else if(!((/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/).test($.trim(this.state.tel)))){
			this.openAlert("手机号不合法");
			return
		}
		if(this.state.baoxiao&&!this.state.invoiceTitle){
			this.openAlert("请填写报销抬头");
			return
		}
		if(this.state.baoxiao&&!this.state.distrAddress&&!this.state.distrLinkName&&!this.state.distrLinkPhone){
			this.openAlert("请填写配送地址");
			return
		}
		// 所有条件都通过以后做数据存储
		this.localStorageFn();
		// 得到乘客列表 机票列表 保险列表
		var userInfo = this.state.userInfo;
		var userNum = userInfo.length;
		var baoxiao = this.state.baoxiao;
		var flightlist = this.state.flightlist;
		var insuranceProductList = this.state.insuranceProductList;
		var kuaidifei = this.state.kuaidifei;
		var adultPriceGo = this.state.adultPriceGo;
		var adultPriceBack = this.state.adultPriceBack;
		var childPriceGo = this.state.childPriceGo;
		var childPriceBack = this.state.childPriceBack;
		var goChildPrice = this.state.goChildPrice;
		var backChildPrice = this.state.backChildPrice;
		var childInfo = this.state.childInfo;
		var privilegeChildInfo = this.state.privilegeChildInfo;
		// 获取购买儿童的儿童信息  购买成人票的乘客信息
		var buyChildTicketUser = this.deleteRepArr(childInfo,privilegeChildInfo);
		var buyAdultTicketUser = this.deleteRepArr(userInfo,buyChildTicketUser);
		// 去除乘客信息中的ID
		var buyChildTicketUser = this.deleteId(buyChildTicketUser)
		var buyAdultTicketUser = this.deleteId(buyChildTicketUser)
		var userInfo = this.deleteId(userInfo)
		// 执行insuranceProductIdStr函数，得到保险ID字符串
		var insuranceProductIdStr = this.insuranceProductIdStrFn();
		var insurancePrice = 0;
		// 得到用户选择的保险总价
		$.map(insuranceProductList,function(elem,index){
			insurancePrice += elem.highestPrice;
		});
		// 将乘客信息中的ID删除
		var newUserInfo =this.deleteId(userInfo);
		// 将用户信息添加进入去程车票信息中 计算单程车票的总价
		var newflightlist = [];
		if(flightlist.length>1){
			if(this.state.childTicket&&goChildPrice.childTicketPrice&&backChildPrice.childTicketPrice&&buyChildTicketUser.length!=0&&buyAdultTicketUser.length!=0){
				newflightlist[0]=$.extend({},flightlist[0]);
				newflightlist[1]=$.extend({},flightlist[0]);
				newflightlist[2]=$.extend({},flightlist[1]);
				newflightlist[3]=$.extend({},flightlist[1]);
				console.log("1")
				// 去程信息
				newflightlist[0].engerlist=buyAdultTicketUser;
				newflightlist[0].passengerType=0;
				newflightlist[0].orderAmount=adultPriceGo*buyAdultTicketUser.length+insurancePrice*buyAdultTicketUser.length;
				// 儿童票信息
				newflightlist[1].engerlist=buyChildTicketUser;
				newflightlist[1].passengerType=1;
				newflightlist[1] = $.extend({},newflightlist[1],this.childTicketPriceObj(goChildPrice));
				newflightlist[1].orderAmount=childPriceGo*buyChildTicketUser.length+insurancePrice*buyChildTicketUser.length;

				// 返程信息
				newflightlist[2].engerlist=buyAdultTicketUser;
				newflightlist[2].passengerType=0;
				newflightlist[2].orderAmount=adultPriceBack*buyAdultTicketUser.length+insurancePrice*buyAdultTicketUser.length;

				// 儿童票信息
				newflightlist[3].engerlist=buyChildTicketUser;
				newflightlist[3].passengerType=1;
				newflightlist[3] = $.extend({},newflightlist[3],this.childTicketPriceObj(backChildPrice));
				newflightlist[3].orderAmount=childPriceBack*buyChildTicketUser.length+insurancePrice*buyChildTicketUser.length;

			}else if(this.state.childTicket&&goChildPrice.childTicketPrice&&backChildPrice.childTicketPrice&&buyChildTicketUser.length!=0&&buyAdultTicketUser.length==0){
				newflightlist[0]=$.extend({},flightlist[0]);
				newflightlist[1]=$.extend({},flightlist[1]);
				console.log("2")
				// 去程信息
				newflightlist[0].engerlist=buyChildTicketUser;
				newflightlist[0].passengerType=1;
				newflightlist[0] = $.extend({},newflightlist[0],this.childTicketPriceObj(goChildPrice));
				newflightlist[0].orderAmount=childPriceGo*buyChildTicketUser.length+insurancePrice*buyChildTicketUser.length;
				//返程信息
				newflightlist[1].engerlist=buyChildTicketUser;
				newflightlist[1].passengerType=1;
				newflightlist[1] = $.extend({},newflightlist[1],this.childTicketPriceObj(backChildPrice));
				newflightlist[1].orderAmount=childPriceBack*buyChildTicketUser.length+insurancePrice*buyChildTicketUser.length;
			}else{
				newflightlist[0]=$.extend({},flightlist[0]);
				newflightlist[1]=$.extend({},flightlist[1]);
				// 去程信息
				newflightlist[0].engerlist=userInfo;
				newflightlist[0].passengerType=0;
				newflightlist[0].orderAmount=adultPriceGo*userInfo.length+insurancePrice*userNum;
				// 返程信息
				newflightlist[1].engerlist=userInfo;
				newflightlist[1].passengerType=0;
				newflightlist[1].orderAmount=adultPriceBack*userInfo.length+insurancePrice*userNum;
			}

		}else{
			if(this.state.childTicket&&goChildPrice.childTicketPrice&&buyChildTicketUser.length!=0&&buyAdultTicketUser.length!=0){

				newflightlist[0]=$.extend({},flightlist[0]);
				newflightlist[1]=$.extend({},flightlist[0]);
				newflightlist[0].engerlist=buyAdultTicketUser;
				newflightlist[0].passengerType=0;
				newflightlist[0].orderAmount=adultPriceGo*buyAdultTicketUser.length+insurancePrice*buyAdultTicketUser.length+(baoxiao?kuaidifei:0);
				// 儿童票信息
				newflightlist[1].engerlist=buyChildTicketUser;
				newflightlist[1].passengerType=1;
				newflightlist[1] = $.extend({},newflightlist[1],this.childTicketPriceObj(goChildPrice));
				newflightlist[1].orderAmount=childPriceGo*buyChildTicketUser.length+insurancePrice*buyChildTicketUser.length+(baoxiao?kuaidifei:0);

			}else if(this.state.childTicket&&goChildPrice.childTicketPrice&&buyChildTicketUser.length!=0&&buyAdultTicketUser.length==0){
				// 儿童票信息
				newflightlist[0]=$.extend({},flightlist[0]);
				newflightlist[0]=flightlist[0];
				newflightlist[0].engerlist=buyChildTicketUser;
				newflightlist[0].passengerType=1;
				newflightlist[0] = $.extend({},newflightlist[0],this.childTicketPriceObj(goChildPrice));
				newflightlist[0].orderAmount=childPriceGo*buyChildTicketUser.length+insurancePrice*buyChildTicketUser.length+(baoxiao?kuaidifei:0);
			}else{
				newflightlist[0]=$.extend({},flightlist[0]);
				newflightlist[0].engerlist=userInfo;
				newflightlist[0].passengerType=0;
				newflightlist[0].orderAmount=adultPriceGo*userInfo.length+insurancePrice*userNum+(baoxiao?kuaidifei:0);
			}
		}
		console.log("0000000000000")
		console.log(newflightlist)
		// if(flightlist.length>1){
		// 	$.map(flightlist,function(elem,index){
					// elem.ticketNumber = userNum;
					// elem.engerlist = newUserInfo;
					// if(index==1){
					// 	elem.orderAmount = elem.parPrice*userNum+elem.fuelTax*userNum+elem.airportTax*userNum+insurancePrice*userNum+(baoxiao?kuaidifei:0);
					// }else{
					// 	elem.orderAmount = elem.parPrice*userNum+elem.fuelTax*userNum+elem.airportTax*userNum+insurancePrice*userNum;
					// }
		// 	});
		// }else{
		// 	flightlist[0].engerlist = newUserInfo;
		// 	flightlist[0].ticketNumber = userNum;
		// 	flightlist[0].orderAmount=this.state.price;
		// }
		// 将数租添加到 一个对象中  然后json转义  (解决json数租没法发送ajax问题)
		var ticketInfoObj = {ticketInfo:newflightlist}
		var ticketInfoStr = JSON.stringify(ticketInfoObj)
		var form = {sourceType:this.state.isPublic==1?4:5,linkName:this.state.userName,uuid:this.state.uuid,adduser: uddh5.getCookie('userId'),linkPhone:this.state.tel,sumOrderAmount:this.state.price,expresscharge:baoxiao?kuaidifei:0,invoiceType:1,isInvoice:baoxiao?1:0,distrAddress:baoxiao?this.state.distrAddress:"",distrLinkName:baoxiao?this.state.distrLinkName:"",distrLinkPhone:baoxiao?this.state.distrLinkPhone:"",invoiceTitle:baoxiao?this.state.invoiceTitle:"",isInsurance:(insuranceProductList.length>0)?1:0,insuranceProductList:insuranceProductIdStr,flightlist:ticketInfoStr}
		this.setState({
			disabled:true,
			loading:true
		});
		// $.post(uddh5.apihost+"/addorder",form,function(data){
		// 	this.setState({
		// 		loading:false
		// 	})
		// 	if(data.code==1){
		// 		var orderId = data.data
		// 		this.togglePayNative(orderId)
		// 	}else if(data.code==206){
		// 		this.openAlert("订单提交重复，请到我的订单中进行支付");
		// 	}else{
		// 		this.openAlert("订单提交失败，请重新选择产品下单");
		// 	}
		// }.bind(this))
	},
	render:function(){
		var loading=require('../img/loading.gif');
		// console.log(5555555555555)
		// console.log(this.state.childInfo)
		// console.log(this.state.privilegeChildInfo)
		// console.log(2222222222)
		// console.log(this.state.goChildPrice)
		// console.log(this.state.backChildPrice)
		return (
				<div className="order">
					<form action="" onSubmit={this.handleSubmit}>
						<GoAirTicket flightlist={this.state.flightlist} localStorageFn={this.localStorageFn}/>
						<Linkman allPriceFn={this.allPriceFn} userInfo={this.state.userInfo} userInfoFn={this.userInfoFn} telFn={this.telFn} tel={this.state.tel} userNameFn={this.userNameFn} userName={this.state.userName} childTicket={this.state.childTicket} childInfoFn={this.childInfoFn} privilegeChildInfoFn={this.privilegeChildInfoFn} flightlist={this.state.flightlist} childTicketPriceFn={this.childTicketPriceFn} adultPriceGo={this.state.adultPriceGo} adultPriceBack={this.state.adultPriceBack} childPriceGo={this.state.childPriceGo} childPriceBack={this.state.childPriceBack} ticketNum={this.state.ticketNum}/>
						{this.state.isPublic==1?<BaoXiao isPublic={this.state.isPublic} baoxiao={this.state.baoxiao} baoXiaoFn={this.baoXiaoFn} taitouFn={this.taitouFn} addressFn={this.addressFn} kuaidifei={this.state.kuaidifei}/>:""}
						<Insurance allPriceFn={this.allPriceFn} userInfo={this.state.userInfo} insuranceProductListFn={this.insuranceProductListFn} insuranceFn={this.insuranceFn} flightlist={this.state.flightlist}/>
						{this.state.isPublic==0?<InvoiceInfo/>:""}
						<ToPay price={this.state.price} disabled={this.state.disabled} priceDetailShowFn={this.priceDetailShowFn} priceDetail={this.state.priceDetail} childTicket={this.state.childTicket}/>
						<PriceDetail priceDetail={this.state.priceDetail} priceDetailHideFn={this.priceDetailHideFn} flightlist={this.state.flightlist} userInfo={this.state.userInfo} insuranceProductList={this.state.insuranceProductList} baoxiao={this.state.baoxiao} kuaidifei={this.state.kuaidifei} goChildPrice={this.state.goChildPrice} backChildPrice={this.state.backChildPrice} childPriceGo={this.state.childPriceGo} childPriceBack={this.state.childPriceBack} childTicket={this.state.childTicket} childInfo={this.state.childInfo} privilegeChildInfo={this.state.privilegeChildInfo}/>
						{this.state.messageShow? <Alert textMessage={this.state.textMessage}/> : ''}
						<div className={"send-loading"+((this.state.loading)?" "+"cur":"")}><div className="loading-inner"><img src={loading} /><span>数据提交中！</span></div></div>
					</form>
					{(this.state.placeholder)?<div className="placeholder" style={{height:this.state.height}}></div>:''}
				</div>
			)
	}
})
// 机票详情
var GoAirTicket = React.createClass({
	timeStr:function(str){
	    var hour=str.substring(0, 2);
      	var minute = str.substring(2, 4);
      	var newTimeStr = hour+":"+minute;
      	return newTimeStr
	},
	TimeFn:function(date,time){
	  	var dataArr = date.split("-"),
	  	timeArr = time.split(":"),
	  	year = parseInt(dataArr[0]),
	  	month = parseInt(dataArr[1]),
	  	date = parseInt(dataArr[2]),
	  	hour = parseInt(timeArr[0]),
	  	mount = parseInt(timeArr[1]),
	  	nowtime = new Date(year,month,date,hour,mount);
	  	return nowtime.getTime()
  	},
  	timeDiff:function(start,end){
	  	var timeDif = (end-start)/(1000*3600),
	  	hour = parseInt(timeDif),
	  	yushu = timeDif-hour,
	  	minute = Math.round(yushu*60)
	  	return (hour+"时"+minute+"分")
  	},
  	// 获取到达日期
  	arrDate:function(str){
  		var timeStr = $.trim(str)
  		var index = timeStr.indexOf(" ");
  		var arrDate = timeStr.substring(0,index)
  		return arrDate
  	},
  	localStorageFn:function(){
  		this.props.localStorageFn();
  	},
	render:function(){
		var plane=require('../img/plane.png');
		return(
				<div className="air_ticket">
					{
						$.map(this.props.flightlist,function(elem,index){
							var depDate = elem.depDate;
							var depDateArr = depDate.split("-");
      						var timestr = parseInt(depDateArr[0])+"年"+parseInt(depDateArr[1])+"月"+parseInt(depDateArr[2])+"日";
      						var depTime = this.timeStr(elem.depTime);
      						var arrTime = this.timeStr(elem.arrTime);
      						var start = this.TimeFn(elem.depDate,depTime);
      						var end = this.TimeFn(this.arrDate(elem.todate),arrTime);
							return(
									<div className="ticket_info">
										<div className="station">
											<div className="train_number">
												<span className="goback_tip">{index==0?"去程":"返程"}</span>
												<span className="time">{timestr}</span>
												<span className="num">{elem.flightNo}</span>
											</div>
											<div className="train_station clearfix">
												<div className="station_info pull-left">
													<span className="station_name">{elem.fromAirport+((elem.fromtower=="--")?'':" "+elem.fromtower)}</span>
													<span className="time">{depTime}</span>
												</div>
												<div className="mid">
													<span className="all_time">{this.timeDiff(start,end)}</span>
													<span className="arrows">
														<img src={plane} alt=""/>
														<span className={parseInt(elem.isStop) === 1? "station cur" : "station"}>经停</span>
													</span>
													<span className={parseInt(elem.isStop) === 1? "station_city cur" : "station_city"}>{elem.stopCity}</span>
												</div>
												<div className="station_info pull-right">
													<span className="station_name">{elem.toAirport+((elem.totower=="--")?'':" "+elem.totower)}</span>
													<span className="time">{arrTime}</span>
												</div>
											</div>
										</div>
										<div className="seat">
											<div className="seat_detail clearfix">
												<span className="ticket pull-left">{elem.seatMsg}</span>
												<span className="price pull-right"><em>￥</em>{elem.parPrice*1+elem.airportTax*1+elem.fuelTax*1}</span>
											</div>
											<div className="price_detail">
												<span>机票价￥{elem.parPrice}</span>
												<span>民航基金￥{elem.airportTax}</span>
												<span>燃油￥{elem.fuelTax}</span>
											</div>
										</div>
										<div className="back_change">
											<Link onClick={this.localStorageFn} to={{ pathname: '/explain',query:{depCode:elem.depCode,arrCode:elem.arrCode,depDate:elem.depDate,airlineCode:elem.airlineCode,classCode:elem.seatClass}}}>
												查看退改签说明详细
												<i className="iconfont icon-youyou"></i>
											</Link>
										</div>
									</div>
								)
						}.bind(this))
					}
				</div>
			)
	}
});

// 联系人
var Linkman =React.createClass({
	getInitialState:function(){
		return{
			childTip:true,
			childInfo:[],
			privilegeChildInfo:[],
			hasChild:false,
			flage:true
		}
	},
	componentDidMount:function(){
		if(localStorage.getItem("passengerInfo")){
			var userInfoString = localStorage.getItem("passengerInfo");
			var userInfoArr = JSON.parse(userInfoString).val;
			this.props.userInfoFn(userInfoArr);
			// 提取localStorage内乘客信息（判断是否有儿童）
			var hasChild =this.userInfoHasChild(userInfoArr);
			if(hasChild){
				this.getChildInfo(userInfoArr);
			}
		}
		if(localStorage.getItem("flightMobile")){
			var mobileStr = localStorage.getItem("flightMobile");
			var mobile = JSON.parse(mobileStr).val;
			this.props.telFn(mobile);
		}
		if(localStorage.getItem("flightUserName")){
			var userNameStr = localStorage.getItem("flightUserName");
			var userName = JSON.parse(userNameStr).val;
			this.props.userNameFn(userName);
		}
	},
	componentDidUpdate:function(){
		if(this.props.childTicket&&this.state.hasChild&&this.state.flage){
			var that = this;
			this.setState({
				flage:false
			})
			$.map(this.props.flightlist,function(elem,index){
				var flightInfo = {depCode:elem["depCode"],arrCode:elem["arrCode"],depDate:elem["depDate"],flightNo:elem["flightNo"],seatCode:elem["seatClass"]}
				$.post(uddh5.apihost+"/getchildpriceandpolicy",flightInfo,function(data){
					if(data.code==1){
						var data = data.data
						if(index==0){
							that.props.childTicketPriceFn(data,"goChildPrice")
						}else{
							that.props.childTicketPriceFn(data,"backChildPrice")
						}
					}else{
						if(index==0){
							that.props.childTicketPriceFn({},"goChildPrice")
						}else{
							that.props.childTicketPriceFn({},"backChildPrice")
						}
					}
				})
			})
		}

	},
	// 添加常用联系人
	userFn:function(){
		var requestHybrid = {
			tagname: 'forward',
          	topage:'detail',
          	type:"native",
          	item:'train',
          	param:{
          		typeId:"10167",
          		title:'',
          		userInfo: this.props.userInfo
          	}
		}
		var native_callback=function(data){
			var data = JSON.parse(data);
				data = data.param;
			var userArr = data.userInfo;
			this.props.userInfoFn(userArr);
			//是否有儿童
			var hasChild =this.userInfoHasChild(userArr);
			//更新儿童信息
			if(hasChild){
				this.getChildInfo(userArr);
			}else{
				this.getChildInfo({})
			}
		}.bind(this)
		uddh5.bridge(native_callback,requestHybrid);
		// var userArr = [{touristname:"生",touristmobile:"18255062153",cardtype:0,cardno:"342225199407184016",id:"1",isChild:1},{touristname:"张三",touristmobile:"18255062153",cardtype:1,cardno:"342225199407184016",id:"2",isChild:0}];
		// this.props.userInfoFn(userArr);
		// //是否有儿童
		// var hasChild =this.userInfoHasChild(userArr);
		// //更新儿童信息
		// if(hasChild){
		// 	this.getChildInfo(userArr);
		// }
		// this.props.allPriceFn();
	},
	// 删除联系人
	removeUser:function(user){
		var userInfo = this.props.userInfo;
		var newUserInfoArr = $.grep(userInfo,function(elem,index){
			return elem.id != user.id
		})
		this.props.userInfoFn(newUserInfoArr);
		this.userInfoHasChild(newUserInfoArr)
		//更新儿童信息
		if(!!user.isChild){
			this.deleteChildInfo(user)
		}
	},
	// 获取所有儿童信息
	getChildInfo:function(userInfoArr){
		var privilegeChildInfo = this.state.privilegeChildInfo;
		var newprivilegeChildInfo = [];
		var childInfo = $.grep(userInfoArr,function(elem,index){
			return elem.isChild == 1;
		});
		$.map(childInfo,function(elem,index){
			$.map(privilegeChildInfo,function(data,idx){
				if(data.id==elem.id){
					newprivilegeChildInfo.push(data)
				}
			})
		})
		// 将儿童票信息传到父组件
		this.props.childInfoFn(childInfo);
		this.props.privilegeChildInfoFn(newprivilegeChildInfo);
		this.setState({
			childInfo:childInfo,
			privilegeChildInfo:newprivilegeChildInfo
		})
	},
	// 点击删除时，更新所有儿童信息和选择优惠的儿童信息
	deleteChildInfo:function(userInfo){
		var childInfo = this.state.childInfo;
		var privilegeChildInfo = this.state.privilegeChildInfo;
		var newChildInfo = $.grep(childInfo,function(elem,index){
			return elem.id != userInfo.id
		});
		var newPrivilegeChildInfo = $.grep(privilegeChildInfo,function(elem,index){
			return elem.id != userInfo.id
		});
		this.props.childInfoFn(newChildInfo);
		this.props.privilegeChildInfoFn(newPrivilegeChildInfo);
		this.setState({
			childInfo:newChildInfo,
			privilegeChildInfo:newPrivilegeChildInfo
		})
	},
	// 勾选优惠时，得到选择优惠的儿童信息
	updateChildInfo:function(userInfo){
		var privilegeChildInfo = this.state.privilegeChildInfo;
		var idx = -1;
		$.map(privilegeChildInfo,function(elem,index){
			if(elem.id == userInfo.id){
				idx = index;
			}
		})
		if(idx==-1){
			privilegeChildInfo.push(userInfo)
		}else{
			privilegeChildInfo.splice(idx,1)
		}
		this.props.privilegeChildInfoFn(privilegeChildInfo);
		this.setState({
			privilegeChildInfo:privilegeChildInfo
		})
	},
	// 通讯录
	telFn:function(){
		var requestHybrid = {
			tagname: 'forward',
          	topage:'detail',
          	type:"native",
          	item:'train',
          	param:{
          		typeId:"10171",
          		title:''
          	}
		}
		var native_callback=function(date){
			var data = JSON.parse(date);
			var mobile = data.param.mobile;
			this.props.telFn(mobile)
		}.bind(this)
		uddh5.bridge(native_callback,requestHybrid)
		// var tel = '18255062153'
		// this.props.telFn(tel)
	},
	// 输入姓名和手机号码
	userNameFn:function(event){
		var name = event.target.value;
		this.props.userNameFn(name);
	},
	telnumberFn:function(event){
		var tel = event.target.value;
		this.props.telFn(tel);
	},
	scrollFn:function(){
    	var isAnd = navigator.userAgent.toLowerCase();
	    if (/android/.test(isAnd)) {
	      setTimeout(function(){
    		var userInfoTop = $("#userInfo").offset().top;
	        $(window).scrollTop(userInfoTop-20);
	      },200)
	    }
	},
	// 儿童票优惠价选择切换
	childChecked:function(user,e){
		var tag = e.target;
		$(tag).toggleClass("icon-weixuanzhong").toggleClass("icon-xuanzhong");
		//更新儿童信息
		this.updateChildInfo(user);
	},
	// 隐藏儿童订票提示
	deleteTip:function(){
		this.setState({
			childTip:false
		})
	},
	//验证乘客列表中是否存在儿童
	userInfoHasChild:function(arr){
		var hasChild = false;
		for(var i = 0; i<arr.length;i++){
			if(arr[i].isChild==1){
				hasChild=true;
				break;
			}
		}
		if(hasChild){
			this.setState({
				hasChild:hasChild,
				flage:true
			});
		}else{
			this.setState({
				hasChild:hasChild
			});
		}
		return hasChild;
	},
	render:function(){
		return(
				<div className="link_man">
					<div className="passenger">
						<div className="title clearfix">
							<strong>乘客</strong>
							<span className="often pull-right" onClick={this.userFn}>
								添加乘客
								&nbsp;<i className="iconfont icon-plus1"></i>
							</span>
						</div>
						{(this.state.childTip&&this.state.hasChild)?<div className="child_tip cur">
							<i className="iconfont icon-tanhaotubiao"></i>
							<span>儿童/婴儿登记须由成人陪同</span>
							<i className="iconfont icon-guanbi" onClick={this.deleteTip}></i>
						</div>:""}
						<ul className="passenger_list">
							{
								$.map(this.props.userInfo,function(elem,index){
									return(
											<li className="list" key={index}>
												<p className="info_name">
													<i className="iconfont icon-waste" onClick={this.removeUser.bind(this,elem)}></i>
													<span className="name">{(elem.isChild==1) ? elem.touristname+"（儿童）" : elem.touristname}</span>
													<span className="iconfont icon-youyou" onClick={this.userFn}></span>
												</p>
												{(elem.isChild==1&&this.props.childTicket&&(this.props.childPriceGo>this.props.adultPriceGo)&&(this.props.ticketNum==2?(this.props.childPriceBack>this.props.adultPriceBack):true))?<p className="child_choose">
													可预订优惠价￥{this.props.adultPriceGo+this.props.adultPriceBack} 
													<i>退改政策有变动</i>
													<span className="iconfont icon-weixuanzhong" onClick={this.childChecked.bind(this,elem)}></span>
												</p>:""}
											</li>
										)
								}.bind(this))
							}
						</ul>
						<div className="userInfo" id="userInfo">
							<strong>联系人信息</strong>
							<div className="mobile">
								<label>姓名</label>
								<input type="text" autocomplete="off" className="tel" placeholder="请输入联系人姓名" onChange={this.userNameFn} value={this.props.userName} onClick={this.scrollFn}/>
							</div>
							<div className="mobile">
								<label>手机</label>
								<input type="number" autocomplete="off" className="tel" placeholder="请输入手机号码" onClick={this.scrollFn} onChange={this.telnumberFn} value={this.props.tel}/>
								<i className="iconfont icon-book" onClick={this.telFn}></i>
							</div>
						</div>
					</div>
				</div>
			)
	}
});

// 个人模块报销凭证
var BaoXiao = React.createClass({
	getInitialState:function(){
		return{
			addressId:null,
			contactName:'',
			mobile:'',
			address:'',
			id:null,
			invoiceTitle:''
		}
	},
	handleClick:function(){
		this.props.baoXiaoFn();
	},
	tatouFn:function(){
		var requestHybrid = {
			tagname: 'forward',
          	topage:'detail',
          	type:"native",
          	item:'train',
          	param:{
          		typeId:"10172",
          		title:'',
          		id:this.state.id
          	}
		}
		var native_callback=function(data){
			var data = JSON.parse(data);
				data = data.param;
			this.setState({
				id:data.id,
				invoiceTitle:data.invoiceTitle
			})
			this.props.taitouFn(data)
		}.bind(this)
		uddh5.bridge(native_callback,requestHybrid)
		// var data = {id:12,invoiceTitle:"游大网络技术（上海）有限公司"};
		// this.setState({
		// 	id:data.id,
		// 	invoiceTitle:data.invoiceTitle
		// })
		// this.props.taitouFn(data.id)
	},
	dressFn:function(){
		var requestHybrid = {
			tagname: 'forward',
          	topage:'detail',
          	type:"native",
          	item:'train',
          	param:{
          		typeId:"10168",
          		title:"",
          		addressId:this.state.addressId
          	}
		}
		var native_callback=function(data){
			var data=JSON.parse(data);
				data=data.param;
			this.setState({
			addressId:data.addressId,
			contactName:data.name,
			mobile:data.mobile,
			address:data.address
		})
		this.props.addressFn(data)
		}.bind(this)
		uddh5.bridge(native_callback,requestHybrid)
		// var data = {addressId:"123",name:"永生",mobile:"18255062153",address:"宝山区泰和路2038号"};
		// this.setState({
		// 	addressId:data.addressId,
		// 	contactName:data.name,
		// 	mobile:data.mobile,
		// 	address:data.address
		// })
		// this.props.addressFn(data.addressId)
	},
	render:function(){
		return(
				<div className="baoxiao cur">
					<div className="baoxiao_check checked_cont">
						<h5 className="title">报销凭证</h5>
						<span className="explain">快递配送 ￥{this.props.kuaidifei}</span>
						<span className={"checked"+((this.props.baoxiao)?" "+"cur":"")} onClick={this.handleClick}>
							<em></em>
						</span>
					</div>
					<div className={"fapiao_xinxi"+(this.props.baoxiao?" "+"cur":"")}>
						<div className="taitou clearfix" onClick={this.tatouFn}>
							抬头
							<span className="company_name pull-right">{this.state.invoiceTitle}</span>
							<i className="iconfont icon-youyou"></i>
						</div>
						<div className="address" onClick={this.dressFn}>
							<label className="left">配送地址</label>
							<div className="right">
								<p className="user_name">{this.state.contactName}</p>
								<p className="tel">{this.state.mobile}</p>
								<p className="address_detail">{this.state.address}</p>
							</div>
							<i className="iconfont icon-youyou"></i>
						</div>
					</div>
				</div>
			)
	}
});

// 商旅出行发票信息
var InvoiceInfo = React.createClass({
	getInitialState:function(){
		return {
			showAlert:false
		}
	},
	// 配送方式弹框显示
	AlertShowFn:function(){
		this.setState({
			showAlert:true
		})
	},
	// 配送方式弹框显示隐藏
	AlertHideFn:function(e){
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			showAlert:false
		})
	},
	// 选择配送方式
	chooseExpressFn:function(e){
		var tag = $(e.target);
		var li = tag.closest("li");
		li.addClass("cur").siblings().removeClass("cur");
		this.setState({
			showAlert:false
		})
	},
	render:function(){
		return (
				<div className="sl_invoice">
					<h5>发票信息</h5>
					<p className="peisong" onClick={this.AlertShowFn}>
						<label>配送方式</label>
						<span>定期配送</span>
						<i className="iconfont icon-youyou"></i>
					</p>
					<p className="fapiao">
						<label>发票信息</label>
						<span>每月5月，定期配送</span>
						<i className="iconfont icon-youyou"></i>
					</p>
					<div className={this.state.showAlert?"peisong_alert cur":"peisong_alert"}>
						<div className="shadow" onClick={this.AlertHideFn}></div>
						<ul>
							<li className="cur" onClick={this.chooseExpressFn}>定期配送<i className="iconfont icon-gougou"></i></li>
							<li onClick={this.chooseExpressFn}>一单一寄<span className="price">（配送10元）</span><i className="iconfont icon-gougou"></i></li>
							<li onClick={this.chooseExpressFn}>不需要发票<i className="iconfont icon-gougou"></i></li>
						</ul>
					</div>
				</div>
			)
	}
});
// 航空意外险
var Insurance = React.createClass({
	getInitialState: function(){
		return{
			data:[{className:"航意险",highestPrice:15,specialNote:"航空意外险80万（国内国际航班均保）      意外医疗2万",productId:"117"}
			,{className:"航延险",highestPrice:15,specialNote:"飞机到达目的地延误3小时以上赔付300元，返航、备降、取消赔付100元",productId:"115"}]
		}
	},
	yiWaiClick:function(obj,e){
		var span = $(e.target).closest('.checked');
		span.toggleClass("cur")
		this.props.insuranceProductListFn(obj)
	},
	componentDidMount: function(){
		$.map(this.state.data,function(elem,index){
			var Obj={};
			Obj.className = elem.className;
			Obj.highestPrice = elem.highestPrice;
			Obj.productId = elem.productId;
			this.props.insuranceFn(Obj)
		}.bind(this))
		// $.post(uddh5.apihost+'/getinsuranceproduct', {}, function(data){
		// 	if(data.code == 1){
		// 		var data=data.data;
		// 		this.setState({
		// 			data:data
		// 		})
		// 		$.map(data,function(elem,index){
		// 			var Obj={};
		// 			Obj.className = elem.className;
		// 			Obj.highestPrice = elem.highestPrice;
		// 			Obj.productId = elem.productId;
		// 			this.props.insuranceFn(Obj)
		// 		}.bind(this))
		// 	}
		// }.bind(this));
	},
	render:function(){
		var flightlistLen = this.props.flightlist.length
		return(
				<ul className="insurance">
					{
						$.map(this.state.data,function(elem,index){
							return(
									<li className="checked_cont" key={index}>
										<div className="top">
											<span className="title">{elem.className}</span>
											<span className="price">￥<em>{elem.highestPrice*flightlistLen}</em>/人*{this.props.userInfo.length}</span>
										</div>
										<span className="explain">{elem.specialNote}</span>
										<span className="checked cur" onClick={this.yiWaiClick.bind(this,{className:elem.className,highestPrice:elem.highestPrice,productId:elem.productId})}>
											<em></em>
										</span>
									</li>
								)
						}.bind(this))
					}
				</ul>
			)
	}
});
// 去支付
var ToPay = React.createClass({
	getInitialState:function(){
		return{
			allPrice:null
		}
	},
	handleClick:function(){
		this.props.priceDetailShowFn()
	},
	render:function(){
		return(
				<div className="bottom_nav">
					<div className="go_pay clearfix">
						<div className="money pull-left">
							总额：￥
							<strong>{this.props.price}</strong>
						</div>
						<div className="pay pull-right">
							<span className={"price_detail"+((this.props.priceDetail)?" "+"gray":"")} onClick={this.handleClick}>明细</span>
							<input type="submit" className="btn" value="去预定"/>
						</div>
					</div>
				</div>
			)
	}
});
// 费用明细弹框
var PriceDetail = React.createClass({
	handleClick:function(){
		this.props.priceDetailHideFn()
	},
	render:function(){
		var userInfo = this.props.userInfo;
		var userNum = userInfo.length;
		var insuranceProductList = this.props.insuranceProductList;
		var baoxiao = this.props.baoxiao;
		var flightlistLen = this.props.flightlist.length;
		var goChildPrice = this.props.goChildPrice;
		var backChildPrice = this.props.backChildPrice;
		// 所有儿童人数
		var childNum = this.props.childInfo.length;
		// 选择优惠的儿童人数
		var privilegeChildNum = this.props.privilegeChildInfo.length;
		// 购买儿童票的儿童人数
		var buyChildTicketNum = childNum-privilegeChildNum;
		// 成人人数（可以购买儿童票的情况下成人人数）
		var audltNum = userNum-childNum;
		// 是否有儿童票判断
		var hasChild = ((flightlistLen==1)?goChildPrice.childTicketPrice:(goChildPrice.childTicketPrice&&backChildPrice.childTicketPrice));
		return(
				<div className={"price_detail_cont"+((this.props.priceDetail)?" "+"cur":"")}>
					<div className="shade" onClick={this.handleClick}></div>
					<div className="price_detail" ref="modalRoot">
						{
							$.map(this.props.flightlist,function(elem,index){
								return(
										<div>
											<h5 className="titel">{(index==1)?"返程":"去程"}</h5>
											<ul className="price_detail_list">
						            			<li className="clearfix"><span className="pull-left">机票</span><span className="pull-right"><strong>￥{elem.parPrice}</strong>x<em>{hasChild?audltNum:userNum}人</em></span></li>
						            			<li className="clearfix"><span className="pull-left">民航基金</span><span className="pull-right"><strong>￥{elem.airportTax}</strong>x<em>{hasChild?audltNum:userNum}人</em></span></li>
						            			<li className="clearfix"><span className="pull-left">燃油</span><span className="pull-right"><strong>￥{elem.fuelTax}</strong>x<em>{hasChild?audltNum:userNum}人</em></span></li>
											</ul>
											{((childNum>0)&&hasChild)?<ul className="price_detail_list">
						            			<li className="clearfix"><span className="pull-left">儿童机票</span><span className="pull-right"><strong>￥{index==0?goChildPrice.childTicketPrice:backChildPrice.childTicketPrice}</strong>x<em>{buyChildTicketNum}人</em></span></li>
						            			<li className="clearfix"><span className="pull-left">儿童民航基金</span><span className="pull-right"><strong>￥{index==0?goChildPrice.childAirportTax:backChildPrice.childAirportTax}</strong>x<em>{buyChildTicketNum}人</em></span></li>
						            			<li className="clearfix"><span className="pull-left">儿童燃油</span><span className="pull-right"><strong>￥{index==0?goChildPrice.childFuelTax:backChildPrice.childFuelTax}</strong>x<em>{buyChildTicketNum}人</em></span></li>
											</ul>:''}
											{privilegeChildNum?<ul className="price_detail_list">
						            			<li className="clearfix"><span className="pull-left">儿童机票（优惠）</span><span className="pull-right"><strong>￥{elem.parPrice}</strong>x<em>{privilegeChildNum}人</em></span></li>
						            			<li className="clearfix"><span className="pull-left">儿童民航基金（优惠）</span><span className="pull-right"><strong>￥{elem.airportTax}</strong>x<em>{privilegeChildNum}人</em></span></li>
						            			<li className="clearfix"><span className="pull-left">儿童燃油（优惠）</span><span className="pull-right"><strong>￥{elem.fuelTax}</strong>x<em>{privilegeChildNum}人</em></span></li>
											</ul>:''}
										</div>
									)
							}.bind(this))
						}
						<div className={(baoxiao||insuranceProductList.length>0)?"fujia cur":"fujia"}>
							<ul className="price_detail_list">
								{
									$.map(insuranceProductList,function(elem,index){
										return(
		            							<li className="clearfix"><span className="pull-left">{elem.className}</span><span className="pull-right"><strong>￥{elem.highestPrice*flightlistLen}</strong>x<em>{userNum}份</em></span></li>
											)
									})
								}
		            			{baoxiao?<li className="clearfix"><span className="pull-left">配送费</span><span className="pull-right"><strong>￥{this.props.kuaidifei}</strong></span></li>:''}
							</ul>
						</div>
					</div>
				</div>
			)
	}
})
export default PlaneOrder;