var AlertQx = React.createClass({
	render:function(){
		return(
			<div className="box_tip">
				<div className="alertQx">
					<h3>提醒</h3>
					<p>确定取消吗?</p>
					<div className="clearfix btn">
						<a  className="btn-left left_a" href="javascript:void(0);" >取消</a>
						<a  className="btn-right right_a" href="javascript:void(0);">确定</a>
						<div className="line"></div>
					</div>
				</div>
			</div>
		);
	}
});

export default AlertQx