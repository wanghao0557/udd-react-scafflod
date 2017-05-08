import React from 'react'
import {Link} from 'react-router'
import uddh5 from '../../common/js/common.js'
import BaiduMobStat from '../../common/js/mobstat.js'
var Tuipiao = React.createClass({
	render:function(){
		return(
			<div className="tuipiao">
				<div className="group">
					<h3>退改签说明</h3>
					<p className="tiaojian"><strong>退票规定：</strong>{this.props.refundStipulate}</p>
					<p className="tiaojian"><strong>签转规定：</strong>{this.props.modifyStipulate}</p>
					<p className="tiaojian"><strong>更改规定：</strong>{this.props.changeStipulate}</p>
				</div>
			</div>
		)
	}
});

var Explain = React.createClass({
	getInitialState:function(){
		return{
			refundStipulate:'',
			modifyStipulate:'',
			changeStipulate:''
		};
	},
	componentWillMount:function(){
		BaiduMobStat.onPageStart('Back-change');
	},
	componentWillUnmount: function(){
        BaiduMobStat.onPageEnd('Back-change');
    },
	componentDidMount:function(){
		// http://127.0.0.1:8888/plane/#/explain?depCode=NAY&arrCode=PVG&depDate=2016-11-12&airlineCode=CA&classCode=Y
		var depCode = uddh5.location.queryKey("depCode");
		var arrCode = uddh5.location.queryKey("arrCode");
		var depDate = uddh5.location.queryKey("depDate");
		var airlineCode = uddh5.location.queryKey("airlineCode");
		var classCode = uddh5.location.queryKey("classCode");
		if(this.isMounted()){
			$.post(uddh5.apihost+'/getrefundandchangeinstruction',{depCode:depCode,arrCode:arrCode,depDate:depDate,airlineCode:airlineCode,classCode:classCode},function(data){
				if(data.code == 1){
					var data=data.data;
						this.setState({
							refundStipulate:data.refundStipulate,
							modifyStipulate:data.modifyStipulate,
							changeStipulate:data.changeStipulate
						});	
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
			<div className="explain">
				<Tuipiao refundStipulate={this.state.refundStipulate} modifyStipulate={this.state.modifyStipulate} changeStipulate={this.state.changeStipulate} />
			</div>	
		)	
	}
});

export default Explain
