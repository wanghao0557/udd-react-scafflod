var Alert = React.createClass({
	render:function(){
		return(
			<div className="notify-alert">
			{this.props.textMessage}
			</div>
		);
	}
});

export default Alert