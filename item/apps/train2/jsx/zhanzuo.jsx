import React from 'react'
import {Link} from 'react-router'
import uddh5 from '../../common/js/common.js'
import BaiduMobStat from '../../common/js/mobstat.js'
var ZhanZuo = React.createClass({
	getInitialState:function(){
		return{
			orderId:"",
			fromStation:"",
			toStation:"",
			departureTime:"",
			goDate:'',
			goTime:'',
			arriveTime:"",
			runTime:"",
			trainNumber:"",
			passengers:"",
			price:"",
			result:-1,
			payamount:null,
			user:[],
			latespaymenttime:null,
			trainCode:"",
			fromStationCode:"",
			toStationCode:"",
			trainNumber:"",
			banquetName:"",
			count: null,
			fresh: true,
			msg:''
		}
	},
	componentDidMount:function(){
		var that=this;
		if(this.isMounted()){
			var orderId = decodeURI(uddh5.location.queryHash()).split("/")[2];
			var fromStation = decodeURI(uddh5.location.queryKey("fromStation"));
			var toStation = decodeURI(uddh5.location.queryKey("toStation"));
			var departureTime = decodeURI(uddh5.location.queryKey("departureTime"));
			var arriveTime = decodeURI(uddh5.location.queryKey("arriveTime"));
			var runTime = decodeURI(uddh5.location.queryKey("runTime"));
			var trainNumber = decodeURI(uddh5.location.queryKey("trainNumber"));
			var passengers = decodeURI(uddh5.location.queryKey("passengers")).split('-');
			var price = decodeURI(uddh5.location.queryKey("price"));
			var banquetName = decodeURI(uddh5.location.queryKey("banquetName"));
			var goDate = this.goDateFn(departureTime);
			var goTime = this.timeFn(departureTime);
			var arriveTime = this.timeFn(arriveTime);
			// 经停站参数
			var trainCode = decodeURI(uddh5.location.queryKey("trainCode"));
			var fromStationCode = decodeURI(uddh5.location.queryKey("fromStationCode"));
			var toStationCode = decodeURI(uddh5.location.queryKey("toStationCode"));
			var startTime=new Date().getTime();
			this.setState({
				orderId:orderId,
				fromStation:fromStation,
				toStation:toStation,
				departureTime:departureTime,
				goDate:goDate,
				goTime:goTime,
				arriveTime:arriveTime,
				runTime:runTime,
				trainNumber:trainNumber,
				passengers:passengers,
				price:price,
				trainCode:trainCode,
				fromStationCode:fromStationCode,
				toStationCode:toStationCode,
				banquetName:banquetName
			});
			this.getTicket(orderId);
			// 与App交互
			var requestHybrid = {
				tagname: 'forward',
				topage:'title',
				type:"native",
				item:"train",
				param: {
	            	typeId: "c10164",
	            	title:'占座'
	          }
			}
			var native_callback=function(data){

			}
			uddh5.bridge(native_callback,requestHybrid);
		}
	},
	getTicket: function(orderId){
		var that=this;
		var orderId = orderId;
		var startTime=new Date().getTime();
		var ticketPost=function(){
			$.post(uddh5.apihost+"/appgettrainticketseatstatus", {orderId: orderId}, function(data){
				if(data.code==1){
					var data = data.data;
					if(data.result==1){
						this.setState({
							result:data.result,
							payamount:data.payamount,
							user:data.user,
							latespaymenttime:data.latespaymenttime,
							fresh: false
						}, function(){clearTimeout(this.freshPost);})
						// 设置倒计时
						this.fnTimeCountDown(data.latespaymenttime,{
							sec: document.getElementById("sec"),
			    	 		mini: document.getElementById("minute")
			    	 	});
					}
					if(data.result==0 && (new Date().getTime() - startTime > 2*60*1000)){
						this.setState({
							result:2,
						}, function(){clearTimeout(this.freshPost);});
					}
					if(data.result==2){
						if(data.code == 301){
							this.setState({
								result:0,
								msg:"，没有余票<br/>"
							}, function(){clearTimeout(this.freshPost);});
						}else if(data.code == 304){
							this.setState({
								result:0,
								msg:"，已超过未完成订单的授权数量<br/>"
							}, function(){clearTimeout(this.freshPost);});
						}else if(data.code == 305){
							this.setState({
								result:0,
								msg:"，您已经预订过该车次<br/>"
							}, function(){clearTimeout(this.freshPost);});
						}else if(data.code == 308){
							this.setState({
								result:0,
								msg:"，乘客身份信息未通过验证<br/>"
							}, function(){clearTimeout(this.freshPost);});
						}else if(data.code == 309){
							this.setState({
								result:0,
								msg:"，没有足够的票<br/>"
							}, function(){clearTimeout(this.freshPost);});
						}else if(data.code == 310){
							this.setState({
								result:0,
								msg:"，本次购票与其他订单行程冲突<br/>"
							}, function(){clearTimeout(this.freshPost);});
						}else if(data.code == 700){
							this.setState({
								result:0,
								msg:"，距离开车时间太近<br/>"
							}, function(){clearTimeout(this.freshPost);});
						}else if(data.code == 752){
							this.setState({
								result:0,
								msg:"，存在未完成订单<br/>"
							}, function(){clearTimeout(this.freshPost);});
						}else if(data.code == 307){
							this.setState({
								result:0,
								msg:"，当前提交订单用户过多<br/>"
							}, function(){clearTimeout(this.freshPost);});
						}else{
							this.setState({
								result:0,
								msg:"，"
							}, function(){clearTimeout(this.freshPost);});
						}
					}
				}
			}.bind(that));
			that.freshPost=setTimeout(function(){ticketPost()}, 5000);
		};
		ticketPost();
	},
	componentWillUnmount:function(){
		clearTimeout(this.count);
		clearTimeout(this.freshPost);
	},
	goDateFn:function(date){
		var goDate = date.split(" ")[0];
		var goDateArr = goDate.split("-");
		var newGoDate = parseInt(goDateArr[0])+"年"+parseInt(goDateArr[1])+"月"+parseInt(goDateArr[2])+"日";
		return newGoDate;
	},
	timeFn:function(time){
		var timeStr = time.split(" ")[1];
		var timeArr = timeStr.split(":")
		var newTimeStr = timeArr[0]+":"+timeArr[1];
		return newTimeStr
	},
	// 去支付
	toPayFn:function(){
		var requestHybrid = {
				tagname: 'forward',
				topage:'title',
				type:"native",
				item:"train",
				param: {
	            	typeId: "10119",
	            	orderId:this.state.orderId,
	            	payamount:this.state.payamount

	          }
			}
			var native_callback=function(data){

			}
			uddh5.bridge(native_callback,requestHybrid);
	},
	// 重新预定
	bookFn:function(){
		var requestHybrid = {
				tagname: 'forward',
				topage:'title',
				type:"native",
				item:"train",
				param: {
	            	typeId: "10178"
	          }
			}
			var native_callback=function(data){

			}
			uddh5.bridge(native_callback,requestHybrid);
	},
	// 倒计时
	fnTimeCountDown:function(d, o){
		var that=this;//this == ZhanZuo组件
		var f = {
			zero: function(n){
				var n = parseInt(n, 10);
				if(n > 0){
					if(n <= 9){
						n = "0" + n;	
					}
					return String(n);
				}else{
					return "00";	
				}
			},
			dv: function(d){
				var d = d || Date.UTC(2050, 0, 1);
				var future = new Date(d), now = new Date();
				var dur = Math.round((future.getTime() - now.getTime()) / 1000), pms = {
					sec: "00",
					mini: "00",
				};
				if(dur > 0){
					pms.sec = this.zero(dur % 60);
					pms.mini = Math.floor((dur / 60)) > 0? this.zero(Math.floor((dur / 60))) : "00";
				}
				return pms;
			},
			ui: function(){
				var _this=this;//this == f对象
				var pms=this.dv(d);
				if(o.sec){
					o.sec.innerHTML = pms.sec;
				}
				if(o.mini){
					o.mini.innerHTML = pms.mini;
				}
				that.count=setTimeout(function(){_this.ui.call(_this)}, 1000);//count 变为ZhanZuo组件的方法
				if(!parseInt(pms.sec, 10) && !parseInt(pms.mini, 10)){
					that.setState({
						result: 0
					});
					clearTimeout(that.count);
				}
			}
		};
		f.ui();
	},
	render:function() {
		return(
				<div className="zhanzuo">
					<div className={"loading"+((this.state.result==-1)?" "+"cur":"")}><em className="bg"></em><span className="tip_text">占座中...请稍等</span></div>
					<div className={"loading_success"+((this.state.result==1)?" "+"cur":"")}><i className="iconfont icon-xiao"></i>&nbsp;占座成功，请于<i id="minute"></i>分<i id="sec"></i>秒内完成支付</div>
					<div className={"loading_fail"+((this.state.result==0)?" "+"cur":"")}><i className="iconfont icon-ku"></i>&nbsp;占座失败<span dangerouslySetInnerHTML={{__html:this.state.msg}}></span>请重新预订或选择其他产品</div>
					<div className={"loading_timeout"+((this.state.result==2)?" "+"cur":"")}><i className="iconfont icon-ku"></i>&nbsp;您好，因目前抢票人数过多，占座较慢。我们系统将继续为您占座，并第一时间短信通知您占座信息。</div>
					<div className={(this.state.result==-1)?"friend_tip cur":"friend_tip"}>
						<div className="tip_cont">
							<label>友情提示：</label>
							<span className="tip">您可以先退出占座页面。我们系统会自动帮您占座，并第一时间通知您</span>
						</div>
					</div>
					<div className="station">
						<div className="train_number">
							<span className="time">{this.state.goDate}</span>
							<span className="num"> {this.state.trainNumber}</span>
						</div>
						<div className="train_station clearfix">
							<div className="station_info pull-left">
								<span className="station_name">{this.state.fromStation}</span>
								<span className="time">{this.state.goTime}</span>
							</div>
							<div className="mid">
								<span className="all_time">预计用时{this.state.runTime}</span>
								<span className="arrows"></span>
								<span><Link to={{ pathname:"/jingting" ,query:{trainCode: this.state.trainNumber, fromStationCode: this.state.fromStationCode, toStationCode: this.state.toStationCode, trainNumber: this.state.trainCode}}}>查看经停站</Link></span>
							</div>
							<div className="station_info pull-right">
								<span className="station_name">{this.state.toStation}</span>
								<span className="time">{this.state.arriveTime}</span>
							</div>
						</div>
						{(this.state.result!=0 && this.state.result!=1)?<Normal passengers={this.state.passengers} price={this.state.price} banquetName={this.state.banquetName}/>:''}
						{(this.state.result==0)?<Fail passengers={this.state.passengers} price={this.state.price} banquetName={this.state.banquetName}/>:''}
						{(this.state.result==1)?<Success user={this.state.user}/>:''}
						<div className={"pay_status clearfix"+((this.state.result==1)?" "+"cur":"")}>
							<span className="pull-left">待支付</span>
							<span className="pull-right"><strong>￥<i>{this.state.payamount}</i></strong></span>
						</div>
					</div>
					<div className={"btn"+((this.state.result==1)?" "+"cur":"")}><a href="javascript:;" onClick={this.toPayFn}>去支付</a></div>
					<div className={"btn"+((this.state.result==0)?" "+"cur":"")}><a href="javascript:;" onClick={this.bookFn}>重新预定</a></div>
					<div className={"btn"+((this.state.result==2)?" "+"cur":"")}><a href="javascript:;" onClick={this.bookFn}>返回</a></div>
				</div>
			)
	}
});
//抢座状态+抢票中和超时状态
var Normal = React.createClass({
	componentWillMount:function(){
		BaiduMobStat.onPageStart('Occupying-seat');
	},
	componentWillUnmount: function(){
        BaiduMobStat.onPageEnd('Occupying-seat');
    },
	render:function(){
		return(
				<ul className="buy_info">
					{
						$.map(this.props.passengers,function(elem,index){
							return(
									<li className="clearfix" key="index">
										<span className="pull-left">{elem}</span>
										<span className="pull-right">{this.props.banquetName} <strong>￥<i>{this.props.price}</i></strong></span>
									</li>
								)
						}.bind(this))
					}
				</ul>
			)
	}
});
// 抢座状态+失败状态
var Fail = React.createClass({
	componentWillMount:function(){
		BaiduMobStat.onPageStart('Block-failure');
	},
	componentWillUnmount: function(){
        BaiduMobStat.onPageEnd('Block-failure');
    },
	render:function(){
		return(
				<ul className="buy_info">
					{
						$.map(this.props.passengers,function(elem,index){
							return(
									<li className="clearfix" key="index">
										<span className="pull-left">{elem}</span>
										<span className="pull-right">{this.props.banquetName} <strong>￥<i>{this.props.price}</i></strong></span>
									</li>
								)
						}.bind(this))
					}
				</ul>
			)
	}
});
// // 抢座状态+失败状态
// var NormalOrFail = React.createClass({
// 	componentWillMount:function(){
// 		BaiduMobStat.onPageStart('Block-failure');
// 	},
// 	componentWillUnmount: function(){
//         BaiduMobStat.onPageEnd('Block-failure');
//     },
// 	render:function(){
// 		return(
// 				<ul className="buy_info">
// 					{
// 						$.map(this.props.passengers,function(elem,index){
// 							return(
// 									<li className="clearfix">
// 										<span className="pull-left">{elem}</span>
// 										<span className="pull-right">{this.props.banquetName} <strong>￥<i>{this.props.price}</i></strong></span>
// 									</li>		
// 								)
// 						}.bind(this))
// 					}
// 				</ul>
// 			)
// 	}
// });
// 抢座成功状态
var Success = React.createClass({
	componentWillMount:function(){
		BaiduMobStat.onPageStart('Block-success');
	},
	componentWillUnmount: function(){
        BaiduMobStat.onPageEnd('Block-success');
    },
	render:function(){
		return(
				<ul className="buy_info">
					{
						$.map(this.props.user,function(elem,index){
								var seatnumberStr  = elem.seatnumber.replace(",",'')
							return(
									<li className="clearfix">
										<span className="pull-left">{elem.passengername}</span>
										<span className="pull-right">{seatnumberStr}</span>
									</li>
								)
						})
					}
				</ul>
			)
	}
})
export default ZhanZuo;