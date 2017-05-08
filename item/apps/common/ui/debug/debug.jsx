var Debug=React.createClass({
	getInitialState: function(){
		return{
			logs: [],
			shown: true
		}
	},
	componentDidMount: function(){
		var b=1+2;
		var logs=[];
		//console.resourlog=console.log;
		console.log=function(str){
			//console.resourlog(str);
			if(typeof str === 'object'){
				str=JSON.stringify(str);
			}else if(typeof str === 'undefined'){
				str=str+'';
			}else{
				str=str.toString();
			}
			logs.push(str);
		};
		if(this.isMounted()){
			this.setState({
				logs: logs
			});
		}
	},
	toggleClick: function(){
		this.setState({
			shown: !this.state.shown
		});
	},
	render: function(){
		var logs=this.state.logs;
		return(
			<div className={"debug-footer "+(this.state.shown? '' : 'close')}>
			  <a className="toggle-btn" onClick={this.toggleClick} href="javascript: void(0)">{this.state.shown? 'Hide' : 'Show'}</a>
			  <ol>
			    {$.map(logs, function(elem, index){
			    	return(
			    		<li key={index}>{elem}</li>
			    	)
			    }.bind(this))}
			  </ol>
			</div>		
		);
	}
});

export default Debug