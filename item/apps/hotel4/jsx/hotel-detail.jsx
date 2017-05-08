import React from 'react'
import {Link} from 'react-router'
import calendar from '../js/calendar/calendar.js'
import uddh5 from '../../common/js/common.js'
import BaiduMobStat from '../../common/js/mobstat.js'
import LazyLoad from 'react-lazyload'
require("../js/calendar/calendar.css")
import Debug from '../../common/ui/debug/debug.jsx'
require('../../common/ui/debug/debug.scss')
var loading=require('../img/loading.gif');
var HotelIntro=React.createClass({
  getInitialState: function(){
    return{
      hotelId: '',
      generalFacilitiesName: '',
      activityFacilitiesName: '',
      serviceItemName: '',
      introduction: ''
    };
  },
  componentDidMount: function(){
    var hotelid = uddh5.location.queryHash().split("/")[2];
    $.post(uddh5.apihost+'/getelonghotelfacinfo', {id: hotelid,resourceType:uddh5.location.queryKey('resourceType')}, function(data){
      var data=data.data;
      if(this.isMounted()){
        this.setState({
          hotelId: data.hotelId,
          generalFacilitiesName: data.generalFacilitiesName,
          activityFacilitiesName: data.activityFacilitiesName,
          serviceItemName: data.serviceItemName,
          introduction: data.introduction
        });
      }
    }.bind(this));
  },
  toggleRoomList: function(){
   //与app的交互
   var requestHybrid={
      tagname: 'forward',
      topage:'roomlist',
      type:"native",
      item:"hotel",
      param: {
          typeId: "10110",
          // id: uddh5.location.queryHash().split("/")[2],
          id: this.props.hotelId,
          resourceType:uddh5.location.queryKey('resourceType')
      }
   }
   var native_callback=function(data){
        
   }
   uddh5.bridge(native_callback,requestHybrid);
  },
  render: function(){
    var sheshi = this.state.generalFacilitiesName+this.state.activityFacilitiesName+this.state.serviceItemName;
    var introduction=this.state.introduction.replace(/<[^<>]+>/g, '');
    introduction = $.trim(introduction.replace(/&nbsp;/g, ''));
    // var udd=require('../img/udd.png');
    return (
      <div className="hotel-intro">
        <div className="hi-img">
          <a href="javascript:void(0)" onClick={this.toggleRoomList}>
            <img src={this.props.hotelHeadPic}/>
            {/*
              this.props.hotelHeadPic ? <img src={this.props.hotelHeadPic}/>:<img src={udd}/>
            */}
            <div className="caption">{this.props.hotelname} <em>{this.props.star?"["+this.props.star+"]":''}</em></div>
          </a>
        </div>
        <div className="hi-content">
          {/*<Link className={'dianping item'} to={{ pathname: "/dianping", query: {hotelId: hotelid} }}>
              <div className="score fixed-item">
                <b>{this.props.commentavg}</b>
                分
              </div>
              <div className="num">
                    <i className="left-icon hotel-icon icon-message1"></i>
                    {this.props.commentSum}条点评
                    <i className="hotel-icon icon-youyou cicon-gray right-icon"></i>
                     
              </div>
          </Link>*/}
          <Link className={'intro item'} to={{ pathname: "/info/"+uddh5.location.queryHash().split("/")[2], query: {starttime: this.props.starttime, endtime: this.props.endtime,resourceType:uddh5.location.queryKey('resourceType')}}}>
            <div className="xq-info">
              <p>{introduction.substring(0, 15)+'...'}</p>
              <p className="icons">
                {sheshi.indexOf('免费停车场') !== -1? <i className="hotel-icon icon-parking"></i> : ''}
                {sheshi.indexOf('健身室') !== -1? <i className="hotel-icon icon-fitness"></i> : ''}
                {sheshi.indexOf('24小时热水') !== -1? <i className="hotel-icon icon-shower"></i> : ''}
                {sheshi.indexOf('前台贵重物品保险柜') !== -1? <i className="hotel-icon icon-lock"></i> : ''}
                {sheshi.indexOf('餐饮') !== -1? <i className="hotel-icon icon-chazi"></i> : ''}
                {sheshi.indexOf('叫醒服务') !== -1? <i className="hotel-icon icon-clock"></i> : ''}
              </p>
            </div>
            <div className="fixed-item">详情<i className="hotel-icon icon-youyou cicon-gray right-icon"></i></div>
          </Link>
        </div>
      </div>
    );
  }
});

