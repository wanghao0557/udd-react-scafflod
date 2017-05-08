import React from 'react'
import {Link} from 'react-router'
import uddh5 from '../../common/js/common.js'
import Slider from 'react-slick'
import BaiduMobStat from '../../common/js/mobstat.js'
var FooterPlaceholer=React.createClass({
  render: function(){
    return (
      <div className="footer-placeholder"></div>
    );
  }
});

var RoomBanner=React.createClass({
  render: function(){
    var total=this.props.imgItems.length;
    var settings = {
      customPaging: function(i) {
        return <span className="indicate">{(i+1)+' / '+total}</span>
      },
      dots: true,
      infinite: true,
      speed: 1000,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      autoplay: true
    };
    return (
      <div className="room-banner">
        <div className="room-img">
          {!!this.props.imgItems? <Slider {...settings}>
            {$.map(this.props.imgItems, function(elem, index){
              return (
                <a key={index} href="javascript: void(0)">
                  <img src={elem}/>
                </a>
              )
            })}
          </Slider> : ''}
        </div>
      </div>
    );
  }
});

var RoomOffer=React.createClass({
  getInitialState: function(){
    return {
      showMoreBtn: true,
      limit: 6
    }
  },
  showMore: function(e){
    this.setState({
      showMoreBtn: false,
      limit: this.state.sheshi
    });
  },
  hideMore: function(){
    this.setState({
      showMoreBtn: true,
      limit: 6
    });
  },
  renderMoreBtn: function(){
    if(!this.state.showMoreBtn){
      return(
        <div className="more">
          <a href="javascript: void(0)" onClick={this.hideMore}>收起<i className="hotel-icon icon-upup right-icon"></i></a>
        </div>
      );
    }
    return(
      <div className="more">
        <a href="javascript: void(0)" onClick={this.showMore}>查看更多房型设施<i className="hotel-icon icon-downdown right-icon"></i></a>
      </div>
    );
  },
  render: function(){
    var sheshis=this.props.sheshi.slice(0, this.state.limit);
    return(
      <div className="room-offer room_info">
        <div ref="roomSheshis" className="room-offer-inner">
          {$.map(sheshis, function(elem, index){
              return (
                <dl key={index} className="clearfix">
                  <dt><i className={"hotel-icon left-icon "+elem.icon}></i></dt>
                  <dd>{elem.text}</dd>
                </dl>
              );
            })}
        </div>
        {this.renderMoreBtn()}
      </div>
    );
  }
});

var Footer=React.createClass({
  componentDidMount:function(){

  },
  render: function(){
    return(
      <footer className="clearfix">
        <div className="total pull-left">总额：￥<strong>{this.props.productPrice}</strong>
        </div>
        <div className="btns pull-right">
          <Link className="btn btn-orange" to={{pathname: "/order", query: {hotelId: 123, roomId:2}}}>去预订</Link>
        </div>
      </footer>
    );
  }
});

var RoomInfo=React.createClass({
  getInitialState: function(){
    return {
      name: '',
      imgItems: '',
      awards: {
          dianping:0,
          tuijian:0,
          gaishan:0
      },
      sheshi: [],
      facilities: [],
      checkinTime:"",
      departureTime:"",
      productName:"",
      productPrice:null,
      issell:0,
      includingbreakfastNane: ''
    };
  },
  componentWillMount: function(){
    BaiduMobStat.onPageStart('Room-type-specific');
  },
  componentDidMount: function(){ 
    var proid=uddh5.location.queryKey("productId");
    var st=uddh5.location.queryKey("starttime");
    var et=uddh5.location.queryKey("endtime");
    var productType= uddh5.location.queryKey('productType');
    var sheshis=[];
    $.post(uddh5.apihost+'/gethotelproductinfo', {productId: proid,startDate:st,endDate:et, productType: productType, elonghotelId: uddh5.location.queryKey('elonghotelId'), elonghotelCode: uddh5.location.queryKey('elonghotelCode'), elongroomTypeId: uddh5.location.queryKey('elongroomTypeId'), elongproductId: uddh5.location.queryKey('elongproductId')}, function(data){
      //  数据请求回来以后  停止loading
      var requestHybrid = {
          tagname: 'forward',
              topage:'order',
              type:"native",
              item:'hotel',
              param: {
                  typeId: "10181"
              }
        }
      var native_callback=function(data){
                
      }
      uddh5.bridge(native_callback,requestHybrid);
      var data=data.data;
      if(!!data.hotelProduct.includingbreakfastNane){
        sheshis.push({text: data.hotelProduct.includingbreakfastNane, icon: "icon-chazi"});
      }
      if(!!data.buildingArea){
        sheshis.push({text: data.buildingArea+"平方米", icon: "icon-pingfang"});
      }
      if(!!data.maxPerson){
        sheshis.push({text: data.maxPerson, icon: "icon-person"});
      }
      if(!!data.isAddBedName){
        sheshis.push({text: data.isAddBedName, icon: "icon-jiachuang"})//icon is none
      }
      if(!!data.bedSize){
        sheshis.push({text: data.bedSize, icon: "icon-zushu"})
      }
      if(!!data.broadBandName){
        sheshis.push({text: data.broadBandName, icon: "icon-wifi"})
      }
      if(!!data.bathRoomName){
        sheshis.push({text: data.bathRoomName, icon: "icon-shower"})
      }
      if(!!data.foodName){
        sheshis.push({text: data.foodName, icon: "icon-mianfeipingzhuangshui"})
      }
      if(!!data.mediaFacilitiesName){
        sheshis.push({text: data.mediaFacilitiesName, icon: "icon-fangjianwifi"})
      }
      if(!!data.facilitiesName){
        sheshis.push({text: data.facilitiesName, icon: "icon-110vdianyachazuo"})
      }
      this.setState({
          imgItems:(data.picurl == null)? '' : data.picurl.split(","),
          productName:data.roomTypeName,
          productPrice:data.hotelProduct.productPrice,
          issell:data.hotelProduct.issell,
          sheshi: sheshis,
          checkinTime: data.checkinTime,
          departureTime: data.departureTime
      });
      //与app的交互
      var requestHybrid={
         tagname: 'forward',
         topage:'detail',
         type:"native",
         param: {
             typeId: "c10105",
             title:data.roomTypeName
         }
      }
      var native_callback=function(data){
            
      }
      uddh5.bridge(native_callback,requestHybrid);
    }.bind(this));
  },
  componentWillUnmount: function(){
    BaiduMobStat.onPageEnd('Room-type-specific');
  },
  render: function(){
    return (
      <div>
        <RoomBanner imgItems={this.state.imgItems} awards={this.state.awards} />
        <RoomOffer sheshi={this.state.sheshi} includingbreakfastNane={this.state.includingbreakfastNane}/>
        {/*<FooterPlaceholer />*/}
        {/*<Footer productPrice={this.state.productPrice} issell={this.state.issell}/>*/}
      </div>
    );
  }
});

export default RoomInfo
