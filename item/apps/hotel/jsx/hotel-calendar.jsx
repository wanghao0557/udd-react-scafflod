import React from "react"
import calendar from '../js/calendar/calendar.js'
require("../js/calendar/calendar.css")
import uddh5 from '../../common/js/common.js'
import Alert from '../../common/ui/alert/alert.jsx'
require('../../common/ui/alert/alert.scss')
var CalendarContent=React.createClass({
  render: function(){
    return (
      <div className="calendar-con" id="calendar-con">

          
      </div>
    );
  }
});



var HotelCalendar=React.createClass({
  getInitialState: function(){
      return{
        messageShow:false
      }
  },
  closeAlert: function(){
      this.setState({
        messageShow: false
      });
  },
  openAlert: function(text, duration){
      var that = this;
      var duration= duration == undefined? 2000 : duration;
      this.setState({
        messageShow: true,
        textMessage: text
      });
      setTimeout(function() {
        that.closeAlert();
      }, duration);
  },
  componentDidMount: function(){
       var that = this;
       var st = uddh5.location.queryKey("starttime");
       var et = uddh5.location.queryKey("endtime");
       if(!st){
          st=null;
       }
       if(!et){
          et=null;
       }
       var time = new calendar("calendar-con",
		  	{
		  		//initial_time:"2016-8-30",
		  		direction:"after",
		  		//offsety:6
          start_time:st,
          end_time:et
		  	});
	        time.init();  
          time.callback=function(){
               console.log("开始时间："+time.start_time);
               console.log("结束时间："+time.end_time);
               if(time.end_time==null){
                  that.openAlert("请选择时间间隔不超过28天的日期")
               }else{
                 //与app的交互
                 var requestHybrid={
                    tagname: 'forward',
                    topage:'detail',
                    type:"native",
                    param: {
                        typeId:"10103",
                        starttime: time.start_time,
                        endtime:time.end_time
                    }
                 }
                 var native_callback=function(data){
                      
                 }
                 uddh5.bridge(native_callback,requestHybrid);
               }
          }

          //与app的交互
           var setTitle={
              tagname: 'forward',
              topage:'detail',
              type:"native",
              param: {
                  typeId: "c10103",
                  title:"选择入住/离店时间"
              }
           }
           var callback=function(data){
                
           }
           uddh5.bridge(callback,setTitle);
  },
  render: function(){
    return (
      <div>
        <CalendarContent />
       {this.state.messageShow? <Alert textMessage={this.state.textMessage}/> : ''}
      </div>
    );
  }
});

export default HotelCalendar