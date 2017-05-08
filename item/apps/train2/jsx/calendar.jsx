import React from "react"
require("../js/calendar/calendar.css")
import calendar from '../js/calendar/calendar.js'
import uddh5 from '../../common/js/common.js'

var CalendarContent=React.createClass({
  render: function(){
    return (
      <div className="calendar-con" id="calendar-con">

          
      </div>
    );
  }
});



var Calendar=React.createClass({
  componentDidMount: function(){
      // http://127.0.0.1:8888/plane/#/calendar?selectDay=2016-11-05  selectDay选中的时间
       var selectDay = uddh5.location.queryKey("selectDay");
       var nowDay = uddh5.date.getCurrentdate();
       var et = uddh5.date.getStartXdays(nowDay,30);
       var time = new calendar("calendar-con",
		  	{
		  		//initial_time:"2016-8-30",
		  		months_num:2,
          direction:"after",
          start_time:nowDay,
          end_time:et,
          selected:selectDay
		  	});
	        time.init();  
          time.callback=function(time){
               //与app的交互
               var requestHybrid={
                  tagname: 'forward',
                  topage:'detail',
                  type:"native",
                  item:'train',
                  param: {
                      typeId:"10163",
                      time:time
                  }
               }
               var native_callback=function(data){
                    
               }
               uddh5.bridge(native_callback,requestHybrid);
          }
          //与app的交互
           var setTitle={
              tagname: 'forward',
              topage:'detail',
              type:"native",
              item:'train',
              param: {
                  typeId: "c10162",
                  title:"选择出发时间"
              }
           }
           var native_callback=function(data){
                
           }
           uddh5.bridge(native_callback,setTitle);
  },
  render: function(){
    return (
      <div>
        <CalendarContent />
      </div>
    );
  }
});

export default Calendar