//uddh5.getCookie('isPublic')==1 =>商旅通（个人）
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
    var rooms=this.state.rooms;
    var users=this.state.users;
    for(var i=len;i<item;i++){
      var obj={name:""};
      rooms.push(obj);
      users.push(this.state.newUsers[i])
    }
    this.setState({
      users: users,
      rooms: rooms
    });
    this.props.getLiveName({liveName: users});
  },
  delRoom:function(item,len){
    var rooms=this.state.rooms;
    var users=this.state.users;
    for(var i=len;i>item;i--){
      rooms.pop();
      users.pop();
    }
    this.setState({
      rooms: rooms,
      users: users
    });
    this.props.getLiveName({liveName: users});
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
        {this.props.paymenttype != '1'? 
          <div className="form-group" onClick={this.props.openTimeList}>
            <label>最晚到店</label>
            <input style={{fontSize: '0.37rem'}} type="text" className="form-control" value={this.props.arrivedTime} readOnly/>
            <i className="hotel-icon icon-youyou right-icon absolute-middle cicon-gray"></i>
          </div> : ''
        }
      </div>
    );
  }
});

var Invoices=React.createClass({
  // getDefaultProps: function(){
  //   return {
  //     invoiceLists: ['定期配送', '一单一寄', '不需要发票']
  //   }
  // },
  getInitialState: function(){
    return {
      nativeAction: false,
      invoiceSelect: false,
      currentItem: {item: '不需要发票', message: '不需要发票', itemIndex: 2, invoiceModule: {}, isNeedInvoice: 'no'},
    }
  },
  applyInvoice: function(data, index, item, isneed, event){
    var that=this;
    var requestHybrid={
      tagname: 'forward',
      topage:'order',
      type:"native",
      item:'hotel',
      param: {
        typeId: "10187",
        invoiceSource: 1, //1=酒店, 2=飞机, data.hotelInvoiceContent, data.hotelInvoiceType
        invoiceModule: !!arguments[0].invoiceTitle? data : {},
        itemIndex: index,
        item: item,
        isNeedInvoice: isneed
      }
    }
    var native_callback=function(data){
      var data=JSON.parse(data);
      data=data.param;
      console.log('app');
      console.log(data);
      var invoiceType=data.invoiceModule.invoiceType;
      var invoiceModule=data.isNeedInvoice == 'yes'? data.invoiceModule : {};
      that.props.getInvoice(invoiceModule, data.isNeedInvoice, data.itemIndex);
      that.setState({
        currentItem: data.isNeedInvoice == 'yes'? {item: that.state.isSetted? data.item : invoiceType == 2? '普通发票<strong>（配送费10元）</strong>' : invoiceType == 4? '专用发票<strong>（配送费10元）</strong>' : '不需要发票', message: invoiceType ==2? '普通发票 <strong>（配送费10元）</strong>':  invoiceType == 4? '专用发票 <strong>（配送费10元）</strong>' : '' , itemIndex: data.itemIndex, invoiceModule: data.invoiceModule, isNeedInvoice: data.isNeedInvoice} : {item: that.state.isSetted? data.item : '不需要发票', message: invoiceType ==2? '普通发票 <strong>（配送费10元）</strong>':  invoiceType == 4? '专用发票 <strong>（配送费10元）</strong>' : '' , itemIndex: data.itemIndex, invoiceModule: {}, isNeedInvoice: data.isNeedInvoice},
        isNeedInvoice: data.isNeedInvoice
      });
    }
    uddh5.bridge(native_callback,requestHybrid);
    // var data={"tagname":"forward","topage":"order","type":"native","item":"hotel","param":{"typeId":"10187","invoiceSource":1,"invoiceModule":{"bankAccount":"55555555","openBank":"222","invoiceTitle":"更好","needExpressFee":10,"invoiceType":2,"taxpayerNumber":"122","applyOrign":0,"expressMobile":"13402128491","invoiceContent":"代订住宿费","invoiceCategory":2,"registerAddress":"11111","remark":"0","orderId":"","expressContactName":"王浩","companyPhone":"021-2333366","expressAddress":"二二","applyUser":"王浩","email":""},"itemIndex":2,"item":"普通发票<strong>（配送费10元）</strong>","isNeedInvoice":"yes"}};
    // data=data.param;
    // var invoiceType=data.invoiceModule.invoiceType;
    // var invoiceModule=data.isNeedInvoice == 'yes'? data.invoiceModule : {};
    // that.props.getInvoice(invoiceModule, data.isNeedInvoice, data.itemIndex);
    // that.setState({
    //   currentItem: data.isNeedInvoice == 'yes'? {item: that.state.isSetted? data.item : invoiceType == 2? '普通发票<strong>（配送费10元）</strong>' : invoiceType == 4? '专用发票<strong>（配送费10元）</strong>' : '不需要发票', message: invoiceType ==2? '普通发票 <strong>（配送费10元）</strong>':  invoiceType == 4? '专用发票 <strong>（配送费10元）</strong>' : '' , itemIndex: data.itemIndex, invoiceModule: data.invoiceModule, isNeedInvoice: data.isNeedInvoice} : {item: that.state.isSetted? data.item : '不需要发票', message: invoiceType ==2? '普通发票 <strong>（配送费10元）</strong>':  invoiceType == 4? '专用发票 <strong>（配送费10元）</strong>' : '' , itemIndex: data.itemIndex, invoiceModule: {}, isNeedInvoice: data.isNeedInvoice},
    //   isNeedInvoice: data.isNeedInvoice
    // });
  },
  toggleInvoiceSelect: function(e){
    if(this.state.invoiceSelect){
      return;
    }
    this.setState({
      invoiceSelect: true
    });
  },
  closeInvoiceSelect: function(elem, index, event){
    console.log(elem);
    if(event.currentTarget == this.refs.invoiceExpress2){
      this.setState({
        nativeAction: false,
      });
    }else{
      this.setState({
        nativeAction: true,
      });
    }
    this.setState({
      invoiceSelect: false,
      currentItem: elem
    });
    this.props.getInvoice(elem.invoiceModule, this.state.isNeedInvoice, elem.itemIndex);
  },
  closeInvoiceModal: function(){
    this.setState({
      invoiceSelect: false
    });
  },
  componentDidMount: function(){
    $.post(uddh5.apihost+'/getappdispatchbyuserid', {userId: uddh5.getCookie('userId')})
      .done(function(data){
        if(data.data == null){
          this.setState({
            isSetted: false
          });
        }else if(data.code == 1){
          console.log(data);
          var data=data.data;
          var invoiceType=data.hotelInvoiceType;
          var data1={
            invoiceType: !!data.hotelInvoiceType? data.hotelInvoiceType : '',
            invoiceContent: !!data.hotelInvoiceContent? data.hotelInvoiceContent : '',
            expressContactName: !!data.expressContactName? data.expressContactName : '',
            expressMobile: !!data.expressMobile? data.expressMobile : '',
            expressAddress: !!data.expressAddress? data.expressAddress : '',
            invoiceTitle: !!data.invoiceTitle? data.invoiceTitle : '',
            needExpressFee: data.dispatchType == 1? '' : '',
            openBank: !!data.openBank? data.openBank : '',
            registerAddress: !!data.registerAddress? data.registerAddress : '',
            bankAccount: !!data.bankAccount? data.bankAccount : '' ,
            companyPhone: !!data.companyPhone? data.companyPhone : '',
            taxpayerNumber: !!data.taxPayerNumber? data.taxPayerNumber : ''
          };
          this.setState({
            isSetted: true,
            currentItem: data.dispatchType == 1? {item: '定期配送', message:'定期统一配送(免配送费)', itemIndex: 0, invoiceModule: data1, isNeedInvoice: 'yes'} : {item: '定期配送', message:'', itemIndex: 0, invoiceModule: data1, isNeedInvoice: 'yes'},
            nativeAction: true,
            invoiceLists: [ data.dispatchType == 1? {item: '定期配送', message:'定期统一配送(免配送费)', itemIndex: 0, invoiceModule: data1, isNeedInvoice: 'yes'} : {item: '定期配送', message:'', itemIndex: 0, invoiceModule: data1, isNeedInvoice: 'yes'}, {item: '一单一寄', message: '填写发票信息', itemIndex: 1, invoiceModule: {}, isNeedInvoice: 'no'}, {item: '不需要发票', message: '', itemIndex: 2, invoiceModule: {}, isNeedInvoice: 'no'}]
          });
          this.props.getInvoice(data1, 'yes', 0);
        }
      }.bind(this));
  },
  render: function(){
    var invoiceLists=this.state.invoiceLists;
    return (
      <div>
        { this.props.isinvoices == 1?
          <div className="form-section apply-invoice-section">
            <h2>发票信息</h2>
            { this.state.isSetted? <div className="form-group" onClick={this.toggleInvoiceSelect.bind(this)}>
              <label>发票配送</label>
              <span className="form-control">{this.state.currentItem.item}</span>
              <i className="hotel-icon icon-downdown right-icon absolute-middle cicon-gray"></i>
            </div> : <div className="form-group" onClick={this.applyInvoice.bind(this, this.state.currentItem.invoiceModule, this.state.currentItem.itemIndex, this.state.currentItem.item, this.state.currentItem.isNeedInvoice)}>
              <label>发票配送</label>
              <span className="form-control" dangerouslySetInnerHTML={{__html:this.state.currentItem.item}}></span>
              <i className="hotel-icon icon-youyou right-icon absolute-middle cicon-gray"></i>
            </div>}
            {this.state.nativeAction? <div className="form-group" onClick={this.applyInvoice.bind(this, this.state.currentItem.invoiceModule, this.state.currentItem.itemIndex, this.state.currentItem.item, this.state.currentItem.isNeedInvoice)}>
              <label>发票信息</label>
              <span className="form-control" dangerouslySetInnerHTML={{__html: this.state.currentItem.message}}></span>
              <i className="hotel-icon icon-youyou right-icon absolute-middle cicon-gray"></i>
            </div> : ''}
          </div> : 
          <div className="form-section" style={{paddingTop: 0}}>
            <div className="form-group clearfix">
              <label className="pull-left">发票信息</label>
              <div className="pull-right" style={{width: '7.2rem'}}>{!!this.props.invoices? this.props.invoices : '不提供发票'}</div>
            </div>
          </div>
        }
        {this.state.invoiceSelect? <div className="invoice-modal" style={{ position: 'fixed', bottom: 0, left: '0', right: '0', top: 0, bottom: 0, width: '100%', zIndex: '99', textAlign: 'center'}}>
          <ul className="lists">
            {
              $.map(invoiceLists, function(elem, index){
                return (
                  <li ref={'invoiceExpress'+index} key={index} onClick={this.closeInvoiceSelect.bind(this, elem, index)} className={this.state.currentItem.itemIndex == index? 'current' : ''}>{elem.item}<b className="hotel-icon icon-gougou absolute-middle"></b></li>
                )
              }.bind(this))
            }
          </ul>
          <div onClick={this.closeInvoiceModal} className="invoice-bg" style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', position: 'absolute', bottom: 0, left: '0', right: '0', top: 0, bottom: 0, width: '100%'}}></div>
        </div> : ''}
      </div>
    )
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
        </div>
        <div className="form-group">
          <label>特别要求</label>
          <a href="javascript: void(0)" onClick={this.toggleNative}>
            <span className="form-control yaoqiu">{this.state.yaoqiu}</span>
            <i className="hotel-icon icon-youyou right-icon absolute-middle cicon-gray"></i>
          </a>
        </div>*/}
        {this.props.availPolicyText? <div className="hnotice">
          <h3>特别提示：</h3>
          <div><p dangerouslySetInnerHTML={{__html:this.props.availPolicyText}}></p><p>{this.props.isGuarantee =='1'? '亲爱的用户，为保证您入住顺利，请您下单时务必选择好最晚抵店时间。' : ''}</p></div>
        </div> : ''}
        {this.props.rules?<div className="hnotice">
          <p><h3>取消规则：</h3></p>
          <p>{this.props.rules}</p>
        </div>:''}
        {this.props.invoices && uddh5.getCookie('isPublic')==1 ?<div className="hnotice">
          <p><h3>发票信息：</h3></p>
          <p>{this.props.invoices}</p>
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
                  {this.props.isGuarantee == 1? this.props.isfirstNight == 1? <li className="clearfix"><span className="pull-left">担保价</span><span className="pull-right"><strong>￥{this.props.guaranteePrice*reserveNums}</strong></span></li> : 
                      <li className="clearfix"><span className="pull-left">担保价</span><span className="pull-right"><strong>￥{this.props.dDay*this.props.guaranteePrice*reserveNums}</strong></span></li>: ''}
                  {this.props.expressAmount !=0?
                      <li className="clearfix"><span className="pull-left">配送费</span><span className="pull-right"><strong>￥{this.props.expressAmount}</strong></span></li>: ''}
                  </ul>
              </div>
          </div>
      )
  }
});