var HotelAside=React.createClass({
  toggleLonLat: function(){
   //与app的交互
   var requestHybrid={
      tagname: 'forward',
      topage:'map',
      type:"native",
      item:"hotel",
      param: {
          typeId: "10111",
          lon: this.props.lon,
          lat: this.props.lat,
          detailAddress: this.props.detailAddress,
          name: this.props.hotelname,
          commentavg: this.props.commentavg,
          stattprice: this.props.price
      }
   }
   var native_callback=function(data){
        
   }
   uddh5.bridge(native_callback,requestHybrid);
  },
  jiaoTong: function(){
   //与app的交互
   var requestHybrid={
      tagname: 'jump',
      topage:'map',
      type:"native",
      item:"hotel",
      param: {
          typeId: "10114",
          lon: this.props.lon,
          lat: this.props.lat,
          id: "1"
      }
   }
   var native_callback=function(data){
        
   }
   uddh5.bridge(native_callback,requestHybrid);
  },

  meiShi: function(){
   //与app的交互
   var requestHybrid={
      tagname: 'jump',
      topage:'map',
      type:"native",
      item:"hotel",
      param: {
          typeId: "10114",
          lon: this.props.lon,
          lat: this.props.lat,
          id: "2"
      }
   }
   var native_callback=function(data){
        
   }
   uddh5.bridge(native_callback,requestHybrid);
  },
  jingDian: function(){
   //与app的交互
   var requestHybrid={
      tagname: 'jump',
      topage:'map',
      type:"native",
      item:"hotel",
      param: {
          typeId: "10114",
          lon: this.props.lon,
          lat: this.props.lat,
          id: "3"
      }
   }
   var native_callback=function(data){
        
   }
   uddh5.bridge(native_callback,requestHybrid);
  },
  yuLe: function(){
   //与app的交互
   var requestHybrid={
      tagname: 'jump',
      topage:'map',
      type:"native",
      item:"hotel",
      param: {
          typeId: "10114",
          lon: this.props.lon,
          lat: this.props.lat,
          id: "4"
      }
   }
   var native_callback=function(data){
        
   }
   uddh5.bridge(native_callback,requestHybrid);
  },
  gouWu: function(){
   //与app的交互
   var requestHybrid={
      tagname: 'jump',
      topage:'map',
      type:"native",
      item:"hotel",
      param: {
          typeId: "10114",
          lon: this.props.lon,
          lat: this.props.lat,
          id: "5"
      }
   }
   var native_callback=function(data){
        
   }
   uddh5.bridge(native_callback,requestHybrid);
  },
  render: function(){
    return (
      <div className="hotel-aside">
        <a className="item" href="javascript:void(0)" onClick={this.toggleLonLat}>
          <div className="address">
            <i className="left-icon hotel-icon icon-location3 cicon-gray"></i>
            <span>{this.props.detailAddress}</span>
          </div>
          <div className="map fixed-item">地图<i className="hotel-icon icon-youyou cicon-gray right-icon"></i></div>
        </a>
        {/*<div className="item aside">
          <div className="aside-label">
            <i className="left-icon hotel-icon icon-signal cicon-gray"></i>
            <span>周边：</span>
          </div>
          <div className="aside-links">
            <a href="javascript:void(0)" onClick={this.jiaoTong}>交通</a>
            <a href="javascript:void(0)" onClick={this.meiShi}>美食</a>
            <a href="javascript:void(0)" onClick={this.jingDian}>景点</a>
            <a href="javascript:void(0)" onClick={this.yuLe}>娱乐</a>
            <a href="javascript:void(0)" onClick={this.gouWu}>购物</a>
          </div>
        </div>*/}
      </div>
    );
  }
});

