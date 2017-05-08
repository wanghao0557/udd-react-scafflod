import React from 'react'
import { Router,Route,IndexRoute,hashHistory} from 'react-router'

import Explain from './jsx/plane_explain.jsx'
import Shuoming from './jsx/plane_shuoming.jsx'
import PlaneOrder from './jsx/order.jsx'
import Calendar from './jsx/calendar.jsx'

require('./css/plane.scss')

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
			   <Route path="/explain" name="explain" component={Explain} />
			   <Route path="/shuoming" name="shuoming" component={Shuoming} />
			   <Route path="/order" name="order" component={PlaneOrder} />
			   <Route path="/calendar" name="calendar" component={Calendar} />
		  </Route>
		</Router>
	);
  ReactDOM.render(routes,document.getElementById('plane'));
}
init();