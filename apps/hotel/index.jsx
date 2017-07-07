import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

//各个组件
import HotelDetail from './jsx/hotel_detail.jsx';
import HotelHome from './jsx/hotel_home.jsx';

var App = React.createClass({
	render: function() {
		return (
			<div>
				<div>{this.props.children}</div>
			</div>
		)
	}
});

!function init() {
	var routes = (
		<Router history={hashHistory}>
			<Route path='/' component={App}>
				<Route path ='/detail/:id' name="detail" component={HotelDetail} />
			</Route>
		</Router>
	);
	ReactDOM.render(routes, document.querySelector('#hotel'));
}();