var RoomList=React.createClass({
  gotoLogin: function(){
     var that=this;
     var requestHybrid={
        tagname: 'jump',
        topage:'login',
        type:"app",
        item:"hotel",
        param: {
            typeId: "10152"
        }
     }
     var native_callback=function(data){
        var data=JSON.parse(data);
        data=data.param;
        that.props.getLogin(data.tokenId);
     }
     uddh5.bridge(native_callback,requestHybrid); 
  },
  ToggleClick: function(elem, roomTypes, event){
    console.log('dd');
    var target=$(event.target);
    var roomItem=target.closest('.room-item');
    roomItem.toggleClass('open');
    // setTimeout(function(){
    //   var roomLength=!!roomTypes? roomTypes.length : '';
    //   var hasScroll=$(document).height() - window.innerHeight;
    //   if(hasScroll > 1 && roomTypes[roomLength - 1] == elem){
    //     $('body').scrollTop($(document).height());
    //     console.log($(document).height())
    //   }
    // }, 0);
  },
  render: function(){
    var _this=this;
    var uddpic=require('../img/udd.png');
    return (
      <div className="room-list">
        {$.map(this.props.roomType, function(elem, index){
          return (
            <div id={'roomlist_'+index} key={index} className={(index == 0)? 'room-item open' : 'room-item'}>
                <div className="room-info clearfix">
                      <Link className="media pull-left" to={{pathname: "/roominfo", query: {productId: elem.hotelProduct[0].productId, starttime: this.props.starttime, endtime: this.props.endtime, productType: elem.hotelProduct[0].producttype, elonghotelId: elem.hotelProduct[0].elonghotelId || '0', elonghotelCode: elem.hotelProduct[0].elonghotelCode || '0', elongroomTypeId: elem.hotelProduct[0].elongroomtypeId || '0', elongproductId: elem.hotelProduct[0].elongproductId || '0',elongroomId:elem.roomId,resourceType:uddh5.location.queryKey('resourceType')}}}>
                        <div className="media-left pull-left">
                          {/*<img className="media-object" src={!!elem.picurl? elem.picurl.split(',')[0] : ''}/>*/}
                          <LazyLoad height={'1.9rem'}>
                            {
                              elem.picurl ? <img className="media-object" src={!!elem.picurl? elem.picurl.split(',')[0] : ''}/>:<img className="media-object" src={uddpic}/>
                            }
                          </LazyLoad>
                        </div>
                        <div className="media-body">
                          <h3>{elem.roomTypeName}</h3>
                          <p className="size">
                            <span>{elem.buildingArea}m<sup>2</sup></span>
                          </p>
                        </div>
                      </Link>
                      <div className="room-book absolute-middle" onClick={this.ToggleClick.bind(this, elem, this.props.roomType)}>
                          <div className="price">
                            <p><span className="currency">￥</span><strong>{elem.stattprice}</strong>起</p>
                            {
                            //elem.buildingArea?<p className="label-icons"><span className="label-icon">返</span></p>:"55"
                            }
                            
                            </div>
                            <div className="absolute-middle"><i className="hotel-icon icon-up"></i><i className="hotel-icon icon-down"></i></div>
                      </div>
                </div>
                {$.map(elem.hotelProduct, function(item, num){
                  return (
                    item.productName? <div key={num} className="sub-room padding-inner">
                        <div className="sub-room-inner clearfix">
                          <div className="media pull-left">
                            <h3><Link to={{pathname: "/room",query: {productId: item.productId, starttime: this.props.starttime, endtime: this.props.endtime, productType: item.producttype, elonghotelId: item.elonghotelId || '0', elonghotelCode:item.elonghotelCode || '0', elongroomTypeId: item.elongroomtypeId || '0', elongproductId:item.elongproductId || '0',elongroomId:elem.roomId,resourceType:uddh5.location.queryKey('resourceType')}}}>{item.productName}</Link></h3>
                            <p className="size cicon-gray">
                              <span>{item.includingbreakfastNane=="不含" ? "无早":item.includingbreakfastNane} {elem.bedType}</span>
                              <span style={{color: '#f70'}}>{item.currentAlloment > 0? ` 仅剩${item.currentAlloment}间` : '' }</span>
                            </p>
                            <p className="size black">
                              <span>{item.refundPolicyName}  {item.refundRuleName}</span>
                            </p>
                          </div>
                          <div className="room-book clearfix absolute-middle">
                            <div className="price-box">
                              <p className="price"><span className="currency">￥</span><strong>{item.productPrice}</strong></p>
                              <p className="size" style={{color: '#000'}}>{item.isforeverguarantee == 1? '需要担保' : ''}</p>
                            </div>
                            {item.issell ==1? <div className="order-btn yellow-btn">{this.props.isLogin? <Link to={{ pathname: "/order/"+uddh5.location.queryHash().split("/")[2]+"/"+elem.roomTypeId+"/"+item.productId, query: {starttime:this.props.starttime, endtime: this.props.endtime, productType: item.producttype, elonghotelId: item.elonghotelId || '0', elonghotelCode:item.elonghotelCode || '0', elongroomTypeId: item.elongroomtypeId || '0', elongproductId:item.elongproductId || '0',elongroomId:elem.roomId,resourceType:uddh5.location.queryKey('resourceType')}}}>
                                <p>预订</p>
                                <p>{item.paymenttype == 3? '到店付' : item.paymenttypeName}</p>
                              </Link> : <a href="javascript:void(0)" onClick={this.gotoLogin}><p>预订</p>
                                <p>{item.paymenttype == 3? '到店付' : item.paymenttypeName}</p></a>}</div> : <div className="order-btn gray-btn"><div><p>订完</p><p>{item.paymenttype == 3? '到店付' : item.paymenttypeName}</p></div></div>}
                          </div>
                        </div>
                      </div> :  <div key={num} className="sub-room padding-inner" style={{height: '80px'}}><div className="product-room hide" style={{zIndex: 99, backgroundColor: '#fff', top: 0, left: 0, bottom: 0, right: 0, position:'absolute', textAlign: 'center'}}><img style={{width: '18px', height: '18px', position: 'absolute', top: '50%', left: '50%', marginTop: '-9px', marginLeft: '-9px'}} src={loading}/></div></div>
                  )
                }.bind(this))}
            </div>
          )
        }.bind(this))}
      </div>
    );
  }
});

