import React from 'react'
import {Link} from 'react-router'
import uddh5 from '../../common/js/common.js'
var FooterPlaceholer=React.createClass({
  render: function(){
    return (
      <div className="footer-placeholder dp-placeholder"></div>
    );
  }
});

var DpOverview=React.createClass({
  render: function(){
    var commentavg=this.props.commentavg;
    var presult=commentavg/5*100;
    return(
      <div className="dp-overview">
        <div className="score absolute-middle">
          <em><strong>{commentavg}</strong>分</em>
          <em><strong>{presult+"%"}</strong>用户满意度</em>
        </div>
        <div className="subscore">
          {$.map(this.props.awards, function(elem, index){
            return (
              <em key={index}>{elem.Provider}: {elem.Rating}</em>
            )
          })}
        </div>
      </div>
    );
  }
});

var DpAction=React.createClass({
  render: function(){
    var comments=this.props.comment;
    var icons=['icon-zan1', 'icon-yiban', 'icon-chaping'];
    return(
      <ul className="dp-action clearfix">
        <li>
          <p>全部</p>
        </li>
        {
          $.map(comments, function(elem, index){
            return (
              <li key={index}>
                <p><i className={"hotel-icon left-icon "+icons[index]}></i>{elem.title} {elem.num}</p>
              </li>
            )
          })
        }
      </ul>
    );
  }
});

var DpItems=React.createClass({
  getInitialState: function(){
    return {
      limit: 106,
      showMoreBtn: true
    }
  },
  showMore: function(e){
    this.setState({
      limit: this.props.description.length,
      showMoreBtn: false
    });
  },
  hideMore: function(){
    this.setState({
      limit: 106,
      showMoreBtn: true
    });
  },
  
  renderMoreBtn: function(){
    if(!this.state.showMoreBtn){
      return(
        <div className="more">
          <a href="javascript: void(0)" onClick={this.hideMore}><i className="hotel-icon icon-upup cicon-gray"></i></a>
        </div>
      );
    }
    return(
      <div className="more">
        <a href="javascript: void(0)" onClick={this.showMore}><i className="hotel-icon icon-downdown cicon-gray"></i></a>
      </div>
    );
  },
  render: function(){
    var limitDescription=this.state.limit,
      description=this.props.description.substring(0, this.state.limit),
      descriptionLen=this.props.description.length;
    return(
      <ul className="dp-items">
        <li className={this.state.toggleClass}>
          <a className="room-name hide" href="javascript:void(0)">商务大床房<i className="hotel-icon icon-youyou"></i></a>
          <h4>M83****32</h4>
          <div className="dp-stars">
            <i className="hotel-icon icon-star1"></i>
            <i className="hotel-icon icon-star1"></i>
            <i className="hotel-icon icon-star1"></i>
            <i className="hotel-icon icon-star1"></i>
            <i className="hotel-icon icon-star2"></i>
            <div className="star-result">
              <em className="caret"></em>
              <span>{this.props.commentavg}分</span>
            </div>
          </div>
          <p className="date">206-03-01入住，2016-04-01发布</p>
          <p className="description">{(descriptionLen!=limitDescription)? description+'...': description}</p>
          {this.renderMoreBtn()}
          <a className="dp-btn hide" href="javascript:void(0)"><i className="h
          el-icon icon-zan1"></i>有用 3</a>
        </li>
      </ul>
    );
  }
});

var DpChoose=React.createClass({
  toggleNative: function(){
    var requestHybrid={
      tagname: 'forward',
      topage:'detail',
      type:"native",
      param: {
          typeId: "10112"
      }
    }
    var native_callback=function(data){
      console.log(data);
    }
    uddh5.bridge(native_callback,requestHybrid);
  },
  render: function(){
    return(
      <div className="dp-choose">
        <a href="javascript:void(0)" onClick={this.toggleNative}><i className="hotel-icon icon-shaixuan2 left-icon"></i>筛选</a>
      </div>
    );
  }
});

var DianPing=React.createClass({
  getInitialState: function(){
    return {
      commentavg: '4',
      awards: [{Provider: "周边环境", Rating: "4.6"}, {Provider: "酒店服务", Rating: "4.6"}, {Provider: "酒店设施", Rating: "4.6"}, {Provider: "房间卫生", Rating: "4.6"}],
      comment: [{title: "满意", num: "0"}, {title: "一般", num: "0"}, {title: "待改善", num: "0"}],
      description: '酒店环境不错，房间卫生， 服务比较到位。因为餐厅装修，所以不提供餐饮，但周边小吃很方便，每餐品尝一个地方，可以保证一个星期不重样儿。 这里离静安寺比较近，仅800多米，地铁站也在那里，上海的交通总是那么方便。后又步行回酒店，颇有收获。 酒店环境不错，房间卫生， 服务比较到位。因为餐厅装修，所以不提供餐饮，但周边小吃很方便，每餐品尝一个地方，可以保证一个星期不重样儿。 这里离静安寺比较近，仅800多米，地铁站也在那里，上海的交通总是那么方便。后又步行回酒店，颇有收获。'
      
    }
  },
  componentDidMount: function(){
     //与app的交互
     var requestHybrid={
        tagname: 'forward',
        topage:'detail',
        type:"native",
        param: {
            typeId: "c10102",
            title:"房型评论"
        }
     }
     var native_callback=function(data){
          
     }
     uddh5.bridge(native_callback,requestHybrid);
  },
  render: function(){
    return(
      <div>
        <DpOverview commentavg={this.state.commentavg} awards={this.state.awards} />
        <DpAction comment={this.state.comment} />
        <DpItems commentavg={this.state.commentavg} description={this.state.description} />
        <DpChoose />
        <FooterPlaceholer />
      </div>
    );
  }
});

export default DianPing