// 最晚到店时间弹窗
var ArriverTime = React.createClass({
  clickTime:function(obj){
    this.props.getArrivedTime(obj);
  },
  render:function(){
    var items=this.props.guaranteeList;
    var paymenttype=this.props.paymenttype;
     return(
          <div className="arriverTime">
              <div className="arriverTime_shade" onClick={this.props.closeTimeList}></div>
              <div className="arriverTime_detail">
                  <h5>最晚到店时间</h5>
                  <p>订单成功确认后，请在所选时间之前入住，延后入住建议提前联系酒店，14点前到店可能需要等待哦！</p>
                  <ul className="arriverTime_detail_list clearfix">
                    {
                      $.map(items,function(elem,index){
                       return (<li className={ this.props.currentItem == elem? "pull-left timeChecked timeCur" : "pull-left timeChecked"} onClick={this.clickTime.bind(this,elem)}>{elem.isGuarantee == 0?<span className="curTime cur">{elem.timecode}</span>:<span className="curTime"><b className="timeDian">{elem.timecode}</b><em className="danBaoprice">担保￥{elem.price}</em></span>}</li>)
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
      showTimeModal:false,
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
      allResourcePrice: '',
      arrivedTime: '',
      paymenttype: '-1',
      hotelInvoiceObj: {},
      isNeedInvoice: 'no',
      itemIndex: 2
    }
  },
  getInvoice: function(obj, isneed, itemIndex){
    this.setState({
      hotelInvoiceObj: obj,
      isNeedInvoice: isneed,
      itemIndex: itemIndex
    });
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
      liveName: obj.liveName
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
    console.log('fff')
    console.log(this.state.itemIndex);
    console.log(this.state.hotelInvoiceObj);
    console.log(this.state.hotelInvoiceObj.invoiceType);
    console.log('ddd')
    if(this.state.itemIndex == 1 && this.state.hotelInvoiceObj.invoiceType == undefined){
      this.openAlert("请填写发票信息");
      return;
    }
    // 条件通过 数据本地存储
    this.localStorageFn();
    var starttime=uddh5.location.queryKey('starttime'),
      endtime=uddh5.location.queryKey('endtime'),
      dDay=(!!starttime && !!endtime)? uddh5.date.gitDiffDay(endtime,starttime) : '',
      hotelInvoiceObj=this.state.hotelInvoiceObj,
      isPublic=(uddh5.getCookie('isPublic')==1)? "4" : "5";
    var expressAmount=this.state.isNeedInvoice == 'no'? 0 : hotelInvoiceObj.needExpressFee == 10? parseInt(hotelInvoiceObj.needExpressFee) : 0
    var forms={
      productId: productid, 
      resourceId: this.state.resourceId, 
      hotelId: hotelid, 
      roomTypeId: roomid, 
      userId: uddh5.getCookie('userId'), 
      orderAmount: this.state.isGuarantee == 1? this.state.isfirstNight == 1? expressAmount+(this.state.guaranteePrice)*$.trim(this.state.reserveNum) :  expressAmount+dDay*(this.state.guaranteePrice)*$.trim(this.state.reserveNum) : expressAmount+(this.state.allPrice)*$.trim(this.state.reserveNum), 
      payAmount: this.state.isGuarantee == 1? this.state.isfirstNight == 1? expressAmount+(this.state.guaranteePrice)*$.trim(this.state.reserveNum) :  expressAmount+dDay*(this.state.guaranteePrice)*$.trim(this.state.reserveNum) : expressAmount+(this.state.allPrice)*$.trim(this.state.reserveNum), 
      reserveNum: this.state.reserveNum, 
      liveName: this.state.liveName.join(','), 
      mobile: this.state.mobile, 
      checkInDate: starttime, 
      checkOutDate: endtime, 
      email: '', 
      productName: this.state.productName, 
      hotelName: this.state.hotelName, 
      roomName: this.state.roomTypeName, 
      uuid: this.state.uuid, 
      isCorporateTravel:isPublic, 
      orderResourceAmount: this.state.isGuarantee == 1? expressAmount+(this.state.orderprice)*$.trim(this.state.reserveNum) : expressAmount+(this.state.allResourcePrice)*$.trim(this.state.reserveNum), 
      elonghotelId: uddh5.location.queryKey('elonghotelId'), 
      elonghotelCode: uddh5.location.queryKey('elonghotelCode'), 
      elongroomTypeId: uddh5.location.queryKey('elongroomTypeId'), 
      elongproductId: uddh5.location.queryKey('elongproductId'), 
      latestArrivalTime: this.state.arrivedTime, 
      paymenttype: this.state.paymenttype == 3? (this.state.isGuarantee == 1? '3' : '2') : this.state.paymenttype, 
      earliestArrivalTime: '',
      //发票信息：
      invoiceType: !!hotelInvoiceObj.invoiceType && this.state.isNeedInvoice == 'yes' && this.state.isinvoices == 1 ? hotelInvoiceObj.invoiceType : '' ,
      invoiceTitle: !!hotelInvoiceObj.invoiceTitle? hotelInvoiceObj.invoiceTitle : '' ,
      invoiceContent: !!hotelInvoiceObj.invoiceContent? hotelInvoiceObj.invoiceContent : '',
      invoiceMoney: !!hotelInvoiceObj.invoiceTitle? (this.state.allPrice)*$.trim(this.state.reserveNum) : '',
      remark: !!hotelInvoiceObj.remark && hotelInvoiceObj.remark == 1 && this.state.isNeedInvoice == 'yes'? '1' : '0',
      applyUser: !!hotelInvoiceObj.applyUser? hotelInvoiceObj.applyUser : '',
      taxpayerNumber: !!hotelInvoiceObj.taxpayerNumber? hotelInvoiceObj.taxpayerNumber : '',
      registerAddress: !!hotelInvoiceObj.registerAddress? hotelInvoiceObj.registerAddress : '',
      companyPhone: !!hotelInvoiceObj.companyPhone? hotelInvoiceObj.companyPhone : '',
      openBank: !!hotelInvoiceObj.openBank? hotelInvoiceObj.openBank : '',
      bankAccount: !!hotelInvoiceObj.bankAccount? hotelInvoiceObj.bankAccount : '',
      invoiceEmail: !!hotelInvoiceObj.email? hotelInvoiceObj.email : '',
      exprressTitle: !!hotelInvoiceObj.exprressTitle? hotelInvoiceObj.exprressTitle : '',
      expressAmount: !!hotelInvoiceObj.needExpressFee? hotelInvoiceObj.needExpressFee : '',
      expressContactName: !!hotelInvoiceObj.expressContactName? hotelInvoiceObj.expressContactName : '',
      expressMobile: !!hotelInvoiceObj.expressMobile? hotelInvoiceObj.expressMobile : '',
      expressAddress: !!hotelInvoiceObj.expressAddress? hotelInvoiceObj.expressAddress : '',
      invoiceCategory: 2, //发票种类 1:主站发票 2:商旅发票 HEAD
      expressType: this.state.itemIndex==0? 2 : this.state.itemIndex==1? 1 : (this.state.itemIndex==2 && !hotelInvoiceObj.invoiceType)? '' : 1, //1:一单一寄 2:按月配送（补发票的时候统一为一单一寄）
      isinvoices: this.state.isinvoices,
      isfirstNight: this.state.isfirstNight,
      firstNightAmount: this.state.guaranteePrice,
      prices: this.state.prices
    };
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
          this.toggleOrderNative(data)
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
          var that = this;
          if(data.data==1){
            $.post(uddh5.apihost+"/addapphotelorder", forms, function(data){
              console.log(data);
              that.setState({
                disabled: true,
                loading: false
              });
              if(data.code ==1){
                var data=data.data;
                that.toggleOrderNative(data)
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
  //isGuarantee ==1跳到担保app
  toggleOrderNative: function(obj){
    if(this.state.paymenttype==1){
      this.togglePayNative(obj);
    }else if(this.state.isGuarantee == 1){
      this.toggleGuaranteeNative(obj);
    }else{
      this.toggleSubNative(obj);
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
  //去担保
  toggleGuaranteeNative: function(obj){
    var requestHybrid={
      tagname: 'forward',
      topage:'order',
      type:"native",
      param: {
          typeId: "10118",
          stockType: obj.stockType,
          orderId: obj.productOrderId,
          productId: uddh5.location.queryHash().split('/')[4]
      }
    }
    var native_callback=function(data){
    }
    uddh5.bridge(native_callback,requestHybrid);
  },
  //提交酒店订单
  toggleSubNative: function(obj){
    var requestHybrid={
      tagname: 'forward',
      topage:'order',
      type:"native",
      param: {
          typeId: "10186",
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
    console.log(hotelid);
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
          var guaranteeDefault=!!data.hotelProduct.guaranteeList? data.hotelProduct.guaranteeList.filter(function(elem){return elem.isDefault ==1})[0]? data.hotelProduct.guaranteeList.filter(function(elem){return elem.isDefault ==1})[0] : data.hotelProduct.guaranteeList.filter(function(elem){return elem.isDefault ==0})[0] : {time: '18:00'};
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
            rules:data.hotelProduct.paymenttype == 1? data.rules : guaranteeDefault.rules,
            invoices:data.hotelProduct.invoices,
            allPrice:allProductPrice,
            allResourcePrice: allResourcePrice.toFixed(2),
            guaranteeList:!!data.hotelProduct.guaranteeList? data.hotelProduct.guaranteeList : [],
            arrivedTime: guaranteeDefault.time,
            paymenttype: data.hotelProduct.paymenttype,
            currentItem: guaranteeDefault,
            isGuarantee: guaranteeDefault.isGuarantee,
            guaranteePrice: guaranteeDefault.isGuarantee == 1? guaranteeDefault.price : '0',
            isinvoices: data.hotelProduct.isinvoices,
            availPolicyText: data.hotelProduct.availPolicyText,
            isfirstNight: guaranteeDefault.isGuarantee == 1? guaranteeDefault.isfirstNight : '',
            orderprice: guaranteeDefault.isGuarantee == 1? guaranteeDefault.orderprice : '',
            prices: data.hotelProduct.productPrice
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
  openTimeList: function(e){
    this.setState({
      showTimeModal: true
    });
  },
  closeTimeList: function(){
    this.setState({
      showTimeModal: false
    });
  },
  getArrivedTime: function(list){
    this.setState({
      arrivedTime: list.timecode,
      rules: list.rules,
      currentItem: list,
      isGuarantee: list.isGuarantee,
      guaranteePrice: list.price,
      isfirstNight: list.isfirstNight,
      orderprice: list.orderprice
    });
    this.closeTimeList();
  },
  render: function(){
    var loading=require('../img/loading.gif');
    var stockType=!!(this.state.stockType);
    var starttime=uddh5.location.queryKey('starttime'),
      endtime=uddh5.location.queryKey('endtime'),
      dDay=(!!starttime && !!endtime)? uddh5.date.gitDiffDay(endtime,starttime) : '';
    var expressAmount=this.state.isNeedInvoice == 'no'? 0 : this.state.hotelInvoiceObj.needExpressFee == 10?  parseInt(this.state.hotelInvoiceObj.needExpressFee) : 0 ;
    return (
      <div>
        <HotelHeader roomTypeName={this.state.roomTypeName} hotelProduct={this.state.hotelProduct} bedType={this.state.bedType} broadBandName={this.state.broadBandName} getuuid={this.getuuid} openModal={this.openModal}/>
        <form onSubmit={this.handleSubmit} className="hotel-forms-order" autocomplete="off">
          <OrderBooker openTimeList={this.openTimeList} getReserveNum={this.getReserveNum} getLiveName={this.getLiveName} getMobile={this.getMobile} resourceId={this.state.resourceId} hotelName={this.state.hotelName} openAlert={this.openAlert} arrivedTime={this.state.arrivedTime} paymenttype={this.state.paymenttype} />
          {uddh5.getCookie('isPublic')==1? '' : <Invoices isinvoices={this.state.isinvoices} getInvoice={this.getInvoice} invoices={this.state.invoices} />}
          <BuChong getYaoQiu={this.getYaoQiu} rules={this.state.rules} invoices={this.state.invoices} paymenttype={this.state.paymenttype} isGuarantee={this.state.isGuarantee} availPolicyText={this.state.availPolicyText} />
          <FooterPlaceholer />
          <footer className="clearfix" id='bottom_nav'>
            <div className="total pull-left">总额：￥<strong>{this.state.isGuarantee == 1? this.state.isfirstNight == 1? (this.state.guaranteePrice)*$.trim(this.state.reserveNum) : dDay*(this.state.guaranteePrice)*$.trim(this.state.reserveNum) : expressAmount+(this.state.allPrice)*$.trim(this.state.reserveNum)}</strong>
            </div>
            <div className="btns pull-right">
              <a ref="feiyongToggle" href="javascript:void(0)" onClick={this.openFeiYong}>费用明细</a>
              {!!this.state.hotelName?<button className="btn btn-orange" type="submit">{this.state.paymenttype == 3? this.state.isGuarantee == 0? '提交订单' : '去担保' : this.state.paymenttype == 2? '提交订单' : '去支付'}</button> : <button className="btn gary" type="button" disabled>去支付</button>}
            </div>
          </footer>
        </form>
        {this.state.opened?<ModalRoom closeModal={this.closeModal} picurl={this.state.picurl} checkinTime={this.state.checkinTime} sheshi={this.state.sheshi} departureTime={this.state.departureTime}/>:""}
        {this.state.showModal? <PriceDetail productPrice={this.state.productPrice} reserveNum={this.state.reserveNum} closeFeiYong={this.closeFeiYong} guaranteePrice={this.state.guaranteePrice} expressAmount={expressAmount}  dDay={dDay} isGuarantee={this.state.isGuarantee} isfirstNight={this.state.isfirstNight}/> : ''}
        {this.state.messageShow? <Alert textMessage={this.state.textMessage}/> : ''}
        {this.state.loading? <div className="send-loading"><div className="loading-inner"><img src={loading} /><span>数据提交中！</span></div></div> : ''}
        {this.state.showTimeModal?<ArriverTime closeTimeList={this.closeTimeList} guaranteeList={this.state.guaranteeList} getArrivedTime={this.getArrivedTime} currentItem={this.state.currentItem} paymenttype={this.state.paymenttype} />:""}
      </div>
    );
  }
})
export default HotelOrder