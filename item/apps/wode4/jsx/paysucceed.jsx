import React from 'react'
import {Link} from 'react-router'
import uddh5 from '../../common/js/common.js'
//支付成功模块
var PaySucceed = React.createClass({
	componentDidMount:function(){
		var requestHybrid = {
				tagname: 'forward',
				topage: 'title',
				type:'native',
				item:'wode',
				param: {
					typeId: 'c10175',
					title: ''
				}
			}
			var native_callback=function(data){
			
			}.bind(this)
			uddh5.bridge(native_callback,requestHybrid)
	},
	handClick:function(){
		var requestHybrid = {
				tagname: 'forward',
				topage: 'title',
				type:'native',
				item:'wode',
				param: {
					typeId: '10176',
					title: ''
				}
			}
			var native_callback=function(data){
			
			}.bind(this)
			uddh5.bridge(native_callback,requestHybrid)
	},
	render:function(){
		return(
			<div className="paysucceed">
				<div className="icon">
					<i className="iconfont icon-tickmarks"></i>
				</div>
				<div className="wait">恭喜您提交成功,等待审核</div>
				<div className="look">审核通过后可以在我的订单里面看到</div>
				<div className="payState">支付成功状态</div>
				<div className="btn">
					<div className="firm" onClick={this.handClick}>确认</div>
				</div>	
			</div>
		)
	}
});

export default PaySucceed