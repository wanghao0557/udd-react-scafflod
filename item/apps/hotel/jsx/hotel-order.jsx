import React from 'react'
import {Link} from 'react-router'
import uddh5 from '../../common/js/common.js'
import Alert from '../../common/ui/alert/alert.jsx'
import Slider from 'react-slick'
import BaiduMobStat from '../../common/js/mobstat.js'
require('../../common/ui/alert/alert.scss')
import Debug from '../../common/ui/debug/debug.jsx'
require('../../common/ui/debug/debug.scss')
var HotelHeader=React.createClass({
  componentDidMount: function(){
    $.post(uddh5.apihost+'/getuuid', function(data){
      this.props.getuuid({uuid: data.data})
    }.bind(this));
  },
  openModal:function(){
    this.props.openModal();
  },
  render: function(){
  var starttime=uddh5.location.queryKey('starttime'),
    endtime=uddh5.location.queryKey('endtime'),
    startM=starttime? starttime.split("-")[1] : '',
    startD=starttime? starttime.split("-")[2] : '',
    endM=endtime? endtime.split("-")[1] : '',
    endD=endtime? endtime.split("-")[2] : '',
    dDay=(!!starttime && !!endtime)? uddh5.date.gitDiffDay(endtime,starttime) : '';
    return (
      <div className="order-header">
        <div className="padding-inner">
          <div className="room-intro">
            <h2>{this.props.roomTypeName} ({this.props.hotelProduct.productName}) ({this.props.hotelProduct.includingbreakfastNane=="不含" ? "无早":this.props.hotelProduct.includingbreakfastNane})</h2>
            <p>入住{startM}月{startD}日  离店{endM}月{endD}  共{dDay}晚</p>
            <p>{this.props.bedType} {this.props.broadBandName} {this.props.hotelProduct.includingbreakfastNane=="不含" ? "无早":this.props.hotelProduct.includingbreakfastNane}</p>
            <a className="absolute-middle" href="javascript:void(0)" onClick={this.openModal}>房型详情</a>
          </div>
        </div>
      </div>
    );
  }
});
var OrderBooker=React.createClass({
  getInitialState: function(){
    return{
      open: false,
      curItem: '1',
      checkexNum:1,
      rooms:[
        {
          name:""
        }
      ],
      tel:"",
      users: [],
      newUsers: [],
      telephone: '',
      quhao: '+86',
      booker: ''
    }
  },
  componentDidMount:function(){
    if(localStorage.getItem("hotelMobile")){
      var mobileStr = localStorage.getItem("hotelMobile");
      var mobile = JSON.parse(mobileStr).val;
      this.props.getMobile({mobile: mobile})
      this.setState({
          telephone: mobile
        });
    }
    if(localStorage.getItem("hotelLiveName")){
      var liveNameStr = localStorage.getItem("hotelLiveName");
      var liveName = JSON.parse(liveNameStr).val;
      this.setState({
          users:[liveName[0]],
          newUsers:liveName
        });
      this.props.getLiveName({liveName: [liveName[0]]});
    }
  },
  toggleClick: function(){
    this.setState({
      open: !this.state.open
    });
  },
  changeItem: function(item){
    if(uddh5.location.queryKey('productType') == '1'){
      $.post(uddh5.apihost+'/checkapphotelresouce', {checkInDate: uddh5.location.queryKey('starttime'), checkOutDate: uddh5.location.queryKey('endtime'), resourceId: this.props.resourceId, reserveNum: item+''}, function(data){
        if(data.data == 1){
          this.handleRoom(item);
        }else{
          this.props.openAlert('房间数量不足')
        }
      }.bind(this));
    }else{
      this.handleRoom(item);
    }
  },
  handleRoom: function(item){
    var roomslen=this.state.rooms.length;
    this.props.getReserveNum({reserveNum: item})
    this.setState({
      curItem: item
    });
    if(item<roomslen){ //del
        this.delRoom(item,roomslen)
    }else if(item>roomslen){  //add
        this.addRoom(item,roomslen);
    }else{
        return;
    }
  },
  addRoom:function(item,len){
      for(var i=len;i<item;i++){
            var obj={name:""};
            this.state.rooms.push(obj);
            this.state.users.push(this.state.newUsers[i])
      }
      this.props.getLiveName({liveName: this.state.users});
      this.setState({
        rooms: this.state.rooms,
        users: this.state.users
      })
  },
  delRoom:function(item,len){
      for(var i=len;i>item;i--){
        this.state.rooms.pop();
        this.state.users.pop();
      }
      this.props.getLiveName({liveName: this.state.users});
      this.setState({
        rooms: this.state.rooms,
        users: this.state.users
      })
  },
  concatClick: function(index){
    var self=this;
    var requestHybrid={
      tagname: 'forward',
      topage:'order',
      type:"native",
      param: {
          typeId: "10115",
          index: index
      }
    }
    var native_callback=function(data){
      var data=JSON.parse(data);
      data=data.param;
      var users=self.state.users;
      var newUsers = self.state.newUsers;
      users[parseInt(data.index)]=data.userName;
      newUsers[parseInt(data.index)]=data.userName;
      self.setState({
        users: users,
        newUsers: newUsers
      });
      self.props.getLiveName({liveName: users})
    }
    uddh5.bridge(native_callback,requestHybrid);
  },
  phoneNative: function(){
    var self=this;
    //与app的交互
     var requestHybrid={
        tagname: 'forward',
        topage:'order',
        type:"native",
        param: {
            typeId: "10120"
        }
     }
     var native_callback=function(data){
        var data=JSON.parse(data);
        data=data.param;
        self.setState({
          telephone: data.telephone
        });
        self.props.getMobile({mobile: data.telephone})
     }
     uddh5.bridge(native_callback,requestHybrid);
  },
  quhaoNative: function(){
    var self=this;
    //与app的交互
     var requestHybrid={
        tagname: 'forward',
        topage:'order',
        type:"native",
        param: {
            typeId: "10125"
        }
     }
     var native_callback=function(data){
        var data=JSON.parse(data);
        data=data.param;
        self.setState({
          quhao: data.quhao
        });
        self.props.getQuhao({quhao: data.quhao})
     }
     uddh5.bridge(native_callback,requestHybrid);
  },
  bookerChange: function(index, event){
    var users=this.state.users;
    var newUsers = this.state.newUsers;
    users[parseInt(index)]=event.target.value;
    newUsers[parseInt(index)]=event.target.value;
    this.setState({
      users: users,
      newUsers: newUsers
    });
    this.props.getLiveName({liveName: users});
  },
  mobileChange: function(event){
    this.setState({
      telephone: event.target.value
    });
    this.props.getMobile({mobile: event.target.value});
  },
  scrollFn:function(){
    var isAnd = navigator.userAgent.toLowerCase();  
      if (/android/.test(isAnd)) {
        setTimeout(function(){
          var nav = $("#bottom_nav").height();
          $(window).scrollTop(nav);
        },200)
      }
  },
  render: function(){
    var nums=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <div className="order-booker form-section">
        <div className={"roomnum-list-wrapper "+((this.state.open)? 'open' : '')}>
          <div className="form-group" onClick={this.toggleClick}>
            <label forHtml="roomnum">房间数</label>
            <span className="form-control">{this.state.curItem +'间'}</span>
            <i className={"hotel-icon pull-right cicon-gray "+((this.state.open)? 'icon-upup' : 'icon-downdown')}></i>
          </div>
          <ul className="roomnum-list clearfix">
            {$.map(nums, function(elem, index){
              return(
                <li key={index} onClick={this.changeItem.bind(this, elem)} className={(elem==this.state.curItem)? 'active' : ''}><span>{elem}</span></li>
              )
            }.bind(this))}
          </ul>
        </div>
        <div className="person-group">
          <label className="absolute-middle" forHtml="booker">入住人<i className="hotel-icon icon-point cicon-blue hide"></i></label>
          {$.map(this.state.rooms, function(elem, index){
              return(
                  <div key={index} className="form-group">
                    <input autocomplete="off" type="text" className="form-control" placeholder="姓名，1间房填1个人" value={this.state.users[index]} onChange={this.bookerChange.bind(this, index)}/>
                    <a href="javascript: void(0)" onClick={this.concatClick.bind(this, index)}><i className="hotel-icon icon-jiaren right-icon absolute-middle"></i></a>
                  </div>
              )
          }.bind(this))}
        </div>
        <div className="form-group phone-group">
          <label forHtml="bookerphone">手机</label>
          {/*<div className="quhao-box">
            <div className="form-control quhao">{this.state.quhao}</div>
          </div>*/}
          <input name="phone" type="number" autocomplete="off" className="form-control" placeholder="用于接收通知" onClick={this.scrollFn} onChange={this.mobileChange} value={this.state.telephone}/>
          <a href="javascript: void(0)" onClick={this.phoneNative}><i className="hotel-icon icon-book right-icon absolute-middle"></i></a>
        </div>
      </div>
    );
  }
});



