import React from 'react'
import {Link} from 'react-router'
import uddh5 from '../../common/js/common.js'
import Alert from '../../common/ui/alert/alert.jsx'
require('../../common/ui/alert/alert.scss')
//火车票订单详情
var TrainDingdan = React.createClass({
	getInitialState:function(){
		return{
			orderTime:'',
			latestPaymentTime:'',
			payAmount:'',
			status:'',
			departureTime:'',
			arriveTime:'',
			fromStation:'',
			toStation:'',
			trainNumber:'',
			insuranceName:'',
			contactName:'',
			mobile:'',
			address:'',
			passengerName:'',
			carded:'',
			ticketAmount:'',
			reserveNum:'',
			insuranceAmount:'',
			expressAmount:'',
			expressName:'',
			list:'',
			orderId:'',
			messageShow:false,
			flage:false,
			delete:false,
		}
	},
	componentDidMount:function(){
		// http://127.0.0.1:8888/wode/#/trainDingdan/101903535573
		var orderId = uddh5.location.queryHash().split('/')[2];
		if(this.isMounted()){
			$.post(uddh5.apihost+'/getappcorpratetravelorderinfo',{orderId:orderId,orderType:114},function(data){
				//  数据请求回来以后  停止loading
		        var requestHybrid = {
		            tagname: 'forward',
		                topage:'detail',
		                type:"native",
		                item:'plane',
		                param: {
		                    typeId: "10181"
		                }
		          }
		        var native_callback=function(data){
		                  
		           }
		        uddh5.bridge(native_callback,requestHybrid);
				if(data.code == 1){
					var data = data.data;
					this.setState({
						orderTime:data.orderTime,
						latestPaymentTime:data.latestPaymentTime,
						payAmount:data.payAmount,
						status:data.status,
						departureTime:data.departureTime,
						arriveTime:data.arriveTime,
						fromStation:data.fromStation,
						toStation:data.toStation,
						trainNumber:data.trainNumber,
						insuranceName:data.insuranceName,
						contactName:data.contactName,
						mobile:data.mobile,
						address:data.address,
						passengerName:data.passengerName,
						carded:data.cardNo,
						ticketAmount:data.ticketAmount,
						reserveNum:data.reserveNum,
						insuranceAmount:data.insuranceAmount,
						expressAmount:data.expressAmount,
						expressName:data.expressName,
						list:data.orderPassengerList,
						orderId:data.orderId,
					});
				}	
			}.bind(this));
			//与App的交互
			var requestHybrid = {
				tagname: 'forward',
				topage: 'title',
				type:'native',
				item:'train',
				param: {
					typeId: 'c10158',
					title: '订单详情'
				}
			}
			var native_callback = function(){

			}
			uddh5.bridge(native_callback,requestHybrid)
		}				
	},
	//获取时间戳截取时+分
	getTime:function(date){ 
		var time = new Date(date);
		var hours=(time.getHours()<10?"0"+(time.getHours()):time.getHours());
		var mm = (time.getMinutes()<10?"0"+time.getMinutes():time.getMinutes());
     	return(
     		hours+":"+mm
     	)
	},
	//获取时间戳截取年+月+日
	getDate:function(date){ 
		var date = new Date(date);
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate()<10?"0"+date.getDate():date.getDate();
     	return(
     		y+"-"+m+"-"+d
     	)
	},
	//获取俩个时间戳截取差值
	timeDiff:function(data1,data2){
		var data3=(data2-data1)/(1000*3600);
		var hour=parseInt(data3);
		var yushu=data3-hour;
		var mm = (Math.round(yushu*60)<10?"0"+(Math.round(yushu*60)):Math.round(yushu*60));
     	return(
     		hour+"时"+mm+"分"
     	)
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
	// 取消订单的提示
	cancelTipFn:function(){
		this.setState({
			flage:true
		})
	},
	closeCancelTipFn:function(){
		this.setState({
			flage:false
		})
	},
	//删除订单的提示
	DeleteTipFn:function(){
		this.setState({
			delete:true
		})
	},
	closeDeleteTipFn:function(){
		this.setState({
			delete:false
		})
	},
	render:function(){
		return(
			<div className="trainDingdanye">
				<Zhifu address={this.state.address} mobile={this.state.mobile} contactName={this.state.contactName} list={this.state.list} expressAmount={this.state.expressAmount} insuranceAmount={this.state.insuranceAmount} reserveNum={this.state.reserveNum} status={this.state.status} departureTime={this.state.departureTime} payAmount={this.state.payAmount} orderTime={this.state.orderTime} latestPaymentTime={this.state.latestPaymentTime} getTime={this.getTime} getDate={this.getDate} orderId={this.state.orderId} closeAlert={this.closeAlert} openAlert={this.openAlert} cancelTipFn={this.cancelTipFn} DeleteTipFn={this.DeleteTipFn}/>
				<Lieci getTime={this.getTime} departureTime={this.state.departureTime} arriveTime={this.state.arriveTime} fromStation={this.state.fromStation} toStation={this.state.toStation} trainNumber={this.state.trainNumber} timeDiff={this.timeDiff} status={this.state.status}/>
				<NameDetail list={this.state.list} contactPhone={this.state.contactPhone}/>
				<Baoxian reserveNum={this.state.reserveNum} insuranceName={this.state.insuranceName} address={this.state.address} mobile={this.state.mobile} contactPhone={this.state.contactPhone} contactName={this.state.contactName} expressAmount={this.state.expressAmount} />
				{this.state.messageShow? <Alert textMessage={this.state.textMessage}/> : ''}
				{this.state.flage?<AlertQx openAlert={this.openAlert} closeCancelTipFn={this.closeCancelTipFn}/>:''}
				{this.state.delete?<AlertDelete openAlert={this.openAlert} closeDeleteTipFn={this.closeDeleteTipFn}/>:''}
			</div>
		)
	}
});

//订单——酒店、火车票、飞机票公用支付模块
var Zhifu = React.createClass({
	getInitialState:function(){
		return{
			 showModal: false
		}
	},
	//取消订单交互
	quXiaoFn:function(){
		this.props.cancelTipFn()
	},
	// 删除订单交互
	deleteFn:function(){
		this.props.DeleteTipFn()
	},
	//退票信息交互
	tuiPiaoFn:function(){
		var orderId = uddh5.location.queryHash().split('/')[2];
		var requestHybrid={
			tagname: 'forward',
			topage:'details',
			type:"native",
			param: {
				typeId: "10179",
				orderId: orderId,
				orderType: "114"
			}
		}
		var native_callback=function(data){
		}
		uddh5.bridge(native_callback,requestHybrid);
	},
	//支付信息交互
	togglePayNative: function(orderId){
		var orderId = uddh5.location.queryHash().split('/')[2]
		var requestHybrid={
			tagname: 'forward',
			topage:'details',
			type:"native",
			param: {
				typeId: "10119",
				orderId: orderId
			}
		}
		var native_callback=function(data){
		}
		uddh5.bridge(native_callback,requestHybrid);
	},
	showBtn: function(){
		var status=this.props.status;
		var latestPaymentTime=this.props.latestPaymentTime;
		var departureTime=this.props.departureTime;
		var isDelete = uddh5.location.queryKey("isDelete");
		if (status === 0){
			return(
				<div>
					{isDelete?<div>
						<div className="clearfix box">
							<div className="pull-left Dzhifu">待支付<i>请在{this.props.getTime(latestPaymentTime)}之前进行支付</i></div>
							<div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.payAmount}</strong><b className="iconfont icon-youyou"></b></div>
						</div>
						<div className="btn">
							<span className="btn-left"><i className="left-a" onClick={this.quXiaoFn}>取消订单</i></span>
							<span className="btn-right"><i className="right-a" onClick={this.togglePayNative}>支付</i></span>
						</div>
					</div>:<div>
						<div className="clearfix box">
							<div className="pull-left Dzhifu">占座中</div>
							<div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.payAmount}</strong><b className="iconfont icon-youyou"></b></div>
						</div>
					</div>}
				</div>
			)
		}else if(status === 1){
			return(
				<div>
					<div className="clearfix box">
						<div className="pull-left Dzhifu">待支付<i>请在{this.props.getTime(latestPaymentTime)}之前进行支付</i></div>
						<div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.payAmount}</strong><b className="iconfont icon-youyou"></b></div>
					</div>
					<div className="btn">
						<span className="btn-left"><i className="left-a" onClick={this.quXiaoFn}>取消订单</i></span>
						<span className="btn-right"><i className="right-a" onClick={this.togglePayNative}>支付</i></span>
					</div>
				</div>
			)
		}else if (status === 2){
			return(
					<div>
						<div className="clearfix box">
							<div className="pull-left Dzhifu">已取消</div>
							<div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.payAmount}</strong><b className="iconfont icon-youyou"></b></div>
						</div>
						{isDelete?<div className="btn">
							<i className="delete_dd" onClick={this.deleteFn}>删除</i>
						</div>:""}
					</div>
			)
		}else if (status === 3){
			return(
				<div>
					<div className="clearfix box">
						<div className="pull-left Dzhifu">出票中</div>
						<div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.payAmount}</strong><b className="iconfont icon-youyou"></b></div>
					</div>
				</div>
			)
		}else if (status === 4){
			return(
				<div>
					<div className="clearfix box">
						<div className="pull-left Dzhifu">已出票</div>
						<div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.payAmount}</strong><b className="iconfont icon-youyou"></b></div>
					</div>
					<div className="btn">
						<i className="delete_dd" onClick={this.tuiPiaoFn}>退票</i>
					</div>
				</div>
			)
		}else if (status === 5){
			return(
				<div>
					<div className="clearfix box">
						<div className="pull-left Dzhifu">退款中</div>
						<div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.payAmount}</strong><b className="iconfont icon-youyou"></b></div>
					</div>
				</div>
			)
		}else if (status === 6){
			return(
				<div>
					<div className="clearfix box">
						<div className="pull-left Dzhifu">退款失败</div>
						<div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.payAmount}</strong><b className="iconfont icon-youyou"></b></div>
					</div>
					<div className="btn">
						<i className="delete_dd" onClick={this.tuiPiaoFn}>退票</i>
					</div>
				</div>
			)
		}else if (status === 7){
			return(
				<div>
					<div className="clearfix box">
						<div className="pull-left Dzhifu">已退款</div>
						<div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.payAmount}</strong><b className="iconfont icon-youyou"></b></div>
					</div>
					{isDelete?<div className="btn">
							<i className="delete_dd" onClick={this.deleteFn}>删除</i>
						</div>:""}
				</div>
			)
		}else if (status === 8){
			return(
				<div>
					<div className="clearfix box">
						<div className="pull-left Dzhifu">已完成</div>
						<div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.payAmount}</strong><b className="iconfont icon-youyou"></b></div>
					</div>
					{isDelete?<div className="btn">
							<i className="delete_dd" onClick={this.deleteFn}>删除</i>
						</div>:""}
				</div>
			)
		}else if (status === 9){
			return(
				<div>
					<div className="clearfix box">
						<div className="pull-left Dzhifu">部分退票</div>
						<div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.payAmount}</strong><b className="iconfont icon-youyou"></b></div>
					</div>
					<div className="btn">
						<i className="delete_dd" onClick={this.tuiPiaoFn}>退票</i>
					</div>
				</div>
			)
		}
	},
	//打开费用说明弹框
	openFeiYong: function(e){
	  this.setState({
	    showModal: true
	  });
	},
	//关闭费用说明弹框
	closeFeiYong: function(e){
	  this.setState({
	    showModal: false
	  })
	},
	render:function(){
		return(
			<div className="zhifu">
				{this.showBtn()}
				<div className="clearfix bianhao">
					<div className="pull-left"><i>订单编号</i><span>{this.props.orderId}</span></div>
					<div className="pull-right"><i>预定时间</i><span>{this.props.orderTime?this.props.getDate(this.props.orderTime):''}</span></div>
				</div>
				{this.state.showModal? <PriceDetail reserveNum={this.state.reserveNum} list={this.props.list} address={this.props.address} expressAmount={this.props.expressAmount} insuranceAmount={this.props.insuranceAmount} mobile={this.props.mobile} reserveNum={this.props.reserveNum} closeFeiYong={this.closeFeiYong}/> : ''}
			</div>
		)
	}
});
// 费用明细弹框
var PriceDetail = React.createClass({
  render:function(){
  	var list = this.props.list;
  	var insuranceAmount=this.props.insuranceAmount;
  	var address=this.props.address;
  	var mobile=this.props.mobile;
    return(
      <div className="price_detail_cont">
        <div className="shade" onClick={this.props.closeFeiYong}></div>
        <div className="price_detail" ref="modalRoot">
          <h5 className="titel">订单总额明细</h5>
          <ul className="price_detail_list">
			{/*<li className="clearfix">
				<span className="pull-left">火车票</span>
				<span className="pull-right"><strong>￥{list.salePrice}</strong>x<em>{this.props.reserveNum}</em>/人</span>
			</li>*/}
			{
	          	$.map(list,function(elem,index){
	          		return (
							<li className="clearfix">
								<span className="pull-left">{(elem.ticketSeatNumber)?elem.ticketSeatNumber:"火车票票价"}</span>
								<span className="pull-right"><strong>￥{elem.salePrice}</strong>x<em>1</em>人</span>
							</li>
	          			)
	          	}.bind(this))
	        }
          	{
           		(insuranceAmount)?(<li className="clearfix"><span className="pull-left">保险费用</span><span className="pull-right"><strong>￥{this.props.insuranceAmount}</strong>x{this.props.reserveNum}份</span></li>):(" ")
			}
			{
           		(address && mobile)?(<li className="clearfix"><span className="pull-left">配送费用</span><span className="pull-right"><strong>￥7</strong></span><span></span></li>):(" ")
			}
			{
           		(address && mobile)?(<li className="clearfix"><span className="pull-left">铁路代售服务费</span><span className="pull-right"><strong>￥5*{this.props.reserveNum}</strong></span><span></span></li>):(" ")
			}
          </ul>
        </div>
      </div>
    )
  }
});
// 取消订单弹框
var AlertQx = React.createClass({
	cancelOrder:function(){
		var orderId = uddh5.location.queryHash().split('/')[2];
		$.post(uddh5.apihost+"/cancleappcorpratetravelorder",{orderId:orderId,orderType:114},function(data){
			if(data.code==1){
				var requestHybrid = {
						tagname: 'forward',
						topage:'title',
						type:"native",
						item:"plane",
						param: {
			            	typeId: "10180",
			            	orderType: "114",
			            	orderId: orderId
			          	}
					}
				var native_callback=function(data){

				}
				uddh5.bridge(native_callback,requestHybrid);
			}else{
				this.props.closeCancelTipFn();
				this.props.openAlert("订单取消失败");
			}
		}.bind(this))
	},
	closeCancelTipFn:function(){
		this.props.closeCancelTipFn();
	},
	render:function(){
		return(
			<div className="box_tip">
				<div className="alertQx">
					<p>确定取消订单？</p>
					<div className="clearfix btn">
						<a  className="btn-left left_a" href="javascript:void(0);" onClick={this.closeCancelTipFn}>取消</a>
						<a  className="btn-right right_a" href="javascript:void(0);" onClick={this.cancelOrder}>确定</a>
						<div className="line"></div>
					</div>
				</div>
			</div>
		);
	}
});
// 删除订单弹框
var AlertDelete = React.createClass({
	deletelOrder:function(){
		var orderId = uddh5.location.queryHash().split('/')[2];
		var userId = uddh5.getCookie("userId");
		$.post(uddh5.apihost+"/deleteapporder",{orderId:orderId,userId:userId},function(data){
			if(data.code==1){
				var requestHybrid = {
						tagname: 'forward',
						topage:'delete',
						type:"native",
						item:"train",
						param: {
							typeId:"10184",
			            	orderId: orderId
			          	}
					}
				var native_callback=function(data){

				}
				uddh5.bridge(native_callback,requestHybrid);
			}else{
				this.props.closeDeleteTipFn();
				this.props.openAlert("订单删除失败");
			}
		}.bind(this))
	},
	closeDeleteTipFn:function(){
		this.props.closeDeleteTipFn();
	},
	render:function(){
		return(
			<div className="box_tip">
				<div className="alertQx">
					<p>确定删除</p>
					<span className="delete_tip">删除后，您的订单无法查看，您是否确定删除？</span>
					<div className="clearfix btn">
						<a  className="btn-left left_a" href="javascript:void(0);" onClick={this.closeDeleteTipFn}>取消</a>
						<a  className="btn-right right_a" href="javascript:void(0);" onClick={this.deletelOrder}>确定</a>
						<div className="line"></div>
					</div>
				</div>
			</div>
		);
	}
});
//火车票——列次
var Lieci = React.createClass({
	render:function(){
		var departureTime=this.props.departureTime;
		var arriveTime=this.props.arriveTime;
		return(
			<div className="clearfix lieci">
				<div className="pull-left zhandian">
					<p>{this.props.fromStation}</p>
					<p>{departureTime?this.props.getTime(departureTime):''}</p>
				</div>
				<div className="time">
					<p>{this.props.trainNumber}</p>
					<p></p>
					<p>{arriveTime&&departureTime?this.props.timeDiff(departureTime,arriveTime):""}</p>
				</div>
				<div className="pull-right zhandian">
					<p>{this.props.toStation}</p>
					<p>{arriveTime?this.props.getTime(arriveTime):''}</p>
				</div>
			</div>
		)
	}
});
//火车票——乘客信息
var NameDetail = React.createClass({
	render:function(){
		var list = this.props.list;
		return(
			<div className="pid">
				{
					$.map(list,function(elem,index){
						if(elem.cardType==1){
							return(
								<div className="chengke" key={index}>
									<div className="zuowei">
										<span className="name ming">{elem.name}</span>
										<span className="name xibei">{elem.ticketSeatNumber}<i>￥</i><strong>{elem.salePrice}</strong></span>
									</div>
									<div className="nameDetail">
										<div className="idCard cardNo">身份证<b>{elem.cardNo}</b></div>
										{(elem.mobile)?<div className="idCard">电话号<b>{elem.mobile}</b></div>:" "}
									</div>
								</div>
							)
						}else if(elem.cardType==2){
							return(
								<div className="chengke" key={index}>
									<div className="zuowei">
										<span className="name ming">{elem.name}</span>
										<span className="name xibei">{elem.ticketSeatNumber}<i>￥</i><strong>{elem.salePrice}</strong></span>
									</div>
									<div className="nameDetail">
										<div className="idCard cardNo">护照<b>{elem.cardNo}</b></div>
										{(elem.mobile)?<div className="idCard">电话号<b>{elem.mobile}</b></div>:" "}
									</div>
								</div>
							)
						}else if(elem.cardType==5){
							return(
								<div className="chengke" key={index}>
									<div className="zuowei">
										<span className="name ming">{elem.name}</span>
										<span className="name xibei">{elem.ticketSeatNumber}<i>￥</i><strong>{elem.salePrice}</strong></span>
									</div>
									<div className="nameDetail">
										<div className="idCard cardNo">台湾通行证<b>{elem.cardNo}</b></div>
										{(elem.mobile)?<div className="idCard">电话号<b>{elem.mobile}</b></div>:" "}
									</div>
								</div>
							)
						}else if(elem.cardType==6){
							return(
								<div className="chengke" key={index}>
									<div className="zuowei">
										<span className="name ming">{elem.name}</span>
										<span className="name xibei">{elem.ticketSeatNumber}<i>￥</i><strong>{elem.salePrice}</strong></span>
									</div>
									<div className="nameDetail">
										<div className="idCard cardNo">港澳通行证<b>{elem.cardNo}</b></div>
										{(elem.mobile)?<div className="idCard">电话号<b>{elem.mobile}</b></div>:" "}
									</div>
								</div>
							)
						}
					}.bind(this))
				}
			</div>
		)
	}
});
//飞机票、火车票——快递、保险、报销
var Baoxian = React.createClass({
	render:function(){
		var insuranceName=this.props.insuranceName;
		var contactName=this.props.contactName;
		var address=this.props.address;
		// var mobile=this.props.mobile.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");
		return(
			<div className="baoxian">
				<div className="leixing">
					<h3>保险品种</h3>
					{
						(insuranceName)?(<div className="yanwu">{insuranceName}x<b>{this.props.reserveNum}</b></div>):(<div className="yanwu">无</div>)
					}
				</div>
				<div className="baoxiao">
					<h3>配送信息</h3>
					{
						(address && (this.props.mobile))?(<div className="kuaidi"><div className="address">{contactName}<b>{this.props.mobile}</b></div><div className="address">{address}</div></div>):(<div className="kuaidi"><div className="address"><span className="not">无</span></div></div>)
					}
				</div>
			</div>
		)
	}
});
export default TrainDingdan