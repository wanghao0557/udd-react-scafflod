import React from 'react';
import uddh5 from '../../common/js/common.js';
import BaiduMobStat from '../../common/js/mobstat.js'

var SellSheShi=React.createClass({
  getInitialState: function(){
    return{
      limit: 6,
      more: true
    }
  },
  showMore: function(e){
    e.preventDefault();
    this.setState({
      more: false,
      limit: this.props.sheshi.length
    });
  },
  hideMore: function(){
    this.setState({
      limit: 6,
      more: true
    });
  },
  renderMoreBtn: function(){
    if(!this.state.more){
      return(
          <div className="more">
            <a href="javascript: void(0)" onClick={this.hideMore}>收起<i className="hotel-icon icon-upup right-icon"></i></a>
          </div>
      );
    }
    return(
        <div className="more">
          <a href="javascript: void(0)" onClick={this.showMore}>查看更多<i className="hotel-icon icon-downdown right-icon"></i></a>
        </div>
    );
  },
  render: function(){
    //var ssnum=this.props.sheshi.slice(0, this.state.limit);
    return (
      <div className="sell-hd">
        <h2>酒店设施</h2>
        <div className="sell-bd sell-boxshadow">
          <div className="sell-icon clearfix">
            <p><b>通用设施：</b>{this.props.generalFacilitiesName}</p>
            <p><b>活动设施：</b>{this.props.activityFacilitiesName}</p>
            <p><b>服务项目设施：</b>{this.props.serviceItemName}</p>
          </div>
          {/*this.renderMoreBtn()*/}
        </div>
      </div>
    );
  }
});
var AsideList=React.createClass({
  getInitialState: function(){
    return{
      one: false,
      zhoubians: []
    }
  },
  componentDidUpdate: function(){
    if(this.state.one == false){
      this.getAround();
    }else{
      return;
    }
  },
  getAround: function(){
    if(!!this.props.lan){
      $.post(uddh5.apihost+'/getaroundpoilist', {type:5, longitude:this.props.lon, latitude:this.props.lan, distance:10, number: 3}, function(data){
        var data=data.data;
        this.setState({
          zhoubians: data
        })
      }.bind(this));
      this.setState({
        one: true
      })
    }else {return}
  },
  render: function(){
    return(
      <div className="sell-boxshadow">
        <ul>
          {$.map(this.state.zhoubians, function(elem, index){
            return(
              <li key={index} className='expand'>
                <p><b>{elem.name}</b><a className="pull-right"><i className="hotel-icon icon-downdown right-icon cicon-gray icon-youyou"></i></a></p>
                <p className="expand-text"></p>
                </li>);
          })}
        </ul>
      </div>
    )
  }
});
// var SellAside=React.createClass({
//   getInitialState: function(){
//     return {
//       limit: 3,
//       showMoreBtn: true,
//       open: false,
//       stattprice: ''
//     }
//   },
//   componentDidMount: function(){
//     $.post(uddh5.apihost+'/getapphotelroomtype', {hotelId:hotelid, startDate:starttime, endDate:endtime}, function(data){
//         var stattprice=!!data.data.roomType.length? data.data.roomType[0].stattprice : '';
//         if(this.isMounted()){
//               this.setState({
//                   stattprice: stattprice
//               });
//         }
        
