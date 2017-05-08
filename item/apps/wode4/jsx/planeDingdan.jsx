import React from 'react'
import {Link} from 'react-router'
import uddh5 from '../../common/js/common.js'
import Alert from '../../common/ui/alert/alert.jsx'
require('../../common/ui/alert/alert.scss')
//飞机票订单
var PlaneDingdan = React.createClass({
	getInitialState:function(){
		return{
			status:"",
			statusStr:"",
			latestpaymenttime:"",
			sumOrderAmount:"",
			insuranceList:[],
			invoice:{},
			touristList:[],
			id:"",
			ordertime:"",
			flightRangetype:"",
			fromdate:'',
			fromcity:"",
			fromtower:"",
			fromdateTime:"",
			todate:"",
			tocity:"",
			totower:"",
			todateTime:"",
			planeModel:"",
			flightNo:"",
			cabinRank:"",
			detailAmountList:[],
			detailAmountOtherList:[],
			messageShow:false,
			flage:false,
			stopCity: "",
			isStop: "",
			delete:false
		}
	},
	componentDidMount:function(){
		var orderId = uddh5.location.queryHash().split('/')[2];
		if(this.isMounted()){
			$.post(uddh5.apihost+'/getappcorpratetravelorderinfo',{orderId:orderId,orderType:115},function(data){
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
						status:data.status,
						statusStr:data.statusStr,
						latestpaymenttime:data.latestpaymenttime,
						sumOrderAmount:data.sumOrderAmount,
						insuranceList:data.insuranceList,
						invoice:data.invoice,
						touristList:data.touristList,
						id:data.id,
						ordertime:data.ordertime,
						flightRangetype:data.flightRangetype,
						fromdate:data.fromdate,
						fromcity:data.fromcity,
						fromtower:data.fromtower,
						fromdateTime:data.fromdateTime,
						todate:data.todate,
						tocity:data.tocity,
						totower:data.totower,
						todateTime:data.todateTime,
						planeModel:data.planeModel,
						flightNo:data.flightNo,
						cabinRank:data.cabinRank,
						detailAmountList:data.detailAmountList,
						detailAmountOtherList:data.detailAmountOtherList,
                        stopCity: data.stopCity == undefined? "" : data.stopCity,
                        isStop: data.isStop == undefined? "-1" : data.isStop
					})
				}
			}.bind(this))
			// 与app的交互
			var requestHybrid = {
				tagname: 'forward',
				topage: 'title',
				type:'native',
				item:'plane',
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
			<div className="planeDingdanye">
				<Zhifu status={this.state.status} statusStr={this.state.statusStr} sumOrderAmount={this.state.sumOrderAmount} openFeiYong={this.openFeiYong} id={this.state.id} ordertime={this.state.ordertime} closeAlert={this.closeAlert} openAlert={this.openAlert} latestpaymenttime={this.state.latestpaymenttime} cancelTipFn={this.cancelTipFn} DeleteTipFn={this.DeleteTipFn}/>
				<Qucheng flightRangetype={this.state.flightRangetype} fromdate={this.state.fromdate} fromcity={this.state.fromcity} fromtower={this.state.fromtower} fromdateTime={this.state.fromdateTime} todate={this.state.todate} tocity={this.state.tocity} totower={this.state.totower} todateTime={this.state.todateTime} planeModel={this.state.planeModel} flightNo={this.state.flightNo} cabinRank={this.state.cabinRank} isStop={this.state.isStop} stopCity={this.state.stopCity}/>
				<Chengke touristList={this.state.touristList}/>
				<Baoxian insuranceList={this.state.insuranceList} invoice={this.state.invoice} ordertime={this.state.ordertime} status={this.state.status}/>
				{this.state.showModal? <PriceDetail closeFeiYong={this.closeFeiYong} detailAmountList={this.state.detailAmountList} detailAmountOtherList={this.state.detailAmountOtherList}/> : ''}
				{this.state.messageShow? <Alert textMessage={this.state.textMessage}/> : ''}
				{this.state.flage?<AlertQx openAlert={this.openAlert} closeCancelTipFn={this.closeCancelTipFn}/>:''}
				{this.state.delete?<AlertDelete openAlert={this.openAlert} closeDeleteTipFn={this.closeDeleteTipFn}/>:''}
			</div>
		)
	}
});
//订单——酒店、火车票、飞机票公用支付模块
var Zhifu = React.createClass({
	handleClick:function(){
		this.props.openFeiYong()
	},
	// 去支付
	toPayFn:function(){
		var orderId = uddh5.location.queryHash().split('/')[2];
		var requestHybrid = {
				tagname: 'forward',
				topage:'title',
				type:"native",
				item:"plane",
				param: {
	            	typeId: "10119",
	            	orderId: orderId
	          	}
			}
			var native_callback=function(data){

			}
			uddh5.bridge(native_callback,requestHybrid);
	},
	// 取消订单
	cancelOrder:function(){
		this.props.cancelTipFn()
	},
		// 删除订单交互
	deleteFn:function(){
		this.props.DeleteTipFn()
	},
	// 退票
	tuiPiaoFn:function(){
		var orderId = uddh5.location.queryHash().split('/')[2];
		var requestHybrid = {
				tagname: 'forward',
				topage:'title',
				type:"native",
				item:"plane",
				param: {
	            	typeId: "10179",
	            	orderType: "115",
	            	orderId: orderId
	          	}
			}
			var native_callback=function(data){

			}
			uddh5.bridge(native_callback,requestHybrid);
	},
	statusStrFn:function(){
		var isDelete = uddh5.location.queryKey("isDelete");
		if(this.props.status===0){
			return(
					<div>
						<div className="clearfix box">
							<div className="pull-left Dzhifu">待确认</div>
							<div className="pull-right price" onClick={this.handleClick}>￥<strong>{this.props.sumOrderAmount}</strong><b className="iconfont icon-youyou"></b></div>
						</div>
					</div>
				)
		}else if(this.props.status===1){
			return(
					<div>
						<div className="clearfix box">
							<div className="clearfix box">
								<div className="pull-left Dzhifu">待支付<i>请在{this.props.latestpaymenttime}之前进行支付</i></div>
								<div className="pull-right price" onClick={this.handleClick}>￥<strong>{this.props.sumOrderAmount}</strong><b className="iconfont icon-youyou"></b></div>
							</div>
							<div className="btn">
								<span className="btn-left">
									<i className="left-a" onClick={this.cancelOrder}>取消订单</i>
								</span>
								<span className="btn-right">
									<i className="right-a" onClick={this.toPayFn}>去支付</i>
								</span>
							</div>
						</div>
					</div>
				)
		}else if(this.props.status===2){
			return(
					<div>
						<div className="clearfix box">
							<div className="pull-left Dzhifu">已取消</div>
							<div className="pull-right price" onClick={this.handleClick}>￥<strong>{this.props.sumOrderAmount}</strong><b className="iconfont icon-youyou"></b></div>
						</div>
						{isDelete?<div className="clearfix box">
							<div className="btn">
								<i className="delete_dd" onClick={this.deleteFn}>删除</i>
							</div>
						</div>:""}
					</div>
				)
		}else if(this.props.status===3){
			return(
					<div>
						<div className="clearfix box">
							<div className="pull-left Dzhifu">出票中</div>
							<div className="pull-right price" onClick={this.handleClick}>￥<strong>{this.props.sumOrderAmount}</strong><b className="iconfont icon-youyou"></b></div>
						</div>
					</div>
				)
		}else if(this.props.status===4){
				return (
						<div>
							<div className="clearfix box">
								<div className="clearfix box">
									<div className="pull-left Dzhifu">已出票</div>
									<div className="pull-right price" onClick={this.handleClick}>￥<strong>{this.props.sumOrderAmount}</strong><b className="iconfont icon-youyou"></b></div>
								</div>
								<div className="btn">
									<span className="btn-left">
										<a href="tel:4009906000" className="left-a">改签</a>
									</span>
									<span className="btn-right">
										<i className="right-a" onClick={this.tuiPiaoFn}>退票</i>
									</span>
								</div>
							</div>
						</div>
					)
		}else if(this.props.status===5){
			return (
					<div>
						<div className="clearfix box">
							<div className="pull-left Dzhifu">退款中</div>
							<div className="pull-right price" onClick={this.handleClick}>￥<strong>{this.props.sumOrderAmount}</strong><b className="iconfont icon-youyou"></b></div>
						</div>
					</div>
				)
		}else if(this.props.status===6){
			return (
					<div>
						<div className="clearfix box">
							<div className="clearfix box">
								<div className="pull-left Dzhifu">退款失败</div>
								<div className="pull-right price" onClick={this.handleClick}>￥<strong>{this.props.sumOrderAmount}</strong><b className="iconfont icon-youyou"></b></div>
							</div>
							<div className="btn">
								<span className="btn-left">
									<a href="tel:4009906000" className="left-a">改签</a>
								</span>
								<span className="btn-right">
									<i className="right-a" onClick={this.tuiPiaoFn}>退票</i>
								</span>
							</div>
						</div>
					</div>
				)
		}else if(this.props.status===7){
			return (
					<div>
						<div className="clearfix box">
							<div className="pull-left Dzhifu">已退款</div>
							<div className="pull-right price" onClick={this.handleClick}>￥<strong>{this.props.sumOrderAmount}</strong><b className="iconfont icon-youyou"></b></div>
						</div>
						{isDelete?<div className="clearfix box">
							<div className="btn">
								<i className="delete_dd" onClick={this.deleteFn}>删除</i>
							</div>
						</div>:""}
					</div>
				)
		}else if(this.props.status===8){
			return (
					<div>
						<div className="clearfix box">
							<div className="pull-left Dzhifu">已完成</div>
							<div className="pull-right price" onClick={this.handleClick}>￥<strong>{this.props.sumOrderAmount}</strong><b className="iconfont icon-youyou"></b></div>
						</div>
						{isDelete?<div className="clearfix box">
							<div className="btn">
								<i className="delete_dd" onClick={this.deleteFn}>删除</i>
							</div>
						</div>:""}
					</div>
				)
		}else if(this.props.status===9){
			return (
					<div>
						<div className="clearfix box">
							<div className="clearfix box">
								<div className="pull-left Dzhifu">部分退票</div>
								<div className="pull-right price" onClick={this.handleClick}>￥<strong>{this.props.sumOrderAmount}</strong><b className="iconfont icon-youyou"></b></div>
							</div>
							<div className="btn">
								<span className="btn-left">
									<a href="tel:4009906000" className="left-a">改签</a>
								</span>
								<span className="btn-right">
									<i className="right-a" onClick={this.tuiPiaoFn}>退票</i>
								</span>
							</div>
						</div>
					</div>
				)
		}
	},
	render:function(){
		return(
			<div className="zhifu">
				{this.statusStrFn()}
				<div className="clearfix bianhao">
					<div className="pull-left"><i>订单编号</i><span>{this.props.id}</span></div>
					<div className="pull-right"><i>预定时间</i><span>{this.props.ordertime}</span></div>
				</div>
			</div>
		)
	}
});
//飞机票——去程
var Qucheng = React.createClass({
	dateFn:function(date){
		var arr = date.split("-");
		return arr[1]+"月"+arr[2]+"日";
	},
	// 出发时间和到达时间时间戳获取
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
  	// 计算到达时间和出发时间时间差
  	timeDiff:function(start,end){
	  	var timeDif = (end-start)/(1000*3600),
	  	hour = parseInt(timeDif),
	  	yushu = timeDif-hour,
	  	minute = Math.round(yushu*60)
	  	return (hour+"时"+minute+"分")
  	},
	render:function(){
		var fromdate = this.props.fromdate;
		var todate = this.props.todate;
		var plane=require('../img/plane.png');
		var getFromTime = this.TimeFn(fromdate,this.props.fromdateTime);
		var getToTime = this.TimeFn(todate,this.props.todateTime);
		return(
			<div className="qucheng">
				<div className="qc-feiji">
					<strong>{this.props.flightRangetype}</strong>
					<span>{this.props.flightNo} {this.props.planeModel} {this.props.cabinRank}</span>
				</div>
				<div className="clearfix qc-jichang">
					<div className="pull-left jichang">
						<p>{(fromdate=="")?fromdate:this.dateFn(fromdate)}</p>
						<p>{this.props.fromcity+((this.props.fromtower=="--"||this.props.fromtower=="")?"":" "+this.props.fromtower)}</p>
						<p>{this.props.fromdateTime}</p>
					</div>
					<div className="mid">
						<span className="all_time">{this.timeDiff(getFromTime,getToTime)}</span>
						<span className="arrows">
							<img src={plane} alt=""/>
							<span className={parseInt(this.props.isStop) === 1? "station cur" : "station"}>经停</span>
						</span>
						<span className={parseInt(this.props.isStop) === 1? "station_city cur" : "station_city"}>{this.props.stopCity}</span>
					</div>
					<div className="pull-right jichang">
						<p>{(todate=="")?todate:this.dateFn(todate)}</p>
						<p>{this.props.tocity+((this.props.totower=="--"||this.props.totower==""||this.props.totower==null)?"":" "+this.props.totower)}</p>
						<p>{this.props.todateTime}</p>
					</div>
				</div>
			</div>
		)
	}
});
//飞机票——乘机人
var Chengke = React.createClass({
	render:function(){
		return(
			<div className="chengke">
				<h3>乘机人</h3>
				{
					$.map(this.props.touristList,function(elem,index){
						return(
								<dl>
									<dt>{elem.touristname}</dt>
									<dd>{elem.cardTypeName} {elem.cardno}</dd>
									<dd>手机号 {elem.touristmobile}</dd>
								</dl>	
							)
					}.bind(this))
				}
			</div>
		)
	}
});
//飞机票、火车票——保险、报销
var Baoxian = React.createClass({
	applyInvoice: function(){
		var requestHybrid={
			tagname: 'forward',
			topage:'order',
			type:"native",
			item:'plane',
			param: {
				typeId: "10185",
				orderId: uddh5.location.queryHash().split("/")[2],
				invoiceSource: 2 //1=酒店, 2=飞机
			}
		}
		var native_callback=function(data){
		}
		uddh5.bridge(native_callback,requestHybrid);
	},
	gitDiffDay:function(ordertime){
		var newDate = uddh5.date.getDate(new Date());
		var deffday = uddh5.date.gitDiffDay(ordertime,newDate);
		return deffday;
	},
	// 去支付
	toPayFn:function(){
		var orderId = uddh5.location.queryHash().split('/')[2];
		var requestHybrid = {
				tagname: 'forward',
				topage:'title',
				type:"native",
				item:"plane",
				param: {
	            	typeId: "10119",
	            	orderId: orderId
	          	}
			}
			var native_callback=function(data){

			}
			uddh5.bridge(native_callback,requestHybrid);
	},
	render:function(){
		var invoice = this.props.invoice;
		var insuranceList = this.props.insuranceList;
		var deffday = this.gitDiffDay(this.props.ordertime);
		var status = this.props.status;
		return(
			<div className="baoxian">
				<div className="leixing">
					<h3>保险品种</h3>
					<ul>
						{
							$.map(insuranceList,function(elem,index){
								return (
										<li className="yanwu">
											<span>{elem.productName}x{elem.productNumber}</span>
										</li>	
									)
							})
						}
						<li className={"empty"+((insuranceList.length>0)?"":" "+"cur")}>
							<span>无</span>
						</li>
					</ul>
				</div>
				{uddh5.getCookie("isPublic")==1?<div className="baoxiao">
					<h3>报销凭证</h3>
					{
						(invoice.invoiceTitle==""||invoice.invoiceTitle==null)?(<dl className="empty">
						<dt>无</dt>
						</dl>):(<dl>
							<dt>{invoice.invoiceTitle}</dt>
							<dd>{invoice.contactName} {invoice.mobile}</dd>
							<dd>{invoice.address}</dd>
						</dl>)
					}
				</div>:null}
				{uddh5.getCookie("isPublic")==0&&status!=1&&status!=2&&status!=5&&status!=6&&status!=7?<div className="invoice">
						<div className="clearfix invoice-header">
							<div className="pull-left title">发票信息</div>
							{invoice.invoiceStatus==-2&&deffday<=90?<div className="pull-right action-btn" onClick={this.applyInvoice}>申请发票</div>:null}
							{invoice.invoiceStatus!=-2&&invoice.invoiceStatus!=3?<div className="pull-right action-btn cur">已申请</div>:null}
							{invoice.invoiceStatus==3?<div className="pull-right action-btn" onClick={this.toPayFn}>去支付</div>:null}
						</div>
						{(invoice.invoiceStatus==-2)?<div className="invoice-body"><p>能申请3个月之内的订单</p></div>:<div className="invoiceDetail">
							<p>{invoice.invoiceType==2?"普通发票":invoice.invoiceType==4?"专用发票":invoice.invoiceType==5?"电子行程单":''}</p>
							{(invoice.invoiceTitle==""||invoice.invoiceTitle==null)?null:<p>{invoice.invoiceTitle}</p>}
							<p>{invoice.contactName}<span className="phone">{invoice.mobile}</span></p>
							<p>{invoice.address}</p>
						</div>}
					</div>:null}
			</div>
		)
	}
});

// 费用明细弹框
var PriceDetail = React.createClass({
  render:function(){
    return(
      <div className="price_detail_cont">
        <div className="shade" onClick={this.props.closeFeiYong}></div>
        <div className="price_detail" ref="modalRoot">
          <h5 className="titel">订单总额明细</h5>
          <ul className="price_detail_list">
          {
          	$.map(this.props.detailAmountList,function(elem,index){
          		return (
						<li className="clearfix">
							<span className="pull-left">{elem.typename}</span>
							<span className="pull-right"><strong>￥{elem.typevalue.split("X")[0]}</strong>x<em>{elem.typevalue.split("X")[1]}人</em></span>
						</li>
          			)
          	}.bind(this))
          }
          </ul>
          <ul className="price_detail_list">
          {
          	$.map(this.props.detailAmountOtherList,function(elem,index){
          		return (
						<li className="clearfix">
							<span className="pull-left">{elem.typename}</span>
							{$.trim(elem.typename)!="发票服务费"?<span className="pull-right"><strong>￥{elem.typevalue.split("X")[0]}</strong>x<em>{elem.typevalue.split("X")[1]}份</em></span>:<span className="pull-right"><strong>￥{elem.typevalue}</strong></span>}
						</li>
          			)
          	}.bind(this))
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
		$.post(uddh5.apihost+"/cancleappcorpratetravelorder",{orderId:orderId,orderType:115},function(data){
			if(data.code==1){
				var requestHybrid = {
						tagname: 'forward',
						topage:'title',
						type:"native",
						item:"train",
						param: {
			            	typeId: "10180",
			            	orderType: "115",
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
						item:"plane",
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
export default PlaneDingdan