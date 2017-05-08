import React from 'react'
import { Router,Route,IndexRoute,hashHistory} from 'react-router'


import Room from './jsx/room.jsx'
import RoomInfo from './jsx/room_info.jsx'
import HotelOrder from './jsx/hotel-order.jsx'
import HotelDetail from './jsx/hotel-detail.jsx'
import DianPing from './jsx/dianping.jsx'
import HotelInfo from './jsx/hotel-info.jsx'
import HotelShare from './jsx/share.jsx'
import HotelCalendar from './jsx/hotel-calendar.jsx'
import UddQuhao from './jsx/quhao.jsx'

require('./css/hotel.scss')
var App=React.createClass({
	render(){
	    return (
           <div>
                <div>{this.props.children}</div>
           </div>
	    )
	}
})

function init(){
    // 定义页面上的路由
  	var routes = (  
  	    <Router history={ hashHistory }>
	      <Route path="/" component={App}>
			    <Route path="/room" name="room" component={Room} />
			    <Route path="/roominfo" name="roominfo" component={RoomInfo} />
			    <Route path="/order/:id/:roomid/:productid" name="order"  component={HotelOrder} />
			    <Route path="/detail/:id" name="detail"  component={HotelDetail} />
			    <Route path="/dianping" name="dianping"  component={DianPing} />
			    <Route path="/info/:id" name="info"  component={HotelInfo} />
			    <Route path="/share" name="share"  component={HotelShare} />
			    <Route path="/calendar" name="calendar"  component={HotelCalendar} />
			    <Route path="/quhao" name="quhao" component={UddQuhao} />
		  </Route>
		</Router>
	);
  ReactDOM.render(routes,document.getElementById('hotel'));
}
init();