//     }.bind(this))
//   },
//   showMore: function(){
//     this.setState({
//       limit: this.props.zhoubian.length,
//       showMoreBtn: false
//     });
//   },
//   hideMore: function(){
//     this.setState({
//       limit: 3,
//       showMoreBtn: true
//     });
//   },
//   // renderMoreBtn: function(){
//   //  if(!this.state.showMoreBtn){
//   //    return (
//   //        <div className="more">
//   //          <a href="javascript: void(0)" onClick={this.hideMore}>收起<i className="hotel-icon icon-upup right-icon"></i></a>
//   //        </div>
//   //      );
//   //  }
//   //  return (
//   //      <div className="more">
//   //        <a href="javascript: void(0)" onClick={this.showMore}>查看更多<i className="hotel-icon icon-downdown right-icon"></i></a>
//   //      </div>
//   //  );
//   // },
//   Togglecollapsed: function(elem){
//     this.setState({
//       curItem: elem,
//       open: !this.state.open
//     });
//   },
//   toggleLonLat: function(){
//     $.post(uddh5.apihost+'/gethotelbasisinfo', {id: hotelid}, function(data){
//       var data=data;
//       if(data.code == 1){
//       //与app的交互
//        var requestHybrid={
//           tagname: 'forward',
//           topage:'detail',
//           type:"native",
//           param: {
//               typeId: "10111",
//               lon: this.props.lon,
//               lat: this.props.lat,
//               detailAddress: data.data.detailAddress,
//               name: data.data.hotelName,
//               commentavg: data.data.hotelScore,
//               stattprice: this.state.stattprice
//           }
//        }
//        var native_callback=function(data){
            
//        }
//        uddh5.bridge(native_callback,requestHybrid);
//       }
//     }.bind(this))
//   },
//   render: function(){
//     //var zhoubians=this.props.zhoubian.slice(0, this.state.limit);
//     return (
//       <div className="sell-hd sell-aside">
//         <h2>周边信息</h2>
//         <a className="extra" href="javascript:void(0)" onClick={this.toggleLonLat}>在地图上显示</a>
//         <AsideList lon={this.props.lon} lan={this.props.lat}/>
//       </div>
//     );
//   }
// });

var SellJieShao=React.createClass({
  render: function(){
    return (
      <div className="sell-hd">
        <h2>酒店介绍</h2>
        <span className="extra">联系酒店：<a href={"tel:"+this.props.tel}>{this.props.tel}</a></span>
        <div className="sell-bd sell-boxshadow intro" dangerouslySetInnerHTML={{__html:this.props.introduction}} />
      </div>
    );
  }
});

var HotelInfo=React.createClass({
  getInitialState: function(){
    return{
      hotelId: '',
      lat: '',
      lon: '',
      generalFacilitiesName: '',
      activityFacilitiesName: '',
      serviceItemName: '',
      phone: '',
      introduction: ''
    };
  },
  componentWillMount: function(){
    BaiduMobStat.onPageStart('information');
  },
  componentDidMount: function(){
    var hotelid = uddh5.location.queryHash().split("/")[2];
    $.post(uddh5.apihost+'/getelonghotelfacinfo', {id: hotelid,resourceType:uddh5.location.queryKey('resourceType')}, function(data){
      var data=data.data;
      if(this.isMounted()){
        this.setState({
          hotelId: data.hotelId,
          lat: !!data.location? data.location.lat : '',
          lon: !!data.location? data.location.lon : '',
          generalFacilitiesName: data.generalFacilitiesName,
          activityFacilitiesName: data.activityFacilitiesName,
          serviceItemName: data.serviceItemName,
          phone: data.phone,
          introduction: data.introduction
        });
      }
    }.bind(this));
      //与app的交互
      var requestHybrid={
         tagname: 'forward',
         topage:'detail',
         type:"native",
         param: {
             typeId: "c10104",
             title:"酒店详情"
         }
      }
      var native_callback=function(data){
            
      }
      uddh5.bridge(native_callback,requestHybrid);
  },
  componentWillUnmount: function(){
    BaiduMobStat.onPageEnd('information');
  },
  render: function(){
    return(
      <div>
        <div className="hotel-sellp">
          <SellSheShi generalFacilitiesName={this.state.generalFacilitiesName} activityFacilitiesName={this.state.activityFacilitiesName}  serviceItemName={this.state.serviceItemName}/>
          {/*<SellAside lat={this.state.lat} lon={this.state.lon} />*/}
          <SellJieShao introduction={this.state.introduction} tel={this.state.phone} />
        </div>
      </div>
    );
  }
});

export default HotelInfo