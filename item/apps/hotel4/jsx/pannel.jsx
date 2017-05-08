var AccordionPanel=React.createClass({
	propTypes: {
		children: React.PropTypes.node.isRequired,
		defaultExpanded: React.PropTypes.bool,
		expanded: React.PropTypes.bool,
		label: React.PropTypes.node.isRequired,
		onLabelClick: React.PropTypes.func
	},
	getDefaultProps: function(){
		return {
			defaultExpanded: false
		}
	},
	getInitialState: function(){
		return{
			expanded: this.props.defaultExpanded
		}
	},
	render: function(){
		var expandedClass=(this.isExpanded())? 'open' : '';
		return (
			<div {...this.props} className={'accordion '+expandedClass}>
			  {this.renderLabel()}
			  {this.renderDetails()}
			</div>
		)
	},

	renderLabel: function(){
		return(
			<button {...this.getLabelProps()}>
			  {this.props.label}
			  {this.renderAccordionArrow()}
			</button>
		);
	},
	renderAccordionArrow: function(){
		return(
			<div className="accordion-arrow">{'>'}</div>
		)
	},

	renderDetails: function(){
		var ReactTransition = React.addons.CSSTransitionGroup;
		var details=null;
		if(this.isExpanded()){
			details=(
				<div className="accordion--details" key="details">{this.props.children}</div>
			);
		}
		return (
			<ReactTransition component="div" transitionName="animation--slide-down">
				{details}
			</ReactTransition>
		)
	},
	getLabelProps: function(){
		var action=(this.isExpanded())? 'collapse' : 'expand';
		return(
			'aria-expanded': this.isExpanded(),
			className: 'accordion--label',
			onClick: this.handleLabelClick
		);
	},
	handleLabelClick: function(){
		this.setState({
			expanded: !this.state.expanded
		});
		if(this.props.onLabelClick){
			this.props.onLabelClick()
		}
	},
	isExpanded: function(){
		return (this.props.expanded !== undefined)? this.props.expanded : this.state.expanded;
	}
})