import uddh5 from '../../../common/js/common.js'
function Calendar(year,month,day){
    this.year = year ? year : this.getFullYear();
    if(month==0){
         this.month=0; 
    }else{
         this.month = month ? month : this.getMonth();
    }  
    this.day=day ? day : this.getDate();
}

//获取当前年份
Calendar.prototype.getFullYear=function(){
     return new Date().getFullYear();
}
//获取当前月份
Calendar.prototype.getMonth=function(){
     return new Date().getMonth()+1;
}
//获取当前日
Calendar.prototype.getDate=function(){
     return new Date().getDate();
}
//获取一月中的星期几
Calendar.prototype.getDay=function(){
     return new Date().getDay();
}

//获取一个月的天数
Calendar.prototype.getMonthDays=function(){
     var _this=this;
     function isLeapyear(){   //闰年判断方法
           return _this.year % 400 ==0 || (_this.year %4 ==0 && _this.year %100 != 0);
     }
     function getFebruaryDays(){  //获取闰年的天数
           return isLeapyear() ? 29 : 28;
     }
     var monthdays = [31,getFebruaryDays(),31,30,31,30,31,31,30,31,30,31];
     return monthdays[_this.month-1];
     //return new Date().getDay();
}
//获取本月第一天的星期数
Calendar.prototype.getMonthFirstDays=function(){
     var firstweek = new Date(this.year,this.month-1,1).getDay();
     if(firstweek == 0){   //将0代表的礼拜天转化为7
          firstweek =7;
     }
     return firstweek;
}
//计算日历行数
Calendar.prototype.getRows=function(){
     return (this.getMonthFirstDays()-1+this.getMonthDays())/7;
}
//获取月名称
Calendar.prototype.getMonthName=function(language){
     this.monthn_en = ["January","February","March","April","may","June","July","August","September","October","November","December"];
     this.month_cn = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
     if(language=="en"){
          return this.monthn_en[this.month]
     }else{
          return this.month_cn[this.month]
     }
}
//获取日名称
Calendar.prototype.getWeekName=function(language){
     this.week_en = ["Mo","Tu","We","Th","Fr","Sa","Su"];
     this.week_cn = ["一","二","三","四","五","六","日"];
     if(language=="en"){
          return this.week_en[this.month]
     }else{
          return this.week_cn[this.month]
     }
}

var date = new Calendar();