var RoomFilter=React.createClass({
  getInitialState: function(){
    return {
       hotelid:null,
       startM:"",
       startD:"",
       endM:"",
       endD:"",
       dDay:0,
       roomType: [],
       roomPosted: false
    }
  },
  setCalandar:function(obj){
      var st = obj.starttime;
      var et = obj.endtime;
     
     var id = uddh5.location.queryHash().split("/")[2];
     if(!st || !et){
        return false;
     }
     var day=uddh5.date.gitDiffDay(et,st);
     this.setState({
         hotelid:id,
         startM:st.split("-")[1],
         startD:st.split("-")[2],
         endM:et.split("-")[1],
         endD:et.split("-")[2],
         dDay:day
     });
     this.getRoomtype(id,st,et);
  },
  componentDidMount:function(){
     var obj={};
     obj.starttime=this.props.starttime;
     obj.endtime=this.props.endtime;
     this.setCalandar(obj);
  },

  getRoomtype:function(hotelid,starttime,endtime){
     $.post(uddh5.apihost+'/getelongapphotelroomtype', {hotelId:hotelid,startDate:starttime,endDate:endtime,resourceType:uddh5.location.queryKey('resourceType')}, function(data){
          var roomlist=data.data.roomType;
          if(this.isMounted()){
                this.setState({
                    roomType:roomlist,
                    roomPosted: true
                });
          }
     }.bind(this))
  },

  handerClick:function(){
       //var jump=location.origin+location.pathname+"#/calendar?starttime="+this.state.starttime+"&endtime="+this.state.endtime&yesterday=2017-03-19;
       //与app的交互
       var _this=this;
       var id = uddh5.location.queryHash().split("/")[2];
       var requestHybrid={
          tagname: 'jump',
          topage:'calendar',
          type:"webview",
          item:"hotel",
          param: {
              typeId: "10122",
              starttime:this.props.starttime,
              endtime:this.props.endtime
          }
       }
       var native_callback=function(data){
          var data=JSON.parse(data);
          data=data.param;
          var st=data.starttime;
          var et=data.endtime;
          var day=uddh5.date.gitDiffDay(et,st);
          _this.setState({
             starttime:st,
             endtime:et,
             startM:st.split("-")[1],
             startD:st.split("-")[2],
             endM:et.split("-")[1],
             endD:et.split("-")[2],
             dDay:day,
             roomPosted: false
          });
          _this.getRoomtype(id,st,et);
          _this.props.getTime(st, et);
          _this.replaceHistory(st, et);
       }
       uddh5.bridge(native_callback,requestHybrid);
       //this.replaceHistory('2017-03-18', '2017-03-20')
  },
  replaceHistory: function(starttime, endtime){
    var pathname=location.pathname;
    window.history.replaceState({}, '', pathname+'#/detail/'+uddh5.location.queryHash().split("/")[2]+'?starttime='+starttime+'&endtime='+endtime);
  },
  render: function(){
    return (
      <div>
          <div className="room-filter">
            <div className="rdate item" onClick={this.handerClick}>
              <div className="rdate-calendar">
                <i className="cicon-gray left-icon  hotel-icon icon-calendar"></i>
                {this.state.startM}月{this.state.startD}日-{this.state.endM}月{this.state.endD}日
              </div>
              <div className="rdate-result fixed-item">
                <span>共{this.state.dDay}天</span>
                <i className="hotel-icon icon-youyou cicon-gray right-icon"></i>
              </div>
            </div>
          </div>
          <div style={{position: 'relative'}}>
            <div className={this.state.roomPosted? 'hide' : ''} style={{zIndex: 99, backgroundColor: '#fff', top: 0, left: 0, bottom: 0, right: 0, position:'absolute', textAlign: 'center'}}><img style={{width: '18px', height: '18px', position: 'absolute', top: '20px',}} src={loading}/></div>
            <RoomList isLogin={this.props.isLogin} roomType={this.state.roomType} starttime={this.props.starttime} endtime={this.props.endtime} hotelname={this.props.hotelname} getLogin={this.props.getLogin} />
          </div>
      </div>
    );
  }
});

