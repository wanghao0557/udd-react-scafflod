import React from 'react';
import $ from 'zepto';

var HotelDetail = React.createClass({
	getInitialState: function() {
		return {
			hotelname: ''
		}
	},
	componentDidMount: function() {
		$.post('/hotel/detail', {id: 123}, function(response) {
			if(response.code == 1) {
				var data = response.data;
				this.setState({
					hotelname: data.name
				})
			}
		}.bind(this));
	},
	render: function() {
		return (
			<div>
				<h1>{this.state.hotelname}</h1>
				<p>demo page</p>
			</div>
		)
	}
});

export default HotelDetail;