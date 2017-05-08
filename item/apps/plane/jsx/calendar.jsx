import React from 'react'
import {Link} from 'react-router'
import calendar from '../js/calendar/calendar.js'
require("../js/calendar/calendar.css")
import uddh5 from '../../common/js/common.js'
var CalendarContent=React.createClass({
  render: function(){
    return (
      <div className="calendar-con" id="calendar-con">
          
      </div>
    );
  }
});
// 日历
var Calendar = React.createClass({
	componentDidMount: function(){
	// http://127.0.0.1:8888/plane/#/calendar?selectDay=2016-11-05&deptCode=NAY&arrCode=PVG  selectDay选中的时间 
	var selectDay = uddh5.location.queryKey("selectDay");
  var deptCode = uddh5.location.queryKey("deptCode");
  var arrCode = uddh5.location.queryKey("arrCode");
       //获取日历价格列表
    $.post(uddh5.apihost+'/getdailylowestprice',{deptCode:deptCode,arrCode:arrCode},function(data){
      //  数据请求回来以后  停止loading
        var requestHybrid = {
            tagname: 'forward',
                topage:'detail',
                type:"native",
                item:'plane',
                param: {
                    typeId: "10181"
                }
          }
        var native_callback=function(data){
                  
           }
        uddh5.bridge(native_callback,requestHybrid);
        var that=this;
        var start_time = uddh5.date.getCurrentdate();
        if(data.code == 1){
            var data=data.data;
            var time = new calendar("calendar-con",
            {
              months_num:6,
              direction:"after",
              start_time:start_time,
              data:data,
              selected:selectDay
            });
            time.init();
            time.callback=function(data){
              // 时间选择与App的交互
              var requestHybrid = {
              	tagname: 'forward',
              	topage:'detail',
  			        type:"native",
  			        item:'plane',
  			        param:{
  			        	    typeId: "10173",
                  		depDate:data.depDate
  			        }
            }
            	var native_callback=function(data){

              		}
            	uddh5.bridge(native_callback,requestHybrid);
        	}
        }}.bind(this));
        // 组件加载完成后 与App交互头部
        var requestHybrid = {
          tagname: 'forward',
              topage:'detail',
              type:"native",
              item:'plane',
              param: {
                  typeId: "c10170",
                  title:"选择去程时间"
              }
        }
        var native_callback=function(data){
                  
           }
        uddh5.bridge(native_callback,requestHybrid);
  	},
	render: function(){
		return(
				<div className="">
					 <CalendarContent />
				</div>
			)
	}
})

export default Calendar;