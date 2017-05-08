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
        {/*<ul className="statistics clearfix">
          <li>
            <div>
              <p>0</p>
              <p>房型点评</p>
            </div>
          </li>
          <li>
            <div>
              <p>11</p>
              <p>推荐</p>
            </div>
          </li>
          <li>
            <div>
              <p>11</p>
              <p>待改善</p>
            </div>
          </li>
          <li>
            <div>
              <p>{this.props.imgItems.length}</p>
              <p>有图</p>
            </div>
          </li>
        </ul>*/}
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
      <div className="room-offer">
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

// var RoomFeedback=React.createClass({
//   render: function(){
//     return(
//       <div className="room-feedback">
//         <h4><i className="hotel-icon icon-smile1 left-icon"></i>预定满意度92%</h4>
//         <ul>
//           <li>
//             <i className="hotel-icon icon-sth left-icon absolute-middle"></i>
//             <p>游大大会根据你的担保方式，预授权或暂时扣除￥258元用于担保，该订单被确认后不可被取消修改，若未入住，担保费用不退还</p>
//           </li>
//           <li>
//             <i className="hotel-icon icon-ringing left-icon absolute-middle"></i>
//             <p>该酒店的入住时间是{this.props.checkinTime},退房标准结算时间为{this.props.departureTime}。如提前入住或延长退房，酌情收入一定费用。</p>
//           </li>
//         </ul>
//       </div>
//     );
//   }
// });

var Footer=React.createClass({
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
  handleClick:function(e){
    if(!this.props.isLogin&&this.props.issell!=0){
      e.preventDefault();
      this.gotoLogin();
    }else if(this.props.issell==0){
      e.preventDefault();
    }
  },
  render: function(){
    var starttime = uddh5.location.queryKey('starttime')
    var endtime = uddh5.location.queryKey('endtime')
    var dDay=(!!starttime && !!endtime)? uddh5.date.gitDiffDay(endtime,starttime) : '';
    var productPriceArr = this.props.productPrice.split(",")
    var allProductPrice = 0;
    $.map(productPriceArr,function(elem,index){
          allProductPrice+=elem*1;
    });
    return(
      <footer className="clearfix">
        <div className="total pull-left">总额：￥<strong>{allProductPrice}</strong>
        </div>
        <div className="btns pull-right">
          <Link onClick={this.handleClick} className={"btn"+((this.props.issell==0)?" "+"gary":"")} to={{pathname: "/order/"+this.props.hotelId+"/"+this.props.roomTypeId+"/"+this.props.productId,query: {starttime:uddh5.location.queryKey('starttime'), endtime: uddh5.location.queryKey('endtime'), productType: uddh5.location.queryKey('productType'), elonghotelId: uddh5.location.queryKey('elonghotelId'), elonghotelCode: uddh5.location.queryKey('elonghotelCode'), elongroomTypeId: uddh5.location.queryKey('elongroomTypeId'), elongproductId: uddh5.location.queryKey('elongproductId')}}}>{(this.props.issell==0)?"订完":"去预订"}</Link>
        </div>
      </footer>
    );
  }
});

var Room=React.createClass({
  getInitialState: function(){
    return {
      isLogin:false,
      hotelId:null,
      roomTypeId:null,
      productId:null,
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
      productPrice:'',
      issell:0,
      includingbreakfastNane: ''
    };
  },
  getLogin: function(id){
    this.setState({
      isLogin: !!id? true : false
    });
  },
   componentWillMount: function(){
    BaiduMobStat.onPageStart('Room-type');
  },
  componentDidMount: function(){
    var proid=uddh5.location.queryKey("productId");
    var st=uddh5.location.queryKey("starttime");
    var et=uddh5.location.queryKey("endtime");
    var tokenId=uddh5.getCookie('tokenId');
    var productType= uddh5.location.queryKey('productType');
    var sheshis=[];
    $.post(uddh5.apihost+'/gethotelproductinfo', {productId: proid,startDate:st,endDate:et, productType: productType, elonghotelId: uddh5.location.queryKey('elonghotelId'), elonghotelCode: uddh5.location.queryKey('elonghotelCode'), elongroomTypeId: uddh5.location.queryKey('elongroomTypeId'), elongproductId: uddh5.location.queryKey('elongproductId')}, function(data){
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
      if(this.isMounted()){
          this.setState({
              isLogin:!!tokenId? true : false,
              hotelId:data.hotelId,
              roomTypeId:data.roomTypeId,
              productId:proid,
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
               title:this.state.productName
           }
        }
        var native_callback=function(data){
              
        }
        uddh5.bridge(native_callback,requestHybrid);
      }
    }.bind(this));
  },
  componentWillUnmount: function(){
    BaiduMobStat.onPageEnd('Room-type');
  },
  render: function(){
    return (
      <div>
        <RoomBanner imgItems={this.state.imgItems} awards={this.state.awards} />
        <RoomOffer sheshi={this.state.sheshi} includingbreakfastNane={this.state.includingbreakfastNane}/>
        {/*<RoomFeedback checkinTime={this.state.checkinTime} departureTime={this.state.departureTime}/>*/}
        <FooterPlaceholer />
        <Footer productPrice={this.state.productPrice} issell={this.state.issell} hotelId={this.state.hotelId} roomTypeId={this.state.roomTypeId} productId={this.state.productId} isLogin={this.state.isLogin} getLogin={this.getLogin}/>
      </div>
    );
  }
});

export default Room