//pc端日历调用方法
function CalendarMob(ele,obj){  //ele触发器，id元素
    this.trigger=$("#"+ele);
    if(obj){
          this.months_num = obj.months_num ? obj.months_num : 6;    //一次性绘制日历的个数
          this.display_num = obj.display_num ? obj.display_num : 1;  //默认显示个数
          this.initial_time = obj.initial_time ? obj.initial_time : null;         //初始化时间，第一次打开显示时间，格式必须为yy-mm-dd字符串  
          this.direction = obj.direction ? obj.direction : "after";                  //划分不可点击区域
          this.selected = obj.selected ? obj.selected : null; 
          this.start_time = obj.start_time ? obj.start_time : null; 
          this.end_time = obj.end_time ? obj.end_time : null;
          this.show_yesterday = obj.show_yesterday;
    }else{
          this.months_num = 6;
          this.display_num = 1;
          this.initial_time = null;
          this.direction = "after";   //affter向前，before之后
          this.selected=null; 
          this.start_time = null;
          this.end_time = null;
    }
    
}
CalendarMob.prototype.arr=[];
CalendarMob.prototype.click_callback = null;
CalendarMob.prototype.current_num = 0;
CalendarMob.prototype.style="style_1";  //默认样式风格
CalendarMob.prototype.start_timestamp=null; 
CalendarMob.prototype.end_timestamp=null; 
CalendarMob.prototype.init=function(){ 
      var _this=this;     
      this.panel=$("<div class='ui_calendar "+this.style+"'></div>").appendTo(this.trigger);      
      if(this.initial_time){
          var initial_time_arr = this.initial_time.split("-");                      
          this.calendar = new Calendar(initial_time_arr[0],initial_time_arr[1],initial_time_arr[2]);
      }else{
          this.calendar = new Calendar();
          this.istoday = true;
      }
      this.direction_a = !!this.show_yesterday? this.show_yesterday : this.calendar.year+"-"+this.calendar.month+"-"+this.calendar.day;

      console.log(this.direction_a, this.show_yesterday);
      //定义点的时间戳
      this.initial_timestamp = Date.parse(new Date(this.direction_a.replace(/\-/g,"/")));
      if(this.start_time){
          this.start_timestamp = Date.parse(new Date(this.start_time.replace(/\-/g,"/")));
      }
      if(this.end_time){
          this.end_timestamp = Date.parse(new Date(this.end_time.replace(/\-/g,"/")));
      }
      this.creat_calendar();
      
      
}
CalendarMob.prototype.num=0;
CalendarMob.prototype.creat_calendar=function(){
    var $div=$("<div class='calendar'></div>");
    var title= this.calendar.year+"年"+this.calendar.month + "月";
    var $title = $("<div class='title'>"+title+"</div>").appendTo($div);
    var $table = $("<table class='calendartables"+this.current_num+"'></table>").appendTo($div);
    $div.appendTo(this.panel);
    this.creat_th($table);
    this.creat_tr($table); 
    this.num ++;
    this.current_num ++;
    if(this.num < this.display_num){
         this.creat_nextcalendar();
    }
    if(this.current_num<this.months_num){
          this.creat_nextcalendar();
    }else{
          this.click_num=0;
          var _this=this;
          this.trigger.find(".active").on("click",function(){
               var dataDate=$(this).attr("data-date");
               // 获取28天后的日期
               var afterDate=uddh5.date.getStartXdays(_this.start_time.replace(/\-/g,"/"),28);
               console.log(afterDate)
               if(_this.click_num==0){
                    _this.trigger.find(".active").removeClass("start_time end_time section_time");
                    $(this).addClass("start_time");
                    _this.click_num++;
                    _this.start_time=dataDate;
                    _this.end_time = null;
                    $(this).find("p").text("入住");
               }else if(_this.click_num==1){
                    if(Date.parse(new Date(dataDate.replace(/\-/g,"/")))<=Date.parse(new Date(_this.start_time.replace(/\-/g,"/")))){
                         _this.trigger.find(".active").removeClass("start_time");
                         $(this).addClass("start_time");
                         _this.start_time=dataDate;
                         $(this).find("p").text("入住");
                    }else if(Date.parse(new Date(dataDate.replace(/\-/g,"/")))<=Date.parse(new Date(afterDate.replace(/\-/g,"/")))){
                         $(this).addClass("end_time");
                         $(this).find("p").text("离店");
                         _this.end_time = dataDate;
                         //渲染选中区块样式
                         timearea_style();
                         //alert("渲染完成，请刷新页面");   //todo
                         if(_this.callback){
                             _this.callback();
                         }
                    }else{
                      if(_this.callback){
                             _this.callback();
                         }
                    }
               }
          })
          function timearea_style(){
               var flag=false;
               _this.trigger.find(".active").each(function(){
                     if(flag){
                          $(this).addClass("section_time"); 
                     }  
                     if($(this).hasClass("start_time")){
                          flag=true;
                     }
                     if($(this).hasClass("end_time")){
                          flag=false;
                          $(this).removeClass("section_time"); 
                     }  
                          
               })
          }
    } 

}
CalendarMob.prototype.creat_nextcalendar=function(){
    var month = this.calendar.month;
    var year = this.calendar.year;
    month++;
    if(month > 12){
         month = 1;
         year++;
    }
    this.calendar = new Calendar(year,month);
    this.creat_calendar();
}
CalendarMob.prototype.creat_th=function($table){
    var $tr=$("<tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr>");
    $tr.appendTo($table);
};
CalendarMob.prototype.creat_tr=function($table){
    var _this=this;
    var calendar=this.calendar;
    var rows = Math.ceil(calendar.getRows());
    var firstdays = calendar.getMonthFirstDays();
    var days = calendar.getMonthDays();
    var lastdays =rows*7 - (firstdays-1) - days;  //用于计算单月最后一行，多余的天数
    if(firstdays==0){firstdays=7}
    var str="";
    var len=rows*7;
    for(var m=0;m<rows;m++){
         var $tr = $("<tr></tr>");
         $tr.appendTo($table);
         for(var n=0;n<7;n++){ 
             var $td = $("<td><a href='javascript:void(0)'><span></span><p></p></a></td>").appendTo($tr);
             var $a = $td.find("a");
             var day_text=(m*7)+n-firstdays+2;
             var mo=calendar.month;
             var dt=day_text;
             var date =  calendar.year+"-"+mo+"-"+dt; 
             //console.log(date);  
             if(m==0){
                 if(n<firstdays-1){
                      //console.log("不绘画");
                      $a.addClass("disable");
                 }else{
                      $a.find("span").text(day_text);
                      this.painting($a,date);
                 }                   
             }else if(m==rows-1){                    
                 if(n >= 7-lastdays){
                      //console.log("不绘画");
                      $a.addClass("disable");
                 }else{
                      $a.find("span").text(day_text);
                      //this.creat_price(date,$a);
                      this.painting($a,date);
                 }
             }else{
                 $a.find("span").text(day_text);
                 //this.creat_price(date,$a);
                 this.painting($a,date);
             }
             
             
         }
    }
}
//绘画日历小元素，同时监听点击事件
CalendarMob.prototype.painting=function($a,time){
     var sortTime=Date.parse(new Date(time.replace(/\-/g,"/")));     
     if(this.start_timestamp && this.start_timestamp==sortTime){
          $a.addClass("start_time"); 
          $a.find("p").text("入住");
     }
     if(this.end_timestamp && this.end_timestamp==sortTime){
          $a.addClass("end_time"); 
          $a.find("p").text("离店");
     }
     if(this.start_timestamp && this.end_timestamp && sortTime>this.start_timestamp && sortTime<this.end_timestamp){
          $a.addClass("section_time");
     }
     if(this.direction == "after"){
          if(this.initial_timestamp<=sortTime){
               $a.addClass("active");
               $a.attr("data-date",time);
          }else{
               $a.addClass("disable");
          }
          return ;
     }
     $a.addClass("active");
}




export default CalendarMob;