import React from 'react'
import {Link} from 'react-router'
import uddh5 from '../../common/js/common.js'
import Alert from '../../common/ui/alert/alert.jsx'
import BaiduMobStat from '../../common/js/mobstat.js'
require('../../common/ui/alert/alert.scss')
// import Debug from '../../common/ui/debug/debug.jsx'
// require('../../common/ui/debug/debug.scss')

var TrainOrder = React.createClass({
	getInitialState:function(){
		return{
			kuaidi:false,
			baoxian:true,
			wuzuo:false,
			userInfo:[],
			trainUser:0,
			uuid: '',
			trainNumber: 'G102',
			fromStation: '上海虹桥',
			toStation: '北京南',
			fromStationCode: 'AOH',
			toStationCode: 'VNP',
			trainDate: '2016-11-22',
			departureTime: '2016-11-22 06:39',
			arriveTime: '2016-11-22 12:18',
			ticketNumber: '1',
			banquet: '',
			banquetName: '',
			contactMobile: '',
			contactName: '',
			expressAmount: 25,
			price: 553,
			adduser: '8011',
			contactAddress: '',
			subOrderVos:[],
			loginUserName: '',
			loginUserPassword: '',
			isExpressCharge: '',
			isInsurance: '1',
			insuranceId: '1',
			isPublic: '1',
			seatList: [],
			runTime: '4小时55分钟',
			addressId: '',
			trainCode: '5l0000G10261',
			insurancePrice: 0,
			loading:false,
			sourceType:"",
			sourceId:"",
			tel:'',
			userName:''
		}
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
	handleSubmit: function(e){
		e.preventDefault();
		var userInfo=this.state.userInfo;
		if(!this.state.banquetName){
			this.openAlert("本辆车次车票已售完,请选择其他车次");
			return
		}
		if(!userInfo.length){
			this.openAlert("请添加乘客");
			return;
		}else{
			var subOrderVos=$.map(userInfo, function(elem, index){
				return({passengerMobile:elem.touristmobile,commonContacts: 0, "passengerName": elem.touristname, passengerCertificateType: elem.cardtype, passengerCertificateNo: elem.cardno, passengerType: 1, "passengerTypeName": "成人票", "ticketAmount": this.state.price, passengerBirthday: elem.birthDate, passengerCertificateTypeName: elem.cardtype == "1"? "二代身份证" : elem.cardtype == "2"? "护照" : elem.cardtype == "5"? "台胞证" : elem.cardtype == "6"? "港澳通行证" : '' });
			}.bind(this));
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

		if(this.state.kuaidi){
			if(this.state.contactName == ''){
				this.openAlert("请添加配送信息");
				return;
			}
		}
		// 所有条件都通过以后做数据存储
		this.localStorageFn();
		// var form={
		// 	"uuid": this.state.uuid,
		// 	"form": "0-15000470092-刘策--0-1-411224199212155611-1-任少楠-1-8011-0-21-1-",
		// 	"trainNumber": "6801",
		// 	"fromStation": "太原",
		// 	"toStation": "太原东",
		// 	"fromStationCode": "TYV",
		// 	"toStationCode": "TDV",
		// 	"trainDate": "2016-11-17",
		// 	"departureTime": "2016-11-17 16:52:00",
		// 	"arriveTime": "2016-11-17 16:57:00",
		// 	"ticketNumber": 1,
		// 	"banquetName": "硬座",
		// 	"contactMobile": "15921823421",
		// 	"contactName": "刘策",
		// 	"orderAmount": 21,
		// 	"expressAmount": 0,
		// 	"price": 1,
		// 	"adduser": 8011,
		// 	"contactAddress": "",
		// 	"subOrderVos": subOrderVos,
		// 	"loginUserName": "",
		// 	"loginUserPassword": "",
		// 	"isExpressCharge": 0,
		// 	"isInsurance": 1,
		// 	"insuranceId": "1",
		// 	"insuranceAmount": 20,
		// 	"acceptStanding": false,
		// 	isCorporateTravel: 1,
		// 	isPublic: 1,
		// }
		var form={
			"uuid": this.state.uuid,
			"form": this.state.trainNumber+"-"+this.state.fromStation+"-"+this.state.fromStationCode+"-"+this.state.toStation+"-"+this.state.toStationCode+"-"+this.state.trainDate,//字符拼接为任意内容，格式：文字-文字
			"trainNumber": this.state.trainNumber,
			"fromStation": this.state.fromStation,
			"toStation": this.state.toStation,
			"fromStationCode": this.state.fromStationCode,
			"toStationCode": this.state.toStationCode,
			"trainDate": this.state.trainDate,
			"departureTime": this.state.departureTime+":00",
			"arriveTime": this.state.arriveTime+":00",
			"ticketNumber": this.state.userInfo.length,//用户数目
			"banquetName": this.state.banquetName,
			"expressContactMobile": this.state.kuaidi? this.state.contactMobile : '',
			"expressContactName": this.state.kuaidi? this.state.contactName : '',
			"orderAmount": (parseFloat(this.state.price, 10)+parseFloat(this.state.baoxian?this.state.insurancePrice : 0, 10))*this.state.userInfo.length+parseFloat(this.state.kuaidi? 20+(this.state.userInfo.length*5) : 0, 10),//总价格
			"expressAmount": this.state.kuaidi? 20+(this.state.userInfo.length*5) : '',
			"price": this.state.price,
			"adduser": uddh5.getCookie('userId')? uddh5.getCookie('userId') : ''  ,//用户id测试：8011
			"contactAddress": this.state.kuaidi? this.state.contactAddress : '',
			"subOrderVos": JSON.stringify(subOrderVos),
			"loginUserName": "",
			"loginUserPassword": "",
			"isExpressCharge": this.state.kuaidi? 1 : 0,
			"isInsurance": this.state.baoxian? 1 : 0,
			"insuranceAmount": this.state.baoxian? this.state.insurancePrice*this.state.userInfo.length : '',
			"acceptStanding": this.state.wuzuo,
			sourceType: (uddh5.getCookie('isPublic')==1)? 4 : 5,
			sourceId: '',
			contactName:this.state.userName,
			contactMobile:this.state.tel
		};
		this.setState({
			loading:true
		})
		$.post(uddh5.apihost+"/appaddorder", form, function(data){
			var that=this;
			this.setState({
				loading:false
			})
			if(data.code == 1){
				var passengers=$.map(that.state.userInfo, function(elem, index){return elem.touristname});
				// 正式环境
				// window.location.assign("/uddtriph5/train/#/zhanzuo/"+data.data.orderId+"?fromStation="+this.state.fromStation+"&toStation="+this.state.toStation+"&departureTime="+this.state.departureTime+"&arriveTime="+this.state.arriveTime+"&runTime="+this.state.runTime+"&trainNumber="+this.state.trainNumber+"&passengers="+passengers.join('-')+"&price="+this.state.price+"&trainCode="+this.state.trainCode+"&fromStationCode="+this.state.fromStationCode+"&toStationCode="+this.state.toStationCode+"&trainDate="+this.state.trainDate+"&banquetName="+this.state.banquetName);

				// 测试环境
				window.location.assign("/train/#/zhanzuo/"+data.data.orderId+"?fromStation="+this.state.fromStation+"&toStation="+this.state.toStation+"&departureTime="+this.state.departureTime+"&arriveTime="+this.state.arriveTime+"&runTime="+this.state.runTime+"&trainNumber="+this.state.trainNumber+"&passengers="+passengers.join('-')+"&price="+this.state.price+"&trainCode="+this.state.trainCode+"&fromStationCode="+this.state.fromStationCode+"&toStationCode="+this.state.toStationCode+"&trainDate="+this.state.trainDate+"&banquetName="+this.state.banquetName);
			}else{
				var msg = data.msg;
				this.openAlert(msg);
			}
		}.bind(this));
    },
    componentWillMount: function(){
		$.post(uddh5.apihost+'/getuuid', function(data){
			this.setState({
				uuid: data.data
			});
		}.bind(this));
		BaiduMobStat.onPageStart('Train-Order-Fill');
    },
    componentWillUnmount: function(){
        BaiduMobStat.onPageEnd('Train-Order-Fill');
    },
	componentDidMount:function(){
		var that=this;
		// 与App的交互
		var requestHybrid = {
			tagname: 'forward',
			topage:'title',
			type:"native",
			item:"train",
			param: {
            	typeId: "c10165",
            	title:"订单填写"
          }
		}
		var native_callback=function(data){
			var data=JSON.parse(data);
			that.setState({
				trainDate: data.trainDate,
				trainNumber: data.trainNumber,
				trainCode: data.trainCode,
				fromStation: data.fromStation,
				toStation: data.toStation,
				fromStationCode: data.fromStationCode,
				toStationCode: data.toStationCode,
				departureTime: data.departureTime,
				arriveTime: data.arriveTime,
				seatList: data.seatList,
				runTime: data.runTime,
				loginUserName: data.trainUserName,
				loginUserPassword: data.trainPassword,
				trainUser: !!data.trainUserName? '1' : '0',
			});
		}
		uddh5.bridge(native_callback,requestHybrid);
	},
	// 乘客信息添加
	userInfoFn:function(arr){
		this.setState({
			userInfo:arr
		});
	},
	// 将用户信息传入cookie
	localStorageFn:function(){
		localStorage.setItem("userInfo",JSON.stringify({val: this.state.userInfo}));
		// 选择使用快递将快递地址传入cookie
		localStorage.setItem("addressInfo",JSON.stringify({val: {addressId: this.state.addressId, name: this.state.contactName, address: this.state.contactAddress, tel: this.state.contactMobile}}));
		// 电话号码存储
		localStorage.setItem("trainMobile",JSON.stringify({val: this.state.tel}));		
		// 用户姓名存储
		localStorage.setItem("trainUserName",JSON.stringify({val: this.state.userName}));		
	},
	// 添加地址配送信息
	addressFn:function(obj){
		this.setState({
			addressId:obj.addressId,
			contactName: obj.name,
			contactAddress: obj.address,
			contactMobile: obj.tel
		});
	},
	// 是否登录12306
	trainUserFn:function(name, password){
		if(!!name){
			this.setState({
				trainUser:1,
				loginUserName: name,
				loginUserPassword: password
			});
		}
	},
	kuaiDiFn:function(){
		this.setState({
			kuaidi:!this.state.kuaidi
		})
	},
	// 是否加载地址填写模块
	addressTianxie:function(){
		if(this.state.kuaidi){
			return <Address contactAddress={this.state.contactAddress} contactName={this.state.contactName} contactMobile={this.state.contactMobile} addressFn={this.addressFn} addressId={this.state.addressId}/>
		}
	},
	baoXianFn:function(){
		this.setState({
			baoxian:!this.state.baoxian
		});
	},
	getInsurancePrice: function(price){
		this.setState({
			insurancePrice: price
		});
	},
	wuZuoFn:function(){
		this.setState({
			wuzuo:!this.state.wuzuo
		});
	},
	wuZuoFalseFn:function(){
		this.setState({
			wuzuo:false
		});
	},
	wuZuoTureFn:function(){
		this.setState({
			wuzuo:true
		});
	},
	getTicketType: function(obj){
		this.setState({
			banquetName: obj.banquetName,
			price: obj.seatPrice
		});
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
	render:function(){
		var loading=require('../img/loading.gif');
		return(
				<div className="order">
					<form onSubmit={this.handleSubmit} autocomplete="off">
						<Station trainDate={this.state.trainDate} trainNumber={this.state.trainNumber} trainCode={this.state.trainCode} fromStation={this.state.fromStation} toStation={this.state.toStation} fromStationCode={this.state.fromStationCode} toStationCode={this.state.toStationCode} departureTime={this.state.departureTime} arriveTime={this.state.arriveTime} runTime={this.state.runTime} localStorageFn={this.localStorageFn}/>
						<TicketType wuzuo={this.state.wuzuo} wuZuoFn={this.wuZuoFn} wuZuoFalseFn={this.wuZuoFalseFn} wuZuoTureFn={this.wuZuoTureFn} seatList={this.state.seatList} getTicketType={this.getTicketType} openAlert={this.openAlert}/>
						<Linkman userInfo={this.state.userInfo} userInfoFn={this.userInfoFn} trainUser={this.state.trainUser} trainUserFn={this.trainUserFn} loginUserName={this.state.loginUserName} loginUserPassword={this.state.loginUserPassword}  telFn={this.telFn} tel={this.state.tel} userNameFn={this.userNameFn} userName={this.state.userName}/>
						{/*<Ckecked kuaidi={this.state.kuaidi} kuaiDiFn={this.kuaiDiFn}/>*/}
						{this.addressTianxie()}
						<Insurance baoxian={this.state.baoxian} baoXianFn={this.baoXianFn} getInsurancePrice={this.getInsurancePrice}/>
						<div className="tui_gq"><strong>退改规则</strong><p>  开车前15天（不含）以上退票的，不收取退票费；票面乘车站开车时间前48小时以上的按票价5%计，24小时以上、不足48小时的按票价10%计，不足24小时的按票价20%计。
     开车前48小时～15天期间内，改签或变更到站至距开车15天以上的其他列车，又在距开车15天前退票的，仍核收5%的退票费。</p></div>
						<div className="sub"><input type="submit" value="提交订单" className="submit"/></div>
						<div className={"send-loading"+((this.state.loading)?" "+"cur":"")}><div className="loading-inner"><img src={loading} /><span>数据提交中！</span></div></div>
					</form>
					{this.state.messageShow? <Alert textMessage={this.state.textMessage}/> : ''}
				</div>
			)
	}
});
// 始发站
var Station = React.createClass({
	localStorageFn:function(){
		this.props.localStorageFn();
	},
	render:function(){
		var date=this.props.trainDate;
		return(
				<div className="station order_cont">
					<div className="train_number">
						<span className="time">{date.split('-')[0]}年{date.split('-')[1]}月{date.split('-')[2]}日</span>
						<span className="num">{this.props.trainNumber}</span>
					</div>
					<div className="train_station clearfix">
						<div className="station_info pull-left">
							<span className="station_name">{this.props.fromStation}</span>
							<span className="time">{this.props.departureTime.split(' ')[1]}</span>
						</div>
						<div className="mid">
							<span className="all_time">预计用时{this.props.runTime}</span>
							<span className="arrows"></span>
							<span><Link onClick={this.localStorageFn} to={{pathname:"/jingting", query: {trainCode: this.props.trainNumber, fromStationCode: this.props.fromStationCode, toStationCode: this.props.toStationCode, trainDate: this.props.trainDate, trainNumber: this.props.trainCode}}}>查看经停站</Link></span>
						</div>
						<div className="station_info pull-right">
							<span className="station_name">{this.props.toStation}</span>
							<span className="time">{(this.props.arriveTime).split(' ')[1]}</span>
						</div>
					</div>
				</div>
			)
	}
});
// 票型选择
var TicketType = React.createClass({
	getInitialState:function(){
		return{
			index:null,
			once: false,
			showWuzuo: false,
			tips:false
		}
	},
	componentDidUpdate: function(){
		if(!this.state.once && this.props.seatList.length){
			var seatList=$.grep(this.props.seatList, function(elem, index){
				return elem.stockNumber != 0;
			});
			if(seatList.length){
				this.ticketTypeFn(seatList[0].index, seatList[0]);
				if(seatList[0].banquetName == '硬座' || seatList[0].banquetName == '二等座'){
					this.setState({
						showWuzuo: true
					});
				}
			}
			this.setState({
				once: true
			});
		}
	},
	// 票型选择
	ticketTypeFn:function(index, elem, e){
		if(elem.stockNumber != 0){
			this.setState({
				index:index
			});
			if(elem.banquetName.indexOf("卧")!=-1){
				this.setState({
					tips:true
				})
			}else{
				this.setState({
					tips:false
				})
			}
			if(elem.banquetName == '无座'){
				this.props.getTicketType(this.props.seatList[0]);
			}else{
				this.props.getTicketType(elem);
			}
			if(elem.banquetName == '硬座' || elem.banquetName == '二等座'){
				this.setState({
					showWuzuo: true
				});
			}else if(elem.banquetName == '无座'){
				this.props.wuZuoTureFn();
				this.setState({
					showWuzuo: false
				});
			}else{
				this.props.wuZuoFalseFn();
				this.setState({
					showWuzuo: false
				});
			}
		}else{
			this.props.openAlert('没有可预订的座位！');
			return;
		}
	},
	// 是否接受无座
	handClick:function(){
		this.props.wuZuoFn()
	},
	render:function(){
		var obj =this.props.seatList;
		return(
				<div className="ticket_type">
					<ul className="type_list">
						{
							$.map(obj,function(elem,index){
								return(
										<li className={"list"+((this.state.index==index)?" "+"cur":"")} key={index} onClick={this.ticketTypeFn.bind(this, index, elem)}>
											<span className="type">{elem.banquetName}</span>
											<span className="num">{elem.stockNumber}张</span>
											<span className="price">￥{elem.seatPrice}</span>
										</li>
									)
							}.bind(this))
						}
					</ul>
					<div className={this.state.showWuzuo? "seat order_cont" : 'seat order_cont hide'}>
						<span>是否接受无座</span>
						<span className={"seat_checked"+((this.props.wuzuo)?" "+"cur":"")} onClick={this.handClick}>
							<i className="iconfont icon-gougou"></i>
						</span>
					</div>
					<div className={(this.state.tips)?"tips cur":"tips"}>卧铺显示为中铺票价、支付时暂收下铺价格,差价1-2个工作日原路返回。</div>
				</div>
			)
	}
});
// 联系人
var Linkman =React.createClass({
	componentDidMount:function(){
		if(localStorage.getItem("userInfo")){
			var userInfoString = localStorage.getItem("userInfo");
			var userInfoArr = JSON.parse(userInfoString).val;
			this.props.userInfoFn(userInfoArr)
		}
		if(localStorage.getItem("trainMobile")){
			var mobileStr = localStorage.getItem("trainMobile");
			var mobile = JSON.parse(mobileStr).val;
			this.props.telFn(mobile);
		}
		if(localStorage.getItem("trainUserName")){
			var userNameStr = localStorage.getItem("trainUserName");
			var userName = JSON.parse(userNameStr).val;
			this.props.userNameFn(userName);
		}
	},
	// 删除联系人
	removeUser:function(id){
		var newUserInfoArr = $.grep(this.props.userInfo,function(elem,index){
			return elem.id != id
		});
		this.props.userInfoFn(newUserInfoArr)
	},
	// 登录12306添加常用联系人
	registerFn:function(){
		var that=this;
		var requestHybrid = {
			tagname: 'forward',
          	topage:'detail',
          	type:"native",
          	item:'train',
          	param:{
          		typeId:"10166",
          		trainUserName: this.props.loginUserName,
          		trainPassword: this.props.loginUserPassword
          	}
		}
		var native_callback=function(data){
			var data=JSON.parse(data);
			data=data.param;
			that.props.trainUserFn(data.trainUserName, data.trainPassword);
		}
		uddh5.bridge(native_callback,requestHybrid)
	},
	// 添加常用联系人
	userFn:function(){
		var that=this;
		var requestHybrid = {
			tagname: 'forward',
          	topage:'detail',
          	type:"native",
          	item:'train',
          	param:{
          		typeId:"10167",
          		userInfo: this.props.userInfo
          	}
		}
		var native_callback=function(data){
			var data=JSON.parse(data);
			data=data.param;
			var userArr = data.userInfo;
			that.props.userInfoFn(userArr);
		}
		uddh5.bridge(native_callback,requestHybrid);
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
	render:function(){
		return(
				<div className="link_man">
					<div className="register">
						<a href="javascript:;" onClick={this.registerFn}>{(this.props.trainUser==0)?"登录12306添加常用联系人":"已登录12306"}<i className="iconfont icon-turnright"></i></a>
					</div>
					<div className="passenger">
						<div className="title clearfix">
							<strong>乘客</strong>
							<span className="often pull-right" onClick={this.userFn}>
								添加乘客
								&nbsp;<i className="iconfont icon-plus1"></i>
							</span>
						</div>
						<ul className="passenger_list">
						{
							$.map(this.props.userInfo,function(elem,index){
								return(
										<li className="list" key={index}>
											<span className="name">{elem.touristname}</span>
											<span className="iconfont icon-waste" onClick={this.removeUser.bind(this, elem.id)}></span>
										</li>
									)
							}.bind(this))
						}
						</ul>
					</div>
					<div className="userInfo" id="userInfo">
						<strong>联系人信息</strong>
						<div className="mobile">
								<label>姓名</label>
								<input type="text" autocomplete="off" className="tel" placeholder="请输入联系人姓名" onChange={this.userNameFn} value={this.props.userName} onClick={this.scrollFn}/>
						</div>
						<div className="mobile">
								<label>手机</label>
								<input type="number" autocomplete="off" className="tel" placeholder="请输入手机号码" onChange={this.telnumberFn} value={this.props.tel} onClick={this.scrollFn}/>
								<i className="iconfont icon-book" onClick={this.telFn}></i>
						</div>
					</div>
				</div>
			)
	}
});

// 快递上门
// var Ckecked = React.createClass({
// 	handClick:function(){
// 		this.props.kuaiDiFn();
// 	},
// 	render:function(){
// 		return(
// 				<div className="checked_cont">
// 					<h5 className="title">快递上门</h5>
// 					<span className="explain">送货上门</span>
// 					<span className={"checked"+((this.props.kuaidi)?" "+"cur":"")} onClick={this.handClick}>
// 						<em></em>
// 					</span>
// 				</div>
// 			)
// 	}
// });

// 配送地址
var Address = React.createClass({
	componentDidMount:function(){
		if(localStorage.getItem("addressInfo")){
			var addressInfoString = localStorage.getItem("addressInfo");
			var addressInfoObj = JSON.parse(addressInfoString).val;
			this.props.addressFn(addressInfoObj);
		}
	},
	dressFn:function(){
		var that=this;
		var requestHybrid = {
			tagname: 'forward',
          	topage:'detail',
          	type:"native",
          	item:'train',
          	param:{
          		typeId:"10168",
          		addressId: this.props.addressId
          	}
		}
		var native_callback=function(data){
			var data=JSON.parse(data);
			data=data.param;
			that.setState({
				addressId: data.addressId,
				contactName: data.contactName,
				contactMobile: data.contactMobile,
				contactAddress: data.contactAddress
			});
			that.props.addressFn({addressId: data.addressId, name: data.contactName, tel: data.contactMobile, address: data.contactAddress})
		}
		uddh5.bridge(native_callback,requestHybrid)
		// var obj = {addressId: '11', name:"永生",tel:"18255062153",address:"宝山区泰和路2038号"};
		// this.props.addressFn(obj)
	},
	render:function(){
		return(
				<div className="address"  onClick={this.dressFn}>
					<label className="left">配送地址</label>
					<div className="right">
						<p className="user_name">{this.props.contactName}</p>
						<p className="tel">{this.props.contactMobile}</p>
						<p className="address_detail">{this.props.contactAddress}</p>
					</div>
					<i className="iconfont icon-youyou"></i>
				</div>
			)
	}
});
// 保险品种
var Insurance = React.createClass({
	getInitialState: function(){
		return{
			insuranceName: '',
			insurancePrice: ''
		}
	},
	componentDidMount: function(){
		$.post(uddh5.apihost+'/gettraininsuranceinfo',{}, function(data){
			var data=data.data;
			this.setState({
				insuranceName: data.insuranName,
				insurancePrice: data.price
			});
			this.props.getInsurancePrice(data.price);
		}.bind(this));
	},
	handClick:function(){
		this.props.baoXianFn();
	},
	render:function(){
		return(
				<div className="checked_cont insurance">
					<div className="top">
						<span className="title">{this.state.insuranceName}</span>
						<span className="price">￥<em>{this.state.insurancePrice}</em>/人</span>
					</div>
					<span className={"checked"+((this.props.baoxian)?" cur":"")} onClick={this.handClick}>
						<em></em>
					</span>
				</div>
			)
	}
});
export default TrainOrder;