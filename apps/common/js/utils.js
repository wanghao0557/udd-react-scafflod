var uddh5 = {
	location: {
		queryHash: function() {
			var s = location.hash.split('#')[1];
			if(s.indexOf('?') != -1) {
				s = s.split('?')[0];
			}
			return s;
		},
		queryKey: function(key) {
			var s = location.hash.split('#')[1];
			var output;
			if(s.indexOf('?') != -1) {
				s = s.split('?')[1];
				var arr = s.split('&');
				for(var i = 0; i < arr.length; i++) {
					if(arr[i].indexOf(key) != -1 && arr[i].split('=')[0] === key) {
						output = arr[i].split('=')[1];
						break;
					}
				}
				return output;
			} else {
				return false;
			}
		}
	},
	date: {
		//返回2016-09-10格式的日期
		getDate: function(time) {
			var y = time.getFullYear();
			var m = time.getMonth() + 1;
			var d = time.getDate();
			if(m < 10) {
				m = '0' + m;
			}
			if(d < 10) {
				d = '0' + d;
			}
			return y+'-'+m+'-'+d;
		},
		//获取当前的日期，格式为2016-09-10
		getNowDate: function() {
			var date = new Date();
			return this.getDate(date);
		},
		//获取给定日期几天后的日期，格式：2016-09-10
		getStartXdays: function(startDate, x) {
			var date = new Date(startDate);
			date.setDate(date.getDate()+x);
			return this.getDate(date);
		},
		//获取几天后的日期，格式： 2016-09-10
		getXdayslater: function(x) {
			var date = new Date();
			date.setDate(date.getDate() + x);
			return this.getDate(date);
		},
		//获取几个月后的日期，格式：2016-09-10
		getXmonthlater: function(x) {
			var date = new Date();
			date.setMonth(date.getMonth() + x);
			return this.getDate(date);
		},
		//获取两个日期的天数差值 IOS 2016-09-10格式的日期不能使用new Date()
		getDiffDay: function(end, start) {
			var arrDate, endDate, startDate, iDays;
			arrDate = end.split('-');
			endDate = new Date(arrDate[1]+'/'+arrDate[2]+'/'+arrDate[0]);//转换为12/18/2016格式
			arrDate = start.split('-');
			startDate = new Date(arrDate[1]+'/'+arrDate[2]+'/'+arrDate[0]);
			iDays = parseInt(Math.abs(endDate - startDate) / 1000 / 60 / 60 / 24);
			return iDays
		}
	},
	storage: {
		set: function(key, value) {
			var curtime = new Date().getTime();
			localStorage.setItem(key, JSON.stringify({val: value, time: curtime}));
		},
		get: function(key, exp) {
			var val = localStorage.getItem(key);
			var dataObj = JSON.parse(val);
			var output = null;
			if(exp && dataObj.time) {
				if(new Date().getTime() - dataObj.time > exp) {
					output = 'expires';//过期了
					this.del(key);
				} else {
					output = dataObj.val;
				}
			} else {
				output = dataObj.val;
			}
			return output;
		},
		del: function(key) {
			localStorage.removeItem(key);
		},
		clearAll: function() {
			localStorage.clear();
		}
	},
	//jsbridge
	bridgeIndex: 0,
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
    getCookie: function(key) {
    	var val;
    	var cookies = document.cookie.split(';');
    	for(var i = 0; i< cookies.length; i++) {
    		if(cookies[i].split('=')[0] === key) {
    			val = cookies[i].split('=')[1];
    			break;
    		}
    	}
    	return val;
    }
};

export default uddh5;