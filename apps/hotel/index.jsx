import React from 'react';
import ReactDOM from 'react-dom';
import css from './scss/index.scss';
import back_icon from './imgs/back.png';
var Header = React.createClass({
	render: function() {
		return(
			<div>
				<span className="hotel-icon icon-book">kakan</span>
				<strong>react</strong>
				<img src={back_icon}/>
			</div>
		)
	}
});

ReactDOM.render(<Header />, document.querySelector('#hotel'));
