import React from 'react'
import uddh5 from '../../common/js/common.js'

var XingCheng=React.createClass({
  toggleNative: function(){
    //与app的交互
     var requestHybrid={
        tagname: 'forward',
        topage:'detail',
        type:"native",
        param: {
          typeId: "10117",
          text: "游大大旅行客户端帮我预定了上海希尔顿酒店￥898的一间上午特价房，双早。地址：华山路888号 日期：05-26至05-21。快来@游大大旅行 开启自己的旅程吧！客户端下载地址",
          url: "http://m.uddctrip.com/app/"
        }
     }
     var native_callback=function(data){
          
     }
     uddh5.bridge(native_callback,requestHybrid);
  },
  render: function(){
    return (
      <div className="trip-share">
        <h2>行程信息</h2>
        <ul>
          <li className="item">
            <p>游大大旅行客户端帮我预定了上海希尔顿酒店￥898的一间上午特价房，双早。地址：华山路888号 日期：05-26至05-21。快来@游大大旅行 开启自己的旅程吧！客户端下载地址http://m.uddctrip.com/app/</p>
            <div className="absolute-middle share-btn">
              <a href="javascript:void(0)" onClick={this.toggleNative}>分享</a>
            </div>
          </li>
          <li className="item">
            <p>游大大旅行客户端帮我预定了上海希尔顿酒店￥898的一间上午特价房，双早。地址：华山路888号 日期：05-26至05-21。快来@游大大旅行 开启自己的旅程吧！客户端下载地址http://m.uddctrip.com/app/</p>
            <div className="absolute-middle share-btn">
              <a href="javascript:void(0)" onClick={this.toggleNative}>分享</a>
            </div>
          </li>
        </ul>
      </div>
    );
  }
});

var JiuDian=React.createClass({
  toggleNative: function(){
    //与app的交互
     var requestHybrid={
        tagname: 'forward',
        topage:'detail',
        type:"native",
        param: {
          typeId: "10117",
          text: "游大大旅行客户端帮我预定了上海希尔顿酒店￥898的一间上午特价房，双早。地址：华山路888号 日期：05-26至05-21。快来@游大大旅行 开启自己的旅程吧！客户端下载地址",
          url: "http://m.uddctrip.com/app/"
        }
     }
     var native_callback=function(data){
          
     }
     uddh5.bridge(native_callback,requestHybrid);
  },
  render: function(){
    return (
      <div className="trip-share">
        <h2>酒店信息</h2>
        <ul>
          <li className="item">
            <p>游大大旅行客户端帮我预定了上海希尔顿酒店￥898的一间上午特价房，双早。地址：华山路888号 日期：05-26至05-21。快来@游大大旅行 开启自己的旅程吧！客户端下载地址http://m.uddctrip.com/app/</p>
            <div className="absolute-middle share-btn">
              <a href="javascript:void(0)" onClick={this.toggleNative}>分享</a>
            </div>
          </li>
          <li className="item">
            <p>游大大旅行客户端帮我预定了上海希尔顿酒店￥898的一间上午特价房，双早。地址：华山路888号 日期：05-26至05-21。快来@游大大旅行 开启自己的旅程吧！客户端下载地址http://m.uddctrip.com/app/</p>
            <div className="absolute-middle share-btn">
              <a href="javascript:void(0)" onClick={this.toggleNative}>分享</a>
            </div>
          </li>
        </ul>
      </div>
    );
  }
});
var HotelShare=React.createClass({
  componentDidMount: function(){
    //与app的交互
    var requestHybrid={
       tagname: 'forward',
       topage:'detail',
       type:"native",
       param: {
           typeId: "c10107",
           title:"分享行程"
       }
    }
    var native_callback=function(data){
          
    }
    uddh5.bridge(native_callback,requestHybrid);
  },
  render: function(){
    return(
      <div>
        <XingCheng />
        <JiuDian />
      </div>
    );
  }
});
export default HotelShare