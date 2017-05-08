var uddh5={
  // 正式环境url正式环境url
  // apihost:"https://api.uddtrip.com/uddtriph5",

  // 预发布环境url
  // apihost:"http://prt.uddtrip.com/uddtriph5",
  
  // 测试环境url
  apihost:"",
	//location数据查询
	location:{
		queryHash:function(){
            var s = location.hash.split("#")[1];  //location.hash得到网址第一个#以后的所有字符串 .split在#位置分割字符串并返回数组        
            if(s.indexOf("?")>=0){  // indexOf 检索字符串中第一个?出现的位置 返回下标
            	s = s.split("?")[0];  // 以问号位置分割字符串 返回数组第0项
            }
            return s;  
		},
		queryKey:function(key){
            var s = location.hash.split("#")[1];
            var output=null;
            if(s.indexOf("?")>=0){
            	s = s.split("?")[1];
            	var a = s.split("&");  // 以&符分割字符串  并返回数组 
            	for(var i=0;i<a.length;i++){  // 循环数组a 
                   if(a[i].indexOf(key)>=0 && a[i].split("=")[0]==key){   // 判断key在a中出现的位置
                        output = a[i].split("=")[1];
                        break ;
                   }
            	}
            	return output;
            }else{
            	return false;
            }
		}
	},
	//日期方法
	date:{
		getCurrentdate:function(){ //获取当前日期
			var date = new Date();
			return this.getDate(date); //getDate（返回日期中的天  1-31）
		},
    //获取指定日期几天后的日期
    getStartXdays: function(startDate, x){
      var date1 = new Date(startDate);
      var date2 = new Date(date1);
      date2.setDate(date1.getDate()+x);
      return this.getDate(date2);
    },
		getXdayslater:function(x){ //获取几天后的日期
			var date1 = new Date();
			var date2 = new Date(date1);
			date2.setDate(date1.getDate()+x);
      return this.getDate(date2);
		},
		getXmonthlater:function(x){ //获取几个月后的日期
      var date1 = new Date();
			var date2 = new Date(date1);
			date2.setMonth(date1.getMonth()+x);
      return this.getDate(date2);
		},
		getDate:function(time){
			var y = time.getFullYear();
			var m = time.getMonth()+1;
			if(m<10){
				m = "0"+m;
			}
			var d = time.getDate();
			if(d<10){
				d = "0"+d;
			}
			return y+"-"+m+"-"+d
		},
    gitDiffDay:function(end,start){  //获取两个日期的差值
       var  aDate,  oDate1,  oDate2,  iDays  
       aDate  =  end.split("-")  
       oDate1  =  new  Date(aDate[1]  +  '/'  +  aDate[2]  +  '/'  +  aDate[0])    //转换为12-18-2016格式  
       aDate  =  start.split("-")  
       oDate2  =  new  Date(aDate[1]  +  '/'  +  aDate[2]  +  '/'  +  aDate[0])
       iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)      
       return  iDays
    }
	},
    //本地存储，项目中使用localStorage
    stg:{
    	set:function(key,value){
    		 var curtime = new Date().getTime();
    		 localStorage.setItem(key,JSON.stringify({val:value,time:curtime}));
    	},
    	get:function(key,exp){
             var val = localStorage.getItem(key);
             var dataobj = JSON.parse(val);
             var output = null;
             if(exp && dataobj.time){   //设置过期时间
                  if(new Date().getTime() - dataobj.time > exp){
                  	     output="expires"; //过期
                  	     this.del(key);
                  }else{
                  	     output=dataobj.val;
                  }
             }else{
                 output=dataobj.val;
             }
             return output;
    	},
    	del:function(key){
             localStorage.removeItem(key);
    	},
    	clearAll:function(){
    		 localStorage.clear();
    	}
    },
    //jsbridge
    bridgeindex:0, 
    bridge:function(fn,obj){
          var ua = navigator.userAgent.toLowerCase();
          console.log(obj)  
          if (/iphone|ipad|ipod/.test(ua)) {
                function setupWebViewJavascriptBridge(callback){
                      if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
                      if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
                      window.WVJBCallbacks = [callback];
                      var WVJBIframe = document.createElement('iframe');
                      WVJBIframe.style.display = 'none';
                      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                      document.documentElement.appendChild(WVJBIframe);
                      setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
                }
                setupWebViewJavascriptBridge(function(bridge) {
                    if(obj){
                        bridge.callHandler('webview_call_native', obj, function(response){});
                    }
                    bridge.registerHandler('native_call_webview', function(data,response) {
                        fn(data);
                    })
                });
          } else if (/android/.test(ua)) {
                function connectWebViewJavascriptBridge(callback) {
                    if (window.WebViewJavascriptBridge) {
                        return callback(WebViewJavascriptBridge)
                    } else {
                        document.addEventListener(
                            'WebViewJavascriptBridgeReady'
                            , function() {
                                return callback(WebViewJavascriptBridge)
                            },
                            false
                        );
                    }

                }
                connectWebViewJavascriptBridge(function(bridge) {
                    if(uddh5.bridgeindex==0){
                           bridge.init(function(message,  responseCallback) {});
                           uddh5.bridgeindex++;
                    }
                    
                    bridge.callHandler(
                        "webview_call_native",
                        obj,
                        function(responseData) {}

                    );
                    bridge.registerHandler("native_call_webview", function(data, responseCallback) {
                         fn(data);
                    });
                })
          }
    },

    //{"1002040100:清迈": 5}格式的数据转换为数组格式[{id: 1002040100, name: '清迈', num: 5}]
    separateAggObj: function(obj){
      var converts=[];
      var objs=JSON.stringify(obj).split(',');
      for(var i=0; i<objs.length; i++){
        var subs=objs[i].replace(/\{*\"*\}*/g, '').split(':');
        converts.push({id: subs[0], name: subs[1], num: subs[2]});
      }
      return converts;
    },
    getCookie: function(name){
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
      }else{
        return;
      }
    }
    
}
export default uddh5