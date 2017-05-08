import React from 'react'
import {Link} from 'react-router'
import uddh5 from '../../common/js/common.js'
//订单——酒店、火车票、飞机票公用支付模块
var Zhifu = React.createClass({
	render:function(){
		return(
			<div className="zhifu">
				<div className="clearfix box">
					<div className="pull-left Dzhifu">待支付<i>请在14:26之前进行支付</i></div>
					<div className="pull-right price">￥<strong>6280</strong><b className="iconfont icon-youyou"></b></div>
				</div>
				<div className="btn">
					<span className="btn-left">
						<a href="javascript:void(0)" className="left-a">取消订单</a>
					</span>
					<span className="btn-right">
						<a href="javascript:void(0)" className="right-a">去支付</a>
					</span>
				</div>
				<div className="clearfix bianhao">
					<div className="pull-left"><i>订单编号</i><span>210541215</span></div>
					<div className="pull-right"><i>预定时间</i><span>210541215</span></div>
				</div>
			</div>
		)
	}
});
//酒店订单
var HotelDingdan = React.createClass({
	render:function(){
		return(
			<div className="hotelDingdan">
				<Zhifu />
				<ProductName />
				<Hoteldetail />
			</div>
		)
	}
});
//酒店产品
var ProductName = React.createClass({
	render:function(){
		return(
			<div className="productName">
				<div className="name clearfix">
					<div className="pull-left proName">上海万业新街全套房公寓</div>
					<div className="pull-right iconfont icon-youyou"></div>
				</div>
				<div className="dizhi">上海宜川路300号</div>
				<div className="clearfix jd-dizhi">
					<div className="daohang pull-left">
						<i className="iconfont icon-location3"></i>
						<span>路线导航</span>
					</div>
					<div className="tel pull-right">
						<i className="iconfont icon-dianhua"></i>
						<span>酒店电话</span>
					</div>
				</div>
			</div>
		)
	}
});
//酒店订单详情
var Hoteldetail = React.createClass({
	render:function(){
		return(
			<div className="detail">
				<div className="detail-xx">	
					<div className="fangxing clearfix">
						<div className="pull-left">商务大床房<span>（内宾）</span></div>
						<div className="iconfont pull-right icon-youyou"></div>
					</div>
					<dl className="dd-detail">
			          <dt>5-18至5-20</dt>
			          <dd>共2晚  1间  大床</dd>
			          <dt>早餐</dt>
			          <dd>5月18<strong>双早</strong>    5月19<strong>双早</strong></dd>
			          <dt>宽带</dt>
			          <dd>全部房间WIFI</dd>
			          <dt>入住人</dt>
			          <dd>游大大</dd>
			          <dt>到店时间</dt>
			          <dd>5月18日  17:00之前到店</dd>
			        </dl>
			    </div>
			    <div className="baoxian">
			    	<div className="mp-baoxian">游大大门票意外险</div>
			    	<dl className="people">
			    		<dt>被保人</dt>
			    		<dd>李四</dd>
			    	</dl>
			    </div>    
			</div>

		)
	}
});
//飞机票订单
var PlaneDingdan = React.createClass({
	render:function(){
		return(
			<div className="planeDingdan">
				<Zhifu />
				<Qucheng />
				<Chengke />
				<Baoxian />
			</div>
		)
	}
});
//飞机票——去程
var Qucheng = React.createClass({
	render:function(){
		return(
			<div className="qucheng">
				<div className="qc-feiji">
					<strong>去程</strong>
					<span>东航MU564 波音747 经济舱</span>
				</div>
				<div className="clearfix qc-jichang">
					<div className="pull-left jichang">
						<p>9月28日</p>
						<p>浦东T1</p>
						<p>06:39</p>
					</div>
					<div className="line"><i className="iconfont icon-plane"></i></div>
					<div className="pull-right jichang">
						<p>9月28日</p>
						<p>首都T2</p>
						<p>12:18</p>
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
				<dl>
					<dt>张三</dt>
					<dd>身份证<span>37888*********64</span></dd>
					<dd>手机号<span>137****6444</span></dd>
				</dl>
				<dl>
					<dt>李四</dt>
					<dd>身份证<span>37888*********64</span></dd>
					<dd>手机号<span>137****6444</span></dd>
				</dl>
			</div>
		)
	}
});
//飞机票、火车票——保险、报销
var Baoxian = React.createClass({
	render:function(){
		return(
			<div className="baoxian">
				<div className="leixing">
					<h3>保险品种</h3>
					<div className="yanwu">航空意外险x<span>1</span></div>
					<div className="yanwu">延误取消险x<span>1</span></div>
				</div>
				<div className="baoxiao">
					<h3>报销凭证</h3>
					<dl>
						<dt>游大网络技术（上海）有限公司</dt>
						<dd>张三<span>137****4567</span></dd>
						<dd>上海市普陀区子长路77弄61号601</dd>
					</dl>
				</div>
			</div>
		)
	}
});
//火车票订单
var TrainDingdan = React.createClass({
	render:function(){
		return(
			<div className="trainDingdan">
				<Zhifu />
				<Lieci />
				<NameDetail />
				<Baoxian />
			</div>
		)
	}
});
//火车票——列次
var Lieci = React.createClass({
	render:function(){
		return(
			<div className="clearfix lieci">
				<div className="pull-left zhandian">
					<p>上海虹桥</p>
					<p>06:39</p>
				</div>
				<div className="time">
					<p>k012</p>
					<p></p>
					<p>23时39分</p>
				</div>
				<div className="pull-right zhandian">
					<p>北京南站</p>
					<p>12:18</p>
				</div>
			</div>
		)
	}
});
//火车票——乘客信息
var NameDetail = React.createClass({
	render:function(){
		return(
			<div>
				<div className="name">
					<div className="zuowei clearfix">
						<div className="name pull-left">张三</div>
						<div className="name pull-right">二等座<i>￥</i><strong>520</strong></div>
					</div>
					<div className="nameDetail">
						<div className="idCard">身份证<span>37888*********64</span></div>
						<div className="idCard tel">手机号<span>137****0000</span></div>
					</div>
				</div>
				<div className="name">
					<div className="zuowei clearfix">
						<div className="name pull-left">李四</div>
						<div className="name pull-right">二等座<i>￥</i><strong>520</strong></div>
					</div>
					<div className="nameDetail">
						<div className="idCard">身份证<span>37888*********64</span></div>
						<div className="idCard tel">手机号<span>137****0000</span></div>
					</div>
				</div>
			</div>
		)
	}
});
//酒店、火车票、飞机票最大组件
var Dingdan = React.createClass({
	render:function(){
		return(
			<div className="dingdan">
				<HotelDingdan />
				<PlaneDingdan />
				<TrainDingdan />
			</div>
		)
	}
});
export default Dingdan