var BuChong=React.createClass({
  getInitialState: function(){
    return {
      yaoqiu: '无'
    }
  },
  toggleNative: function(){
    var self=this;
    //与app的交互
     var requestHybrid={
        tagname: 'forward',
        topage:'order',
        type:"native",
        param: {
            typeId: "10121"
        }
     }
     var native_callback=function(data){
        var data=JSON.parse(data);
        data=data.param;
        self.setState({
          yaoqiu: data.message
        });
        self.props.getYaoQiu({yaoqiu: data.message})
     }
     uddh5.bridge(native_callback,requestHybrid);
  },
  render: function(){
    return(
      <div className="buchong form-section">
        {/*<div className="form-group">
          <label>优惠券</label>
          <input name="youhui" type="text" className="form-control" placeholder="优惠券" readOnly/>
          <i className="hotel-icon icon-youyou right-icon absolute-middle cicon-gray"></i>
        </div>*/}
        {/*<div className="form-group">
          <label>特别要求</label>
          <a href="javascript: void(0)" onClick={this.toggleNative}>
            <span className="form-control yaoqiu">{this.state.yaoqiu}</span>
            <i className="hotel-icon icon-youyou right-icon absolute-middle cicon-gray"></i>
          </a>
        </div>*/}
        {this.props.rules?<div className="notice">
          <p><strong>取消规则：</strong>{this.props.rules}</p>
        </div>:''}
        {this.props.invoices?<div className="notice">
          <p><strong>发票信息：</strong>{this.props.invoices}</p>
        </div>:''}
      </div>
    );
  }
});
var FooterPlaceholer=React.createClass({
  render: function(){
    return (
      <div className="footer-placeholder"></div>
    );
  }
});

