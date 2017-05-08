import React from 'react'
import { Router,Route,IndexRoute,hashHistory} from 'react-router'

import Dingdan from './jsx/dingdan.jsx'
import HotelDingdan from './jsx/hotelDingdan.jsx'
import PlaneDingdan from './jsx/planeDingdan.jsx'
import TrainDingdan from './jsx/trainDingdan.jsx'
import PaySucceed from './jsx/paysucceed.jsx'

require('./css/wode.scss')
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
			    <Route path="/dingdan" name="dingdan" component={Dingdan} />
			    <Route path="/orderdetail/:orderid" name="hotelDingdan" component={HotelDingdan} />
			    <Route path="/planeDingdan/:orderid" name="planeDingdan" component={PlaneDingdan} />
			    <Route path="/trainDingdan/:orderid" name="trainDingdan" component={TrainDingdan} />
			    <Route path="/paysucceed" name="paysucceed" component={PaySucceed} />
		  </Route>
		</Router>
	);
  ReactDOM.render(routes,document.getElementById('wode'));
}
init();