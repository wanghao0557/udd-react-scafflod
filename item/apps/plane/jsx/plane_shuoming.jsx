import React from 'react'
import {Link} from 'react-router'
import uddh5 from '../../common/js/common.js'
// var Shijian = React.createClass({
// 	render:function(){
// 		return(
// 			<div className="shijian">
// 				<i className="iconfont icon-waste"></i>
// 				<span>该航班预计在扣款成功后20分钟内完成出票。</span>
// 			</div>
// 		)
// 	}
// });

// var Xingli = React.createClass({
// 	render:function(){
// 		return(
// 			<div className="xingli">
// 				<div className="exian">
// 					<i>行李额</i>
// 					<span>免费托运行李额限20KG</span>
// 				</div>
// 				<div className="yuding">
// 					<i>预订提示</i>
// 					<span>无免费餐饮及选座服务。航班延误或取消，不提供经济补偿。航班取消、延误三小时以上可按非自愿退票办理。旅客享有20KG免费托运行李。婴儿无免费行李额</span>
// 				</div>
// 			</div>
// 		)
// 	}
// });

var Tuipiao = React.createClass({
	StateFn:function(){
		var refundTimePoint=this.props.refundTimePoint;
		var refundTimePointAdvance=this.props.refundTimePointAdvance;
		var money=this.props.money;
		var refundPercentAdvance=this.props.refundPercentAdvance*0.01;
		var refundPercentBefore=this.props.refundPercentBefore*0.01;
		var refundPercentAfter=this.props.refundPercentAfter*0.01;
		var changePercentAdvance=this.props.changePercentAdvance*0.01;
		var changePercentBefore=this.props.changePercentBefore*0.01;
		var changePercentAfter=this.props.changePercentAfter*0.01;

		if((refundTimePoint == 0 || refundTimePoint == -1) && (refundTimePointAdvance == 0 || refundTimePointAdvance == -1)){
			return(
				<ul className="table">
					<li className="tab_tr">
						<div className="tr_titel">
							<span>退票费</span>
						</div>
						<div className="detail">
							<ul className="detail_list">
								<li className="list clearfix">		
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前</span>
									{refundPercentBefore==1 ? <span className="pull-right">不能退票</span>:<span className="pull-right">￥{(refundPercentBefore*money).toFixed(1)}/人</span>}
								</li>
								<li className="list clearfix">	
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞后</span>
									{refundPercentAfter==1 ? <span className="pull-right">不能退票</span>:<span className="pull-right">￥{(refundPercentAfter*money).toFixed(1)}/人</span>}
								</li>
							</ul>
						</div>
					</li>
					<li className="tab_tr">
						<div className="tr_titel">
							<span>同舱更改条件</span>
						</div>
						<div className="detail">
							<ul className="detail_list">
								<li className="list clearfix">
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前</span>
									{changePercentBefore==1 ? <span className="pull-right">不能改签</span>:<span className="pull-right">￥{(changePercentBefore*money).toFixed(1)}/人</span>}
								</li>
								<li className="list clearfix">
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞后</span>
									{changePercentAfter==1 ? <span className="pull-right">不能改签</span>:<span className="pull-right">￥{(changePercentAfter*money).toFixed(1)}/人</span>}
								</li>
							</ul>
						</div>
					</li>
					<li className="tab_tr">
						<div className="tr_titel">
							<span>签转条件</span>
						</div>
						<div className="detail">
							<ul className="detail_list">
								<li className="list clearfix">
									<span className="pull-left">{this.props.modifyStipulate}</span>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			)	
		}else if((refundTimePoint != 0 && refundTimePoint != -1) && (refundTimePointAdvance == 0 || refundTimePointAdvance == -1)){
			return(
				<ul className="table">
					<li className="tab_tr">
						<div className="tr_titel">
							<span>退票费</span>
						</div>
						<div className="detail">
							<ul className="detail_list">
								<li className="list clearfix">		
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前{refundTimePoint}小时外</span>
									{refundPercentBefore==1 ? <span className="pull-right">不能退票</span>:<span className="pull-right">￥{(refundPercentBefore*money).toFixed(1)}/人</span>}
								</li>
								<li className="list clearfix">	
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前{refundTimePoint}小时内</span>
									{refundPercentAfter==1 ? <span className="pull-right">不能退票</span>:<span className="pull-right">￥{(refundPercentAfter*money).toFixed(1)}/人</span>}
								</li>
								<li className="list clearfix">	
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞后</span>
									{refundPercentAfter==1 ? <span className="pull-right">不能退票</span>:<span className="pull-right">￥{(refundPercentAfter*money).toFixed(1)}/人</span>}
								</li>
							</ul>
						</div>
					</li>
					<li className="tab_tr">
						<div className="tr_titel">
							<span>同舱更改条件</span>
						</div>
						<div className="detail">
							<ul className="detail_list">
								<li className="list clearfix">
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前{refundTimePoint}小时外</span>
									{changePercentBefore==1 ? <span className="pull-right">不能改签</span>:<span className="pull-right">￥{(changePercentBefore*money).toFixed(1)}/人</span>}
								</li>
								<li className="list clearfix">
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前{refundTimePoint}小时内</span>
									{changePercentAfter==1 ? <span className="pull-right">不能改签</span>:<span className="pull-right">￥{(changePercentAfter*money).toFixed(1)}/人</span>}
								</li>
								<li className="list clearfix">
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞后</span>
									{changePercentAfter==1 ? <span className="pull-right">不能改签</span>:<span className="pull-right">￥{(changePercentAfter*money).toFixed(1)}/人</span>}
								</li>
							</ul>
						</div>
					</li>
					<li className="tab_tr">
						<div className="tr_titel">
							<span>签转条件</span>
						</div>
						<div className="detail">
							<ul className="detail_list">
								<li className="list clearfix">
									<span className="pull-left">{this.props.modifyStipulate}</span>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			)	
		}else if((refundTimePoint == 0  || refundTimePoint == -1 ) && (refundTimePointAdvance != 0 || refundTimePointAdvance != -1)){
			return(
				<ul className="table">
					<li className="tab_tr">
						<div className="tr_titel">
							<span>退票费</span>
						</div>
						<div className="detail">
							<ul className="detail_list">
								<li className="list clearfix">
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前{refundTimePointAdvance}小时外</span>
									{refundPercentAdvance==1 ? <span className="pull-right">不能退票</span>:<span className="pull-right">￥{(refundPercentAdvance*money).toFixed(1)}/人</span>}
								</li>
								<li className="list clearfix">		
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前{refundTimePointAdvance}小时内</span>
									{refundPercentBefore==1 ? <span className="pull-right">不能退票</span>:<span className="pull-right">￥{(refundPercentBefore*money).toFixed(1)}/人</span>}
								</li>
								<li className="list clearfix">	
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞后</span>
									{refundPercentAfter==1 ? <span className="pull-right">不能退票</span>:<span className="pull-right">￥{(refundPercentAfter*money).toFixed(1)}/人</span>}
								</li>
							</ul>
						</div>
					</li>
					<li className="tab_tr">
						<div className="tr_titel">
							<span>同舱更改条件</span>
						</div>
						<div className="detail">
							<ul className="detail_list">
								<li className="list clearfix">
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前{refundTimePointAdvance}小时外</span>
									{changePercentAdvance==1 ? <span className="pull-right">不能改签</span>:<span className="pull-right">￥{(changePercentAdvance*money).toFixed(1)}/人</span>}
								</li>
								<li className="list clearfix">
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前{refundTimePointAdvance}小时内</span>
									{changePercentBefore==1 ? <span className="pull-right">不能改签</span>:<span className="pull-right">￥{(changePercentBefore*money).toFixed(1)}/人</span>}
								</li>
								<li className="list clearfix">
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞后</span>
									{changePercentAfter==1 ? <span className="pull-right">不能改签</span>:<span className="pull-right">￥{(changePercentAfter*money).toFixed(1)}/人</span>}
								</li>
							</ul>
						</div>
					</li>
					<li className="tab_tr">
						<div className="tr_titel">
							<span>签转条件</span>
						</div>
						<div className="detail">
							<ul className="detail_list">
								<li className="list clearfix">
									<span className="pull-left">{this.props.modifyStipulate}</span>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			)	
		}else if((refundTimePoint != 0 && refundTimePoint != -1) && (refundTimePointAdvance != 0 || refundTimePointAdvance != -1)){
			return(
				<ul className="table">
					<li className="tab_tr">
						<div className="tr_titel">
							<span>退票费</span>
						</div>
						<div className="detail">
							<ul className="detail_list">
								<li className="list clearfix">
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前{refundTimePointAdvance}小时外</span>
									{refundPercentAdvance==1 ? <span className="pull-right">不能退票</span>:<span className="pull-right">￥{(refundPercentAdvance*money).toFixed(1)}/人</span>}
								</li>
								<li className="list clearfix">		
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前{refundTimePointAdvance}小时内,{refundTimePoint}小时外</span>
									{refundPercentBefore==1 ? <span className="pull-right">不能退票</span>:<span className="pull-right">￥{(refundPercentBefore*money).toFixed(1)}/人</span>}
								</li>
								<li className="list clearfix">	
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前{refundTimePoint}小时内</span>
									{refundPercentAfter==1 ? <span className="pull-right">不能退票</span>:<span className="pull-right">￥{(refundPercentAfter*money).toFixed(1)}/人</span>}
								</li>
								<li className="list clearfix">	
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞后</span>
									{refundPercentAfter==1 ? <span className="pull-right">不能退票</span>:<span className="pull-right">￥{(refundPercentAfter*money).toFixed(1)}/人</span>}
								</li>
							</ul>
						</div>
					</li>
					<li className="tab_tr">
						<div className="tr_titel">
							<span>同舱更改条件</span>
						</div>
						<div className="detail">
							<ul className="detail_list">
								<li className="list clearfix">
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前{refundTimePointAdvance}小时外</span>
									{changePercentAdvance==1 ? <span className="pull-right">不能改签</span>:<span className="pull-right">￥{(changePercentAdvance*money).toFixed(1)}/人</span>}
								</li>
								<li className="list clearfix">
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前{refundTimePointAdvance}小时内,{refundTimePoint}小时外</span>
									{changePercentBefore==1 ? <span className="pull-right">不能改签</span>:<span className="pull-right">￥{(changePercentBefore*money).toFixed(1)}/人</span>}
								</li>
								<li className="list clearfix">
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前{refundTimePoint}小时内</span>
									{changePercentAfter==1 ? <span className="pull-right">不能改签</span>:<span className="pull-right">￥{(changePercentAfter*money).toFixed(1)}/人</span>}
								</li>
								<li className="list clearfix">
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞后</span>
									{changePercentAfter==1 ? <span className="pull-right">不能改签</span>:<span className="pull-right">￥{(changePercentAfter*money).toFixed(1)}/人</span>}
								</li>
							</ul>
						</div>
					</li>
					<li className="tab_tr">
						<div className="tr_titel">
							<span>签转条件</span>
						</div>
						<div className="detail">
							<ul className="detail_list">
								<li className="list clearfix">
									<span className="pull-left">{this.props.modifyStipulate}</span>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			)	
		}
	},
	render:function(){
		return(
			<div className="tuipiao">
				<h3>成人退票改签说明</h3>
				{/*<ul className="table">
					<li className="tab_tr">
						<div className="tr_titel">
							<span>退票费</span>
						</div>
						<div className="detail">
							<ul className="detail_list">
								<li className="list clearfix">
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前2小时外</span>
									<span className="pull-right">￥{(refundPercentAdvance*money).toFixed(1)}/人</span>
								</li>
								<li className="list clearfix">		
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前</span>
									<span className="pull-right">￥{(refundPercentBefore*money).toFixed(1)}/人</span>
								</li>
								<li className="list clearfix">	
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞后</span>
									<span className="pull-right">￥{(refundPercentAfter*money).toFixed(1)}/人</span>
								</li>
							</ul>
						</div>
					</li>
					<li className="tab_tr">
						<div className="tr_titel">
							<span>同舱更改条件</span>
						</div>
						<div className="detail">
							<ul className="detail_list">
								<li className="list clearfix">
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前2小时外</span>
									<span className="pull-right">￥{(changePercentAdvance*money).toFixed(1)}/人</span>
								</li>
								<li className="list clearfix">
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞前</span>
									<span className="pull-right">￥{(changePercentBefore*money).toFixed(1)}/人</span>
								</li>
								<li className="list clearfix">
									<span className="pull-left"><i className="iconfont icon-clock1"></i>起飞后</span>
									<span className="pull-right">￥{(changePercentAfter*money).toFixed(1)}/人</span>
								</li>
							</ul>
						</div>
					</li>
					<li className="tab_tr">
						<div className="tr_titel">
							<span>签转条件</span>
						</div>
						<div className="detail">
							<ul className="detail_list">
								<li className="list clearfix">
									<span className="pull-left">{this.props.modifyStipulate}</span>
								</li>
							</ul>
						</div>
					</li>
				</ul>*/}
				{this.StateFn()}
			</div>	
		)	
	}
});