var RoomBanner=React.createClass({
  render: function(){
    var imgItems=!!(this.props.picurl)? (this.props.picurl).split(',') : [];
    var total=imgItems.length;
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
         {(total>0)?<Slider {...settings}>
            {$.map(imgItems, function(elem, index){
              return (
                <a key={index} href="javascript: void(0)">
                  <img src={elem}/>
                </a>
              )
            })}
          </Slider>:""}
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

var ModalRoom = React.createClass({
  closeModal:function(){
    this.props.closeModal();
  },
  render: function(){
    return ( 
      <div>
        <div className="modal-bg" onClick={this.closeModal}></div>
        <div className="modal" ref="modalRoot">
          <RoomBanner picurl={this.props.picurl} />
          <RoomOffer sheshi={this.props.sheshi} />
          {/*<RoomFeedback checkinTime={this.props.checkinTime} departureTime={this.props.departureTime} />*/}
        </div>
      </div>
    );
  },
});

// 费用明细弹框
var PriceDetail = React.createClass({
  getInitialState: function(){
    return{
      items: []
    }
  },
  closeFeiYong:function(){
    this.props.closeFeiYong()
  },
  // 修改ios 2016-1-1不显示问题
  render:function(){
    var dateArr = [];
    var reserveNums=this.props.reserveNum;
    var starttime=uddh5.location.queryKey('starttime'),
      endtime=uddh5.location.queryKey('endtime'),
      dDay=(!!starttime && !!endtime)? uddh5.date.gitDiffDay(endtime,starttime) : '';
      starttime=starttime.replace(/\-/g,"/");
      endtime=endtime.replace(/\-/g,"/");
      for(var i = 0; i < dDay; i++){
          dateArr.push(uddh5.date.getStartXdays(starttime,i));
      }
      var productPrice = this.props.productPrice;
     return(
          <div className="price_detail_cont">
              <div className="shade" onClick={this.closeFeiYong}></div>
              <div className="price_detail" ref="modalRoot">
                  <h5 className="titel">房价详情</h5>
                  <ul className="price_detail_list">
                  {
                    $.map(dateArr,function(elem,index){
                      return (<li className="clearfix"><span className="pull-left">{elem}</span><span className="pull-right"><strong>￥{productPrice[index]}</strong>x<em>{reserveNums}</em>间</span></li>)
                    }.bind(this))
                  }
                  </ul>
              </div>
          </div>
      )
  }
});

var HotelOrder=React.createClass({
  getInitialState: function(){
    return{
      bookMethod: '',
      reserveNum: "1",
      liveName: [],
      mobile: '',
      yaoqiu: '',
      roomTypeName: '',
      hotelProduct: {},
      bedType: '',
      broadBandName: '',
      productPrice: [],
      issell: '',
      resourceId: '',
      orderAmount: '',
      productName: '',
      hotelName: '',
      picurl: '',
      showModal: false,
      uuid: '',
      opened: false,
      sheshi: [],
      includingbreakfastNane: '',
      disabled: false,
      messageShow: false,
      textMessage: '',
      loading: false,
      rules:'',
      invoices:'',
      allPrice:'',
      allResourcePrice: ''
    }
  },

  getReserveNum: function(obj){
    if(!obj.reserveNum){
      return;
    }
    this.setState({
      reserveNum: obj.reserveNum
    })
  },
  getLiveName: function(obj){
    if(!obj.liveName){
      return;
    }
    this.setState({
      liveName: obj.liveName.length>this.state.reserveNum? obj.liveName.splice(this.state.reserveNum) : obj.liveName
    })
  },
  getMobile: function(obj){
    if(!obj.mobile){
      return;
    }
    this.setState({
      mobile: obj.mobile
    })
  },
  getYaoQiu: function(obj){
    if(!obj.yaoqiu){
      return;
    }
    this.setState({
      yaoqiu: obj.yaoqiu
    })
  },
  getuuid: function(obj){
    this.setState({
      uuid: obj.uuid
    });
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
  handleSubmit: function(e){
    e.preventDefault();
    this.closeFeiYong();
    var hotelid = uddh5.location.queryHash().split('/')[2];
    var roomid=uddh5.location.queryHash().split('/')[3];
    var productid=uddh5.location.queryHash().split('/')[4];
    if(this.state.reserveNum == ''){
      this.openAlert("房间数量不能为空");
      return;
    }
    if(this.state.liveName == ''){
      this.openAlert("入住人不能为空");
      return;
    }
    if($.grep(this.state.liveName.slice(0,this.state.reserveNum), function (elem, index) { return elem != undefined && elem != ''; }).length < this.state.reserveNum){
      this.openAlert("入住人不能为空");
      return;
    }
    for(var i in this.state.liveName){
      if(!(/^[a-zA-Z\u4e00-\u9fa5\s]+$/g).test($.trim(this.state.liveName[i]))){
        this.openAlert('请输入中文姓名或英文姓名,不能包含数字、特殊字符')
        return;
      }
    }
    if(this.state.mobile == ''){
      this.openAlert("手机号不能为空");
      return;
    }
    if(!((/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/).test($.trim(this.state.mobile)))){
      this.openAlert("手机号不合法");
      return;
    }
    // 条件通过 数据本地存储
    this.localStorageFn();
    var starttime=uddh5.location.queryKey('starttime'),
      endtime=uddh5.location.queryKey('endtime'),
      dDay=(!!starttime && !!endtime)? uddh5.date.gitDiffDay(endtime,starttime) : '',
      isPublic=(uddh5.getCookie('isPublic')==1)? "4" : "5";
    var forms={productId: productid, resourceId: this.state.resourceId, hotelId: hotelid, roomTypeId: roomid, userId: uddh5.getCookie('userId'), orderAmount: (this.state.allPrice)*$.trim(this.state.reserveNum), payAmount: (this.state.allPrice)*$.trim(this.state.reserveNum), reserveNum: this.state.reserveNum, liveName: this.state.liveName.join(','), mobile: this.state.mobile, checkInDate: starttime, checkOutDate: endtime, email: '', productName: this.state.productName, hotelName: this.state.hotelName, roomName: this.state.roomTypeName, uuid: this.state.uuid, isCorporateTravel:isPublic, orderResourceAmount: (this.state.allResourcePrice)*$.trim(this.state.reserveNum), elonghotelId: uddh5.location.queryKey('elonghotelId'), elonghotelCode: uddh5.location.queryKey('elonghotelCode'), elongroomTypeId: uddh5.location.queryKey('elongroomTypeId'), elongproductId: uddh5.location.queryKey('elongproductId'), firstNightAmount: 0};
    console.log(forms);
    this.setState({
      loading: true
    });
    // if(isPay){
    //   this.togglePayNative();
    // }else{
    //   this.toggleNative();
    // }
    //stockType是否现询(1是0不是)

    if(uddh5.location.queryKey('productType') == 3){
      $.post(uddh5.apihost+"/addapphotelorder", forms, function(data){
        console.log(data);
        this.setState({
          disabled: true,
          loading: false
        });
        if(data.code ==1){
          var data=data.data;
          this.togglePayNative(data)
        }else if(data.code == 217){
          this.setState({
            loading:false
          });
          this.openAlert("房间数量不足");
        }else{
          this.setState({
            disabled: false
          });
          this.openAlert("提交订单失败，请选择其他产品");
        }
      }.bind(this));
    }else{
      // 提交订单时查询库存
      $.post(uddh5.apihost+"/checkapphotelresouce",{checkInDate: uddh5.location.queryKey('starttime'), checkOutDate: uddh5.location.queryKey('endtime'), resourceId: this.state.resourceId, reserveNum: this.state.reserveNum},function(data){
          console.log(data);
          var that = this;
          if(data.data==1){
            $.post(uddh5.apihost+"/addapphotelorder", forms, function(data){
              that.setState({
                disabled: true,
                loading: false
              });
              if(data.code ==1){
                var data=data.data;
                that.togglePayNative(data)
              }else if(data.code == 217){
                that.setState({
                  loading:false
                });
                that.openAlert("房间数量不足");
              }else{
                that.setState({
                  disabled: false
                });
                that.openAlert("提交订单失败，请选择其他产品");
              }
            }.bind(this));
          }else{
            that.setState({
              loading:false
            });
            that.openAlert("房间数量不足");
          }
      }.bind(this));
    }
  },

  //去支付
  togglePayNative: function(obj){
    //与app的交互支付
    var requestHybrid={
      tagname: 'forward',
      topage:'order',
      type:"native",
      param: {
        typeId: "10119",
        stockType: obj.stockType,
        orderId: obj.productOrderId
      }
    }
    var native_callback=function(data){
    }
    uddh5.bridge(native_callback,requestHybrid);
  },
  //去咨询
  toggleNative: function(obj){
    var requestHybrid={
      tagname: 'forward',
      topage:'order',
      type:"native",
      param: {
          typeId: "10118",
          stockType: obj.stockType,
          orderId: obj.productOrderId
      }
    }
    var native_callback=function(data){
    }
    uddh5.bridge(native_callback,requestHybrid);
  },
  // 将用户信息及用户地址传入cookie
  localStorageFn:function(){
  // 电话号码存储
    localStorage.setItem("hotelMobile",JSON.stringify({val: this.state.mobile}));   
    localStorage.setItem("hotelLiveName",JSON.stringify({val: this.state.liveName}));   
  },
  componentWillMount: function(){
    BaiduMobStat.onPageStart('Orders');
  },
  componentDidMount: function(){
    var hotelid = uddh5.location.queryHash().split('/')[2];
    var roomid=uddh5.location.queryHash().split('/')[3];
    var productid=uddh5.location.queryHash().split('/')[4];
    var productType= uddh5.location.queryKey('productType');
    var sheshis=[];
    $.post(uddh5.apihost+'/gethotelproductinfo', {productId:productid, startDate:uddh5.location.queryKey('starttime'),endDate:uddh5.location.queryKey('endtime'), productType: productType, elonghotelId: uddh5.location.queryKey('elonghotelId'), elonghotelCode: uddh5.location.queryKey('elonghotelCode'), elongroomTypeId: uddh5.location.queryKey('elongroomTypeId'), elongproductId: uddh5.location.queryKey('elongproductId')}, function(data){
      if(data.code == 1){
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
          var allPriceArr = data.hotelProduct.productPrice.split(",");
          var allProductPrice = 0;
          $.map(allPriceArr,function(elem,index){
                allProductPrice+=elem*1;
          });
          var orderResourceAmount=data.hotelProduct.resourcePrice.split(",");
          var allResourcePrice=0;
          $.map(orderResourceAmount,function(elem,index){
                allResourcePrice+=elem*1;
          });
          this.setState({
            roomTypeName: !!data.roomTypeName.length? data.roomTypeName : '',
            hotelProduct: data.hotelProduct,
            bedType: data.bedType,
            broadBandName: data.broadBandName,
            productPrice: allPriceArr,
            stockType: data.hotelProduct.stockType,
            resourceId: data.hotelProduct.resouceId,
            productName: data.hotelProduct.productName,
            picurl: data.picurl,
            hotelName: data.hotelName,
            issell: data.hotelProduct.issell,
            checkinTime: data.checkinTime,
            departureTime: data.departureTime,
            sheshi: sheshis,
            rules:data.rules,
            invoices:data.hotelProduct.invoices,
            allPrice:allProductPrice,
            allResourcePrice: allResourcePrice.toFixed(2)
          });
        }
      }
    }.bind(this))
    //与app的交互
    var that=this;
    var requestHybrid={
       tagname: 'forward',
       topage:'order',
       type:"native",
       param: {
           typeId: "c10106",
           title:"酒店订单填写"
       }
    }
    var native_callback=function(data){
    }
    uddh5.bridge(native_callback,requestHybrid);
     
  },
  componentWillUnmount: function(){
    BaiduMobStat.onPageEnd('Orders');
  },
  openModal: function(){
    this.setState({
      opened: true
    });
  },
  closeModal: function(){
    this.setState({
      opened: false
    });
  },
  openFeiYong: function(e){
    $(e.target).addClass('disabled');
    this.setState({
      showModal: true
    });
  },
  closeFeiYong: function(){
    $(this.refs.feiyongToggle).removeClass('disabled');
    this.setState({
      showModal: false
    })
  },
  render: function(){
    var loading=require('../img/loading.gif');
    var stockType=!!(this.state.stockType);
    var starttime=uddh5.location.queryKey('starttime'),
      endtime=uddh5.location.queryKey('endtime'),
      dDay=(!!starttime && !!endtime)? uddh5.date.gitDiffDay(endtime,starttime) : '';
    return (
      <div>
        <HotelHeader roomTypeName={this.state.roomTypeName} hotelProduct={this.state.hotelProduct} bedType={this.state.bedType} broadBandName={this.state.broadBandName} getuuid={this.getuuid} openModal={this.openModal}/>
        <form onSubmit={this.handleSubmit} className="hotel-forms-order" autocomplete="off">
          <OrderBooker getReserveNum={this.getReserveNum} getLiveName={this.getLiveName} getMobile={this.getMobile} resourceId={this.state.resourceId} hotelName={this.state.hotelName} openAlert={this.openAlert}/>
          <BuChong getYaoQiu={this.getYaoQiu} rules={this.state.rules} invoices={this.state.invoices}/>
          <FooterPlaceholer />
          <footer className="clearfix" id='bottom_nav'>
            <div className="total pull-left">总额：￥<strong>{(this.state.allPrice)*$.trim(this.state.reserveNum)}</strong>
            </div>
            <div className="btns pull-right">
              <a ref="feiyongToggle" href="javascript:void(0)" onClick={this.openFeiYong}>费用明细</a>
              <button className="btn btn-orange" type="submit">去支付</button>
            </div>
          </footer>
        </form>
        {this.state.opened?<ModalRoom closeModal={this.closeModal} picurl={this.state.picurl} checkinTime={this.state.checkinTime} sheshi={this.state.sheshi} departureTime={this.state.departureTime}/>:""}
        {this.state.showModal? <PriceDetail productPrice={this.state.productPrice} reserveNum={this.state.reserveNum} closeFeiYong={this.closeFeiYong}/> : ''}
        {this.state.messageShow? <Alert textMessage={this.state.textMessage}/> : ''}
        {this.state.loading? <div className="send-loading"><div className="loading-inner"><img src={loading} /><span>数据提交中！</span></div></div> : ''}
      </div>
    );
  }
})
export default HotelOrder