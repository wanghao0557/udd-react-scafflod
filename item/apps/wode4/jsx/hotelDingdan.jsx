import React from 'react'
import {Link} from 'react-router'
import uddh5 from '../../common/js/common.js'
import Alert from '../../common/ui/alert/alert.jsx'
require('../../common/ui/alert/alert.scss')
import Debug from '../../common/ui/debug/debug.jsx'
require('../../common/ui/debug/debug.scss')
//酒店订单
var HotelDingdan = React.createClass({
	getInitialState: function(){
		return{
			orderId:'',
			status:'',
			orderPrice:'',
			addTime:'',
			productId:'',
			resourceId:'',
			productName:'',
			hotelId:'',
			hotelDetailAddress:'',
			hotelPhone:'',
			hotelRoomName:'',
			hotelRommId:'',
			bedType:'',
			checkinDate:'',
			checkoutDate:'',
			breakfast:'',
			wifi:'',
			passengerName:'',
			checkinTime:'',
			longitude:'',
			latitude:'',
			messageShow:false,
			flage:false,
			delete:false,
			elonghotels: {},
			paymenttype:'',
			invoiceType:'',
			invoiceTitle:'',
			invoiceContent:'',
			invoiceMoney:'',
			remark:'',
			applyUser:'',
			taxpayerNumber:'',
			registerAddress:'',
			companyPhone:'',
			openBank:'',
			bankAccount:'',
			invoiceEmail:'',
			exprressTitle:'',
			expressAmount:'',
			expressContactName:'',
			expressMobile:'',
			expressAddress:'',
			isOrderInvoiceExist:"",
			appOrderInvoice:{},
			orderExpress:{},
			toDanBao:false,
			cancelDanBao:false,
			roomRate:"",
			invoicePostage:"",
			resourceType:'',
			elongroomId:''
		}
	},
	componentDidMount: function(){
		var id = uddh5.location.queryHash().split('/')[2];
		$.post(uddh5.apihost+'/getappcorpratetravelorderinfo', {orderId: id,orderType:105}, function(data){
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
				var data=data.data;
				this.setState({
					orderId:data.orderId,
					status:data.orderStatus,
					orderPrice:data.orderPrice,
					addTime:data.addTime,
					productId:data.productId,
					resourceId:data.resourceId,
					productName:data.productName,
					hotelId:data.hotelId,
					hotelDetailAddress:data.hotelDetailAddress,
					hotelPhone:data.hotelPhone,
					hotelRoomName:data.hotelRoomName,
					hotelRommId:data.hotelRommId,
					bedType:data.bedType,
					checkinDate:data.checkinDate,
					checkoutDate:data.checkoutDate,
					breakfast:data.breakfast,
					wifi:data.wifi,
					passengerName:data.passengerName,
					checkinTime:data.checkinTime,
					longitude:data.longitude,
					latitude:data.latitude,
					paymenttype:data.paymenttype,
					elonghotels: {
						productType:data.productType || 1, 
						elonghotelId: data.elonghotelId || '0', 
						elonghotelCode: data.elonghotelCode || '0', 
						elongroomTypeId: data.elongroomtypeId || '0', 
						elongproductId: data.elongproductId || '0'
					},
					invoiceType:data.invoiceType,
					invoiceTitle:data.invoiceTitle,
					invoiceContent:data.invoiceContent,
					invoiceMoney:data.invoiceMoney,
					remark:data.remark,
					applyUser:data.applyUser,
					taxpayerNumber:data.taxpayerNumber,
					registerAddress:data.registerAddress,
					companyPhone:data.companyPhone,
					openBank:data.openBank,
					bankAccount:data.bankAccount,
					invoiceEmail:data.invoiceEmail,
					exprressTitle:data.exprressTitle,
					expressAmount:data.expressAmount,
					expressContactName:data.expressContactName,
					expressMobile:data.expressMobile,
					expressAddress:data.expressAddress,
					isOrderInvoiceExist:data.isOrderInvoiceExist,
					appOrderInvoice:data.appOrderInvoice,
					orderExpress:!!data.appOrderInvoice? data.appOrderInvoice.orderExpress : '',
					isCancel: data.isCancel,
					isinvoices: data.isinvoices,
					roomRate:data.roomRate,
					invoicePostage:data.invoicePostage,
					prices: data.prices,
					guaranteefundAmount: data.guaranteefundAmount,
					resourceType:data.resourceType,
					elongroomId:data.elongroomId
				});
			}
		}.bind(this));
		//与app的交互
	    var requestHybrid={
	       tagname: 'forward',
	       topage:'orderdetail',
	       type:"native",
	       param: {
	           typeId: "c10158",
	           title:"订单详情"
	       }
	    }
	    var native_callback=function(data){
	          
	    }
	    uddh5.bridge(native_callback,requestHybrid);
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
	// 去担保的提示
	toDanaoFn:function(){
		this.setState({
			toDanBao:true
		})
	},
	closeToDanBaoFn:function(){
		this.setState({
			toDanBao:false
		})
	},
	// 取消担保的提示
	cancelDanaoFn:function(text){
		this.setState({
			cancelDanBao:true,
			text: text
		})
	},
	closeCancelDanBaoFn:function(){
		this.setState({
			cancelDanBao:false
		})
	},
	render:function(){
		return(
			<div className="hotelDingdanye">
				<Zhifu roomRate={this.state.roomRate} invoicePostage={this.state.invoicePostage} paymenttype={this.state.paymenttype} status={this.state.status} orderId={this.state.orderId} orderPrice={this.state.orderPrice} addTime={this.state.addTime} passengerName={this.state.passengerName} checkinDate={this.state.checkinDate} checkoutDate={this.state.checkoutDate} cancelTipFn={this.cancelTipFn}  DeleteTipFn={this.DeleteTipFn} toDanaoFn={this.toDanaoFn} cancelDanaoFn={this.cancelDanaoFn} elonghotels={this.state.elonghotels} prices={this.state.prices} guaranteefundAmount={this.state.guaranteefundAmount}/>
				<ProductName elongroomId={this.state.elongroomId} resourceType={this.state.resourceType} productName={this.state.productName} hotelDetailAddress={this.state.hotelDetailAddress} hotelPhone={this.state.hotelPhone} hotelRoomName={this.state.hotelRoomName} hotelRoomName={this.state.hotelRoomName} checkinDate={this.state.checkinDate} checkoutDate={this.state.checkoutDate} breakfast={this.state.breakfast} wifi={this.state.wifi} passengerName={this.state.passengerName} checkinTime={this.state.checkinTime} longitude={this.state.longitude} latitude={this.state.latitude} hotelId={this.state.hotelId} productId={this.state.productId} resourceId={this.state.resourceId} bedType={this.state.bedType} orderPrice={this.state.orderPrice} elonghotels={this.state.elonghotels} paymenttype={this.state.paymenttype} invoiceType={this.state.invoiceType} invoiceTitle={this.state.invoiceTitle} invoiceContent={this.state.invoiceContent} invoiceMoney={this.state.invoiceMoney} remark={this.state.remark} applyUser={this.state.applyUser} taxpayerNumber={this.state.taxpayerNumber} registerAddress={this.state.registerAddress} companyPhone={this.state.companyPhone} openBank={this.state.openBank} bankAccount={this.state.bankAccount} invoiceEmail={this.state.invoiceEmail} exprressTitle={this.state.exprressTitle} expressAmount={this.state.expressAmount} expressContactName={this.state.expressContactName} expressMobile={this.state.expressMobile} expressAddress={this.state.expressAddress} isOrderInvoiceExist={this.state.isOrderInvoiceExist} appOrderInvoice={this.state.appOrderInvoice} orderExpress={this.state.orderExpress} status={this.state.status} isCancel={this.state.isCancel} isinvoices={this.state.isinvoices}/>
				{this.state.messageShow? <Alert textMessage={this.state.textMessage} /> : ''}
				{this.state.flage?<AlertQx openAlert={this.openAlert} closeCancelTipFn={this.closeCancelTipFn}/>:''}
				{this.state.delete?<AlertDelete openAlert={this.openAlert} closeDeleteTipFn={this.closeDeleteTipFn}/>:''}
				{this.state.toDanBao?<ToDanBao openAlert={this.openAlert} closeToDanBaoFn={this.closeToDanBaoFn} orderId={this.state.orderId} productId={this.state.productId}/> :''}
				{this.state.cancelDanBao?<CancelDanBao openAlert={this.openAlert} closeCancelDanBaoFn={this.closeCancelDanBaoFn} orderId={this.state.orderId} paymenttype={this.state.paymenttype} text={this.state.text}/>:''}
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
	// 取消订单
	cancelOrder:function(){
		this.props.cancelTipFn()
	},
	// 取消担保
	cancelDanBaoF:function(text){
		this.props.cancelDanaoFn(text)
	},
	// 去担保
	toDanBaoF:function(){
		this.props.toDanaoFn()
	},
	// 删除订单交互
	deleteFn:function(){
		this.props.DeleteTipFn()
	},
	togglePayNative: function(orderId){
		//与app的交互支付
		var requestHybrid={
			tagname: 'forward',
			topage:'order',
			type:"native",
			param: {
				typeId: "10119",
				orderId: uddh5.location.queryHash().split('/')[2]
			}
		}
		var native_callback=function(data){
		}
		uddh5.bridge(native_callback,requestHybrid);
	},
	showBtn: function(){
        var status=this.props.status;
        var paymenttype=this.props.paymenttype;
        // var status = 0;
        // var paymenttype = "2";
        var isDelete = uddh5.location.queryKey("isDelete");
		if(paymenttype == 1){
			if (status == 1){
	            return(
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">待支付</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
	                    <div className="btn">
	                        <span className="btn-left"><a href="javascript:;" className="left-a" onClick={this.cancelOrder}>取消订单</a></span>
	                        <span className="btn-right"><a href="javascript:;" className="right-a" onClick={this.togglePayNative}>去支付</a></span>
	                    </div>
	                </div>
	            )
	        }else if(status == 2){
	            return(
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">已取消</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
	                    {isDelete?<div className="btn">
							<i className="delete_dd" onClick={this.deleteFn}>删除</i>
						</div>:""}
	                </div>
	            )
	        }else if(status == 3){
	            return (
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">确认中</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
						<div className="delete-btn">
						    {this.props.elonghotels.productType == 3? <a href="javascript:;" className="cancel_btn delete" onClick={this.cancelDanBaoF.bind(this, '申请退款')}>申请退款</a>: <a href="tel:4009906000" className="cancel_btn delete">申请退款</a>}
						</div>
	                </div>
	            )
	        }else if(status == 4){
	            return (
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">已确认</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
	                    <div className="delete-btn">
	                        {this.props.elonghotels.productType == 3? <a href="javascript:;" className="cancel_btn delete" onClick={this.cancelDanBaoF.bind(this, '申请退款')}>申请退款</a>: <a href="tel:4009906000" className="cancel_btn delete">申请退款</a>}
	                    </div>
	                </div>
	            )
	        }else if(status == 6){
	            return (
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">退款失败</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
	                    {this.props.elonghotels.productType == 3? <a href="javascript:;" className="cancel_btn delete" onClick={this.cancelDanBaoF.bind(this, '申请退款')}>申请退款</a>: <a href="tel:4009906000" className="cancel_btn delete">申请退款</a>}
	                </div>
	            )
	        }else if(status == 7){
	            return (
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">已退款</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
	                    {isDelete?<div className="btn">
							<i className="delete_dd" onClick={this.deleteFn}>删除</i>
						</div>:""}
	                </div>
	            )
	        }else if(status == 5){
	            return (
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">退款中</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
	                </div>
	            )
	        }else if(status == 8){
	            return (
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">已完成</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
	                    {isDelete?<div className="btn">
							<i className="delete_dd" onClick={this.deleteFn}>删除</i>
						</div>:""}
	                </div>
	            )
        	}
    	}else if(paymenttype == 2){
    		if(status == 0){
	            return (
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">确认中</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
	                </div>
	            )
	        }
			else if (status == 1){
	            return(<div></div>)
	        }else if(status == 2){
	            return(
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">已取消</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
	                    {isDelete?<div className="btn">
							<i className="delete_dd" onClick={this.deleteFn}>删除</i>
						</div>:""}
	                </div>
	            )
	        }else if(status == 3){
	            return (
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">确认中</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
	                    <div className="delete-btn">
	                        <a href="javascript:;" className="cancel_btn delete" onClick={this.cancelDanBaoF.bind(this, '取消订单')}>取消订单</a>
	                    </div>
	                </div>
	            )
	        }else if(status == 4){
	            return (
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">已确认</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
	                    <div className="delete-btn">
	                        <a href="javascript:;" className="cancel_btn delete" onClick={this.cancelDanBaoF.bind(this, '取消订单')}>取消订单</a>
	                    </div>
	                </div>
	            )
	        }else if(status === 7){
	            return (
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">已解除担保</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
	                </div>
	            )
	        }else if(status == 8){
	            return (
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">已完成</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
	                    {isDelete?<div className="btn">
							<i className="delete_dd" onClick={this.deleteFn}>删除</i>
						</div>:""}
	                </div>
	            )
	        }
		}if(paymenttype == 3){
			if (status == 1){
	            return(
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">待担保</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
	                    <div className="btn">
	                        <span className="btn-left"><a href="javascript:;" className="left-a" onClick={this.cancelOrder}>取消订单</a></span>
	                        <span className="btn-right"><a href="javascript:;" className="right-a" onClick={this.toDanBaoF}>去担保</a></span>
	                    </div>
	                </div>
	            )
	        }else if(status == 2){
	            return(
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">已取消</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
	                    {isDelete?<div className="btn">
							<i className="delete_dd" onClick={this.deleteFn}>删除</i>
						</div>:""}
	                </div>
	            )
	        }else if(status == 3){
	            return (
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">确认中</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
	                    <div className="delete-btn">
	                        <a href="javascript:;" className="cancel_btn delete"  onClick={this.cancelDanBaoF.bind(this, '确定取消担保')}>取消订单</a>
	                    </div>
	                </div>
	            )
	        }else if(status == 4){
	            return (
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">已确认</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
	                    <div className="delete-btn">
	                        <a href="javascript:;" className="cancel_btn delete"  onClick={this.cancelDanBaoF.bind(this, '确定取消担保')}>取消订单</a>
	                    </div>
	                </div>
	            )
	        }else if(status == 8){
	            return (
	                <div>
	                    <div className="clearfix box">
	                        <div className="pull-left Dzhifu">已完成</div>
	                        <div className="pull-right price" onClick={this.openFeiYong}>￥<strong>{this.props.orderPrice}</strong><b className="iconfont icon-youyou"></b></div>
	                    </div>
	                    {isDelete?<div className="btn">
							<i className="delete_dd" onClick={this.deleteFn}>删除</i>
						</div>:""}
	                </div>
	            )
	        }
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
		var addTime = this.props.addTime;
		var addDate = $.trim(addTime).split(" ")[0];
		return(
			<div className="zhifu">
				{this.showBtn()}
				<div className="clearfix bianhao">
					<div className="pull-left"><i>订单编号</i><span>{this.props.orderId}</span></div>
					<div className="pull-right"><i>预定时间</i><span>{addDate}</span></div>
				</div>
				{this.state.showModal? <PriceDetail roomRate={this.props.roomRate} invoicePostage={this.props.invoicePostage} passengerName={this.props.passengerName} closeFeiYong={this.closeFeiYong} checkinDate={this.props.checkinDate} checkoutDate={this.props.checkoutDate} prices={this.props.prices} guaranteefundAmount={this.props.guaranteefundAmount}/> : ''}
			</div>
		)
	}
});
// 费用明细弹框
var PriceDetail = React.createClass({
  render:function(){
  	var prices=this.props.prices.split(',');
  	var userStr = $.trim(this.props.passengerName);
  	var reg=/,$/gi; 
	var newUserStr=userStr.replace(reg,"");
	var userArr = newUserStr.split(",");
  	var userNum = userArr.length;
  	var dateArr = [];
    var reserveNums=this.props.reserveNum;
    var starttime=this.props.checkinDate,
      endtime=this.props.checkoutDate,
      dDay=(!!starttime && !!endtime)? uddh5.date.gitDiffDay(endtime,starttime) : '';
  	for(var i = 0; i < dDay; i++){
      dateArr.push(uddh5.date.getStartXdays(starttime,i));
	};
    return(
      <div className="price_detail_cont">
        <div className="shade" onClick={this.props.closeFeiYong}></div>
        <div className="price_detail" ref="modalRoot">
          <h5 className="titel">房价详情</h5>
          <ul className="price_detail_list">
          	{
          		$.map(dateArr,function(elem,index){
          			return (
            				<li key={index} className="clearfix"><span className="pull-left">{elem}</span><span className="pull-right"><strong>￥{prices[index]}</strong>x<em>{userNum}</em>间</span></li>
          				)
          		}.bind(this))
          	}
          	{ this.props.guaranteefundAmount !=0? <li className="clearfix"><span className="pull-left">担保价格</span><span className="pull-right"><strong>￥{this.props.guaranteefundAmount*userNum}</strong></span></li>:"" }
			{
          		!!this.props.invoicePostage?<li className="clearfix"><span className="pull-left">配送费</span><span className="pull-right"><strong>￥{this.props.invoicePostage}</strong></span></li>:""
        	}
          </ul>
        </div>	
      </div>
    )
  }
});
//酒店产品
var ProductName = React.createClass({
	toggleLonLat: function(){
		//与app的交互
		var requestHybrid={
		  tagname: 'forward',
		  topage:'map',
		  type:"native",
		  item:"wode",
		  param: {
		      typeId: "10111",
		      lon: this.props.longitude,
		      lat: this.props.latitude,
		      detailAddress: this.props.hotelDetailAddress,
		      name:this.props.productName,
		      stattprice:this.props.orderPrice
		  }
		};
		var native_callback=function(data){}
		uddh5.bridge(native_callback,requestHybrid);
	},
	toHotelRoom: function(){
		var hotels=this.props.elonghotels;
		// 正式环境
		// var domain='https://api.uddtrip.com/uddtriph5/',url;

		// 预发布环境
		// var domain='http://prt.uddtrip.com/uddtriph5/',url;

		// 测试环境
		var domain='http://192.168.1.91:8134/',url;
		url=domain+'hotel/v4/#/roominfo?productId='+this.props.productId+'&starttime='+this.props.checkinDate+'&endtime='+this.props.checkoutDate+'&productType='+hotels.productType+'&elonghotelId='+hotels.elonghotelId+'&elonghotelCode='+hotels.elonghotelCode+'&elongroomTypeId='+hotels.elongroomTypeId+'&elongproductId='+hotels.elongproductId+'&resourceType='+this.props.resourceType+'&elongroomId='+this.props.elongroomId;
		window.location.replace(url);
	},
	toHotelDetail: function(){
		var requestHybrid={
			tagname: 'forward',
			topage:'order',
			type:"native",
			item:'hotel',
			param: {
				typeId: "10160",
				hotelId: this.props.elonghotels.elonghotelId,
				resourceType:this.props.resourceType
			}
		}
		var native_callback=function(data){
		}
		uddh5.bridge(native_callback,requestHybrid);
	},
	applyInvoice: function(){
		var requestHybrid={
			tagname: 'forward',
			topage:'order',
			type:"native",
			item:'hotel',
			param: {
				typeId: "10185",
				orderId: uddh5.location.queryHash().split("/")[2],
				//invoiceMoney: this.props.orderPrice,
				invoiceSource: 1, //1=酒店, 2=飞机
				checkinDate: this.props.checkinDate,
				checkoutDate: this.props.checkoutDate,
				hotelName: this.props.productName
			}
		}
		var native_callback=function(data){
		}
		uddh5.bridge(native_callback,requestHybrid);
	},
	// 去支付
	toPayFn:function(){
		var orderId = uddh5.location.queryHash().split('/')[2];
		var requestHybrid = {
				tagname: 'forward',
				topage:'title',
				type:"native",
				item:"hotel",
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
		var days = uddh5.date.gitDiffDay(this.props.checkinDate,this.props.checkoutDate);
		var userStr = $.trim(this.props.passengerName);
		var reg=/,$/gi; 
		var newUserStr=userStr.replace(reg,"");
		var userArr = newUserStr.split(",");
		var canInvoceMou = uddh5.date.gitDiffDay(this.props.checkinDate,uddh5.date.getCurrentdate());
		return(
			<div>
				<div className="productName">
					<div className="name clearfix" onClick={this.toHotelDetail}>
						<div className="pull-left proName">{this.props.productName}</div>
						<div className="pull-right iconfont icon-youyou"></div>
					</div>
					<div className="dizhi">{this.props.hotelDetailAddress}</div>
					<div className="clearfix jd-dizhi">
						<div className="daohang pull-left" onClick={this.toggleLonLat}>
							<i className="iconfont icon-location3"></i>
							<span>路线导航</span>
						</div>
						<div className="tel pull-right">
							<a href={"tel:"+this.props.hotelPhone}>
								<i className="iconfont icon-dianhua"></i>
								<span>酒店电话</span>
							</a>
						</div>
					</div>
				</div>
				<div className="detail">
					<div className="detail-xx">	
						<div className="fangxing clearfix" onClick={this.toHotelRoom}>
							<div className="pull-left">{this.props.hotelRoomName}</div>
							<div className="iconfont pull-right icon-youyou"></div>
						</div>
						<dl className="dd-detail">
				          <dt>{this.props.checkinDate.slice(5)} 至 {this.props.checkoutDate.slice(5)}</dt>
				          <dd>共{days}晚  {userArr.length}间  {this.props.bedType}</dd>
				          <dt>早餐</dt>
				          <dd><strong>{this.props.breakfast}</strong></dd>
				          <dt>宽带</dt>
				          <dd>{this.props.wifi}</dd>
				          <dt>入住人</dt>
				          <dd>{newUserStr}
				          	</dd>
				          <dt>到店时间</dt>
				          <dd>{this.props.checkinDate}&nbsp;{this.props.checkinTime}</dd>
				        </dl>
				    </div>

					{(uddh5.getCookie('isPublic') == 1 || this.props.status == 0 || this.props.status == 1 || this.props.status == 2 || this.props.status == 5 || this.props.status == 6 || this.props.status == 7 || this.props.isinvoices == 2 || this.props.isinvoices == 3)? '' :
					  	this.props.isOrderInvoiceExist==0? <div className="invoice">
						<div className="clearfix invoice-header">
							<div className="pull-left title">发票信息</div>
							<div className="pull-right">已申请</div>
						</div>
					    <div className="invoiceDetail">
							<p>{this.props.appOrderInvoice.invoiceType==2?"普通发票":this.props.appOrderInvoice.invoiceType==3?"电子发票":"专用发票"}</p>
							<p>{this.props.appOrderInvoice.invoiceTitle}</p>
							<p>{this.props.orderExpress.contactName}<span className="phone">{this.props.orderExpress.mobile}</span></p>
							<p>{this.props.orderExpress.address}</p>
						</div>
					</div>:this.props.isOrderInvoiceExist==2? <div className="invoice">
						<div className="clearfix invoice-header">
							<div className="pull-left title">发票信息</div>
							<div className="pull-right action-btn" onClick={this.toPayFn}>去支付</div>
						</div>
					    <div className="invoiceDetail">
							<p>{this.props.appOrderInvoice.invoiceType==2?"普通发票":this.props.appOrderInvoice.invoiceType==3?"电子发票":"专用发票"}</p>
							<p>{this.props.appOrderInvoice.invoiceTitle}</p>
							<p>{this.props.orderExpress.contactName}<span className="phone">{this.props.orderExpress.mobile}</span></p>
							<p>{this.props.orderExpress.address}</p>
						</div>
					</div>:<div className="invoice">
						<div className="clearfix invoice-header">
							<div className="pull-left title">发票信息</div>
							<div className="pull-right action-btn" onClick={this.applyInvoice}>{canInvoceMou<=90?'申请发票':''}</div>
						</div>
						<div className="invoice-body"><p>能申请3个月之内的订单</p></div>
					</div>
					}
				    {/*<div className="baoxian">
				    	<div className="mp-baoxian">游大大门票意外险</div>
				    	<dl className="people">
				    		<dt>被保人</dt>
				    		<dd>李四</dd>
				    	</dl>
				    </div>*/}   
				</div>
			</div>
		)
	}
});

// 取消订单弹框
var AlertQx = React.createClass({
	cancelOrder:function(){
		var orderId = uddh5.location.queryHash().split('/')[2];
		$.post(uddh5.apihost+"/cancleappcorpratetravelorder",{orderId:orderId,orderType:105},function(data){
			if(data.code==1){
				var requestHybrid = {
						tagname: 'forward',
						topage:'title',
						type:"native",
						item:"hotel",
						param: {
			            	typeId: "10180",
			            	orderType: "105",
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
						item:"hotel",
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
// 去担保弹框
var ToDanBao = React.createClass({
	toDanBaoNative: function(orderId){
		//与app的交互去担保
		var requestHybrid={
			tagname: 'forward',
			topage:'order',
			type:"native",
			param: {
				typeId: "10189",
				orderId: this.props.orderId,
				productId:this.props.productId
			}
		}
		var native_callback=function(data){
		}
		uddh5.bridge(native_callback,requestHybrid);
		this.props.closeToDanBaoFn();
	},
	closeToDanBaoFn:function(){
		this.props.closeToDanBaoFn();
	},
	render:function(){
		return(
			<div className="box_tip">
				<div className="alertQx">
					<p>确定去担保</p>
					<div className="clearfix btn">
						<a  className="btn-left left_a" href="javascript:void(0);" onClick={this.closeToDanBaoFn}>取消</a>
						<a  className="btn-right right_a" href="javascript:void(0);" onClick={this.toDanBaoNative}>确定</a>
						<div className="line"></div>
					</div>
				</div>
			</div>
		);
	}
});
// 取消担保弹框
var CancelDanBao = React.createClass({
	cancelDanBaoNative: function(orderId){
		//与app的交互取消担保
		var requestHybrid={
			tagname: 'forward',
			topage:'order',
			type:"native",
			param: {
				typeId: "10188",
				orderId: this.props.orderId,
				orderType:this.props.paymenttype,
				paymenttype:this.props.paymenttype
			}
		}
		var native_callback=function(data){
		}
		uddh5.bridge(native_callback,requestHybrid);
		this.props.closeCancelDanBaoFn();
	},
	closeCancelDanBaoFn:function(){
		this.props.closeCancelDanBaoFn();
	},
	render:function(){
		return(
			<div className="box_tip">
				<div className="alertQx">
					<p>{this.props.text}</p>
					<div className="clearfix btn">
						<a className="btn-left left_a" href="javascript:void(0);" onClick={this.closeCancelDanBaoFn}>取消</a>
						<a className="btn-right right_a" href="javascript:void(0);" onClick={this.cancelDanBaoNative}>确定</a>
						<div className="line"></div>
					</div>
				</div>
			</div>
		);
	}
});
export default HotelDingdan