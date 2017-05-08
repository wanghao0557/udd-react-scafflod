import React from 'react'
import {Link} from 'react-router'
import uddh5 from '../../common/js/common.js'
import BaiduMobStat from '../../common/js/mobstat.js'
//创建订单传来的URL参数: {trainCode: this.props.trainCode, fromStationCode: this.props.fromStationCode, toStationCode: this.props.toStationCode, trainNumber: this.props.trainNumber}
var JingTing = React.createClass({	
	getInitialState:function(){
		return{
			data:''
		}
	},	
	componentWillMount:function(){
		BaiduMobStat.onPageStart('Stop-station');
	},
	componentDidMount:function(){
		// http://127.0.0.1:8888/train/#/jingting?trainCode=G102&fromStationCode=AOH&toStationCode=VNP&trainNumber=5l0000G10261
		var trainCode = uddh5.location.queryKey("trainCode");
		var fromStationCode = uddh5.location.queryKey("fromStationCode");
		var toStationCode = uddh5.location.queryKey("toStationCode");
		var trainNumber = uddh5.location.queryKey("trainNumber");
		if(this.isMounted()){
			$.post(uddh5.apihost+'/getAppTrainInfo',{train_code:trainCode,from_station:fromStationCode,to_station:toStationCode,train_no:trainNumber},function(data){
				var data = data.data;
				if(data.success){
					var data = data.data
					this.setState({
						data:data[0].data
					});
			}}.bind(this));
			//与App的交互
			var requestHybrid = {
				tagname:'forward',
				topage:'detail',
				type:'native',
				item:'train',
				param:{
					typeId:"c10161",
                    title:"经停站"
				}
			}
			var native_callback = function(){

			}
			uddh5.bridge(native_callback,requestHybrid);
		}
	},
	componentWillUnmount: function(){
        BaiduMobStat.onPageEnd('Stop-station');
    },
	render:function(){
		var data = this.state.data;
		var dateLen = data.length-1;
		return(
			<div className="jingting">
				<div className="content">
					<div className="title">
						<span>车站名称</span>
						<span>到达</span>
						<span>出发</span>
						<span>停留</span>
					</div>
					<ul>
						{
							$.map(data,function(elem,index){
								return(
									<li key={index}>
										<i>{elem.station_name}</i>
										<i>{elem.arrive_time}</i>
										<i>{(index==dateLen)?elem.stopover_time:elem.start_time}</i>
										<i>{elem.stopover_time}</i>
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

export default JingTing