var HotelDetail=React.createClass({
  getDefaultProps:function(){
    return{
      tokenId:uddh5.getCookie('tokenId')
    }
  },
  getInitialState: function(){
    return {
      hotelname: '',
      star: '',
      commentSum: '',
      commentavg: '',
      hotelHeadPic: '',
      hotelPic: '',
      sheshi: [],
      hotelId: '',
      lon: '',
      lat: '',
      detailAddress: '',
      price: '',
      isLogin: false,
      isCollection: '',
      starttime:uddh5.location.queryKey('starttime'),
      endtime:uddh5.location.queryKey('endtime')
    }
  },
  getLogin: function(id){
    this.setState({
      isLogin: !!id? true : false
    });
  },
  getTime: function(start, end){
    this.setState({
      starttime: start,
      endtime: end
    });
  },
  componentWillMount: function(){
    BaiduMobStat.onPageStart('Details');
  },
  componentDidMount: function(){
      var that = this;
      this.setState({
        isLogin: !!that.props.tokenId? true : false
      });
      $.post(uddh5.apihost+'/getelonghotelbasisinfo', {id:uddh5.location.queryHash().split("/")[2], userId: uddh5.getCookie('userId'),resourceType:uddh5.location.queryKey('resourceType')}, function(data){
        var data=data.data;
        this.setState({
          hotelname: data.hotelName,
          star: data.hotelClassName,
          commentSum: data.commentNum,
          commentavg: data.hotelScore,
          hotelHeadPic: data.hotelHeadPic,
          hotelPic: data.hotelPicNum,
          hotelId: data.hotelId,
          lon: !!data.location? data.location.lon : '',
          lat: !!data.location? data.location.lat : '',
          detailAddress: data.detailAddress,
          isCollection: data.iscollection
        });
        //与app的交互 categoryId:7=>酒店收藏
        var requestHybrid={
            tagname: 'forward',
            topage:'title',
            type:"native",
            param: {
                typeId: "c10101",
                title:that.state.hotelname,
                currentData: uddh5.date.getCurrentdate(),
                imgUrl: that.state.hotelHeadPic,
                productId: uddh5.location.queryHash().split("/")[2],
                categoryId: "7",
                isCollection: that.state.isCollection
            }
        }
        var native_callback=function(data){
            var data=JSON.parse(data);
            data=data.param;
            that.getLogin(data.tokenId);
        }
        uddh5.bridge(native_callback,requestHybrid); 
      }.bind(this));
  },
  componentWillUnmount: function(){
    BaiduMobStat.onPageEnd('Details');
  },
  render: function(){
    var hotelPic=this.state.hotelPic;
    return (
      <div className="hotel-info-inner">
        <HotelIntro commentSum={this.state.commentSum} commentavg={
          this.state.commentavg} hotelHeadPic={this.state.hotelHeadPic} hotelPic={this.state.hotelPic} hotelId={this.state.hotelId} hotelname={this.state.hotelname} star={this.state.star} starttime={this.state.starttime} endtime={this.state.endtime}/>
        <HotelAside lon={this.state.lon} lat={this.state.lat} detailAddress={this.state.detailAddress} hotelname={this.state.hotelname} commentavg={
          this.state.commentavg} price={this.state.price} />
        <RoomFilter isLogin={this.state.isLogin} getLogin={this.getLogin} getTime={this.getTime} starttime={this.state.starttime} endtime={this.state.endtime}/>
      </div>
    );
  }
});
export default HotelDetail