var Shuoming = React.createClass({
	getInitialState:function(){
		return{
			refundPercentAdvance:'',
			refundPercentBefore:'',
			refundPercentAfter:'',
			changePercentAdvance:'',
			changePercentBefore	:'',
			changePercentAfter:'',
			refundTimePointAdvance:'',
			refundTimePoint:'',
			modifyStipulate:'',
			priceType:'',
			prices:'',
			discounts:'',
			money:''
		}
	},
	componentDidMount:function(){
		// http://127.0.0.1:8888/plane/#/shuoming?depCode=NAY&arrCode=PVG&depDate=2016-11-12&airlineCode=CA&classCode=Y&price=1200&discount=0.6
		var depCode = uddh5.location.queryKey("depCode");
		var arrCode = uddh5.location.queryKey("arrCode");
		var depDate = uddh5.location.queryKey("depDate");
		var airlineCode = uddh5.location.queryKey("airlineCode");
		var classCode = uddh5.location.queryKey("classCode");
		var price = uddh5.location.queryKey("price");
		var discount = uddh5.location.queryKey("discount");
		var con={depCode:depCode,arrCode:arrCode,depDate:depDate,airlineCode:airlineCode,classCode:classCode};
		if(this.isMounted()){
			$.post(uddh5.apihost+'/getrefundandchangeinstruction',{depCode:depCode,arrCode:arrCode,depDate:depDate,airlineCode:airlineCode,classCode:classCode},function(data){
				if(data.code == 1){
					var data=data.data;
					this.setState({
						refundPercentAdvance:data.refundPercentAdvance,
						refundPercentBefore:data.refundPercentBefore,
						refundPercentAfter:data.refundPercentAfter,
						changePercentAdvance:data.changePercentAdvance,
						changePercentBefore	:data.changePercentBefore,
						changePercentAfter:data.changePercentAfter,
						refundTimePointAdvance:data.refundTimePointAdvance,
						refundTimePoint:data.refundTimePoint,
						modifyStipulate:data.modifyStipulate,
						priceType:data.priceType,
						prices:price,
						discounts:discount,
					});
					if(this.state.priceType == 1){
						this.setState({
							money:this.state.prices
						});
					}else{
						this.setState({
							money:this.state.prices/this.state.discounts
						});
					}	
			}}.bind(this));
			
			//与App的交互
			var requestHybrid = {
				tagname: 'forward',
				topage: 'title',
				type:'native',
				item:'plane',
				param: {
					typeId: 'c10164',
					title: '说明'
				}
			}
			var native_callback=function(data){

			}
			uddh5.bridge(native_callback,requestHybrid)
		}
	},
	render:function(){
		return(
			<div className="shuoming">
				{/*<Shijian />
				<Xingli />*/}
				<Tuipiao refundTimePointAdvance={this.state.refundTimePointAdvance} refundTimePoint={this.state.refundTimePoint} changePercentAdvance={this.state.changePercentAdvance} changePercentBefore={this.state.changePercentBefore} changePercentAfter={this.state.changePercentAfter} modifyStipulate={this.state.modifyStipulate} refundPercentAdvance={this.state.refundPercentAdvance} refundPercentBefore={this.state.refundPercentBefore} refundPercentAfter={this.state.refundPercentAfter} priceType={this.state.priceType} prices={this.state.prices} discounts={this.state.discounts} money={this.state.money}/>
			</div>	
		)	
	}
});

export default Shuoming