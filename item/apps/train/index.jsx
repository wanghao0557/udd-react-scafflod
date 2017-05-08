import React from 'react'
import { Router,Route,IndexRoute,hashHistory} from 'react-router'

import JingTing from './jsx/jingting.jsx'
import TrainOrder from './jsx/order.jsx'
import ZhanZuo from './jsx/zhanzuo.jsx'
import Calendar from './jsx/calendar.jsx'
require('./css/train.scss')

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
			   <Route path="/jingting" name="jingting" component={JingTing} />
			   <Route path="/order" name="order" component={TrainOrder} />
			   <Route path="/zhanzuo/:orderId" name="zhanzuo" component={ZhanZuo} />
			   <Route path="/calendar" name="calendar" component={Calendar} />
		  </Route>
		</Router>
	);
  ReactDOM.render(routes,document.getElementById('train'));
}
init();