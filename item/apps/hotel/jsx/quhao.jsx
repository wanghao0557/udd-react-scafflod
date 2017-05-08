import React from 'react'
import {Link, Router, Route, browserHistory} from 'react-router'
import uddh5 from '../../common/js/common.js'
var countries=[
{
"key": "热门",
"arrays": [
      {
      "country": "中国大陆",
      "code": "+86"
      },
      {
      "country": "日本",
      "code": "+81"
      },
      {
      "country": "美国",
      "code": "+1"
      },
      {
      "country": "韩国",
      "code": "+82"
      },
      {
      "country": "澳大利亚",
      "code": "+61"
      },
      {
      "country": "新加坡",
      "code": "+65"
      },
      {
      "country": "加拿大",
      "code": "+1"
      },
      {
      "country": "法国",
      "code": "+33"
      },
      {
      "country": "马来西亚",
      "code": "+60"
      },
      {
      "country": "俄罗斯",
      "code": "+7"
      },
      {
      "country": "德国 ",
      "code": "+49"
      },
      {
      "country": "泰国",
      "code": "+66"
      }
      ]
},
{
"key": "A",
"arrays": [
      {
      "country": "阿尔巴尼亚",
      "code": "+355"
      },
      {
      "country": "阿尔及利亚",
      "code": "+213"
      },
      {
      "country": "阿富汗",
      "code": "+93"
      },
      {
      "country": "阿根廷",
      "code": "+54"
      },
      {
      "country": "阿拉伯联合酋长国",
      "code": "+971"
      },
      {
      "country": "阿曼",
      "code": "+968"
      },
      {
      "country": "阿塞拜疆",
      "code": "+994"
      },
      {
      "country": "阿森松",
      "code": "+247"
      },
      {
      "country": "埃及",
      "code": "+20"
      },
      {
      "country": "埃塞俄比亚",
      "code": "+251"
      },
      {
      "country": "爱尔兰",
      "code": "+353"
      },
      {
      "country": "爱沙尼亚",
      "code": "+372"
      },
      {
      "country": "安道尔共和国",
      "code": "+376"
      },
      {
      "country": "安哥拉",
      "code": "+244"
      },
      {
      "country": "安圭拉岛",
      "code": "+1264"
      },
      {
      "country": "安提瓜和巴布达",
      "code": "+1268"
      },
      {
      "country": "奥地利",
      "code": "+43"
      },
      {
      "country": "澳大利亚",
      "code": "+61"
      },
      {
      "country": "澳门",
      "code": "+853"
      }
      ]
},
{
"key": "B",
"arrays": [
      {
      "country": "巴巴多斯",
      "code": "+1246"
      },
      {
      "country": "巴布亚新几内亚",
      "code": "+675"
      },
      {
      "country": "巴哈马",
      "code": "+1242"
      },
      {
      "country": "巴基斯坦",
      "code": "+92"
      },
      {
      "country": "巴拉圭",
      "code": "+595"
      },
      {
      "country": "巴林",
      "code": "+973"
      },
      {
      "country": "巴拿马",
      "code": "+507"
      },
      {
      "country": "巴西",
      "code": "+55"
      },
      {
      "country": "白俄罗斯",
      "code": "+375"
      },
      {
      "country": "百慕大群岛",
      "code": "+1441"
      },
      {
      "country": "保加利亚",
      "code": "+359"
      },
      {
      "country": "贝宁",
      "code": "+229"
      },
      {
      "country": "比利时",
      "code": "+32"
      },
      {
      "country": "冰岛",
      "code": "+354"
      },
      {
      "country": "波多黎各",
      "code": "+1787"
      },
      {
      "country": "波兰",
      "code": "+48"
      },
      {
      "country": "玻利维亚",
      "code": "+591"
      },
      {
      "country": "伯利兹",
      "code": "+501"
      },
      {
      "country": "博茨瓦纳",
      "code": "+267"
      },
      {
      "country": "布基纳法索",
      "code": "+226"
      },
      {
      "country": "布隆迪",
      "code": "+257"
      }
      ]
},
{
"key": "C",
"arrays": [
      {
      "country": "朝鲜",
      "code": "+850"
      }
      ]
},
{
"key": "D",
"arrays": [
      {
      "country": "丹麦",
      "code": "+45"
      },
      {
      "country": "德国",
      "code": "+49"
      },
      {
      "country": "东萨摩亚(美)",
      "code": "+684"
      },
      {
      "country": "多哥",
      "code": "+228"
      },
      {
      "country": "多米尼加共和国",
      "code": "+1890"
      }
      ]
},
{
"key": "E",
"arrays": [
      {
      "country": "俄罗斯",
      "code": "+7"
      },
      {
      "country": "厄瓜多尔",
      "code": "+593"
      }
      ]
},
{
"key": "F",
"arrays": [
      {
      "country": "法国",
      "code": "+33"
      },
      {
      "country": "法属玻利尼西亚",
      "code": "+689"
      },
      {
      "country": "法属圭亚那",
      "code": "+594"
      },
      {
      "country": "菲律宾",
      "code": "+63"
      },
      {
      "country": "斐济",
      "code": "+679"
      },
      {
      "country": "芬兰",
      "code": "+358"
      }
      ]
},
{
"key": "G",
"arrays": [
      {
      "country": "冈比亚",
      "code": "+220"
      },
      {
      "country": "刚果",
      "code": "+242"
      },
      {
      "country": "哥伦比亚",
      "code": "+57"
      },
      {
      "country": "哥斯达黎加",
      "code": "+506"
      },
      {
      "country": "格林纳达",
      "code": "+1809"
      },
      {
      "country": "格鲁吉亚",
      "code": "+995"
      },
      {
      "country": "古巴",
      "code": "+53"
      },
      {
      "country": "关岛",
      "code": "+1671"
      },
      {
      "country": "圭亚那",
      "code": "+592"
      }
      ]
},
{
"key": "H",
"arrays": [
      {
      "country": "哈萨克斯坦",
      "code": "+327"
      },
      {
      "country": "海地",
      "code": "+509"
      },
      {
      "country": "韩国",
      "code": "+82"
      },
      {
      "country": "荷兰",
      "code": "+31"
      },
      {
      "country": "荷属安的列斯",
      "code": "+599"
      },
      {
      "country": "洪都拉斯",
      "code": "+504"
      }
      ]
},
{
"key": "J",
"arrays": [
      {
      "country": "吉布提",
      "code": "+253"
      },
      {
      "country": "吉尔吉斯坦",
      "code": "+331"
      },
      {
      "country": "几内亚",
      "code": "+224"
      },
      {
      "country": "加拿大",
      "code": "+1"
      },
      {
      "country": "加纳",
      "code": "+233"
      },
      {
      "country": "加蓬",
      "code": "+241"
      },
      {
      "country": "柬埔寨",
      "code": "+855"
      },
      {
      "country": "捷克",
      "code": "+420"
      },
      {
      "country": "津巴布韦",
      "code": "+263"
      }
      ]
},
{
"key": "K",
"arrays": [
      {
      "country": "喀麦隆",
      "code": "+237"
      },
      {
      "country": "卡塔尔",
      "code": "+974"
      },
      {
      "country": "开曼群岛",
      "code": "+1345"
      },
      {
      "country": "科特迪瓦",
      "code": "+225"
      },
      {
      "country": "科威特",
      "code": "+965"
      },
      {
      "country": "肯尼亚",
      "code": "+254"
      },
      {
      "country": "库克群岛",
      "code": "+682"
      }
      ]
},
{
"key": "L",
"arrays": [
      {
      "country": "拉脱维亚",
      "code": "+371"
      },
      {
      "country": "莱索托",
      "code": "+266"
      },
      {
      "country": "老挝",
      "code": "+856"
      },
      {
      "country": "黎巴嫩",
      "code": "+961"
      },
      {
      "country": "立陶宛",
      "code": "+370"
      },
      {
      "country": "利比里亚",
      "code": "+231"
      },
      {
      "country": "利比亚",
      "code": "+218"
      },
      {
      "country": "列支敦士登",
      "code": "+423"
      },
      {
      "country": "留尼旺",
      "code": "+262"
      },
      {
      "country": "卢森堡",
      "code": "+352"
      },
      {
      "country": "罗马尼亚",
      "code": "+40"
      }
      ]
},
{
"key": "M",
"arrays": [
      {
      "country": "马达加斯加",
      "code": "+261"
      },
      {
      "country": "马尔代夫",
      "code": "+960"
      },
      {
      "country": "马耳他",
      "code": "+356"
      },
      {
      "country": "马拉维",
      "code": "+265"
      },
      {
      "country": "马来西亚",
      "code": "+60"
      },
      {
      "country": "马里",
      "code": "+223"
      },
      {
      "country": "马里亚那群岛",
      "code": "+1670"
      },
      {
      "country": "马提尼克",
      "code": "+596"
      },
      {
      "country": "毛里求斯",
      "code": "+230"
      },
      {
      "country": "美国",
      "code": "+1"
      },
      {
      "country": "蒙古",
      "code": "+976"
      },
      {
      "country": "蒙特塞拉特岛",
      "code": "+1664"
      },
      {
      "country": "孟加拉国",
      "code": "+880"
      },
      {
      "country": "秘鲁",
      "code": "+51"
      },
      {
      "country": "缅甸",
      "code": "+95"
      },
      {
      "country": "摩尔多瓦",
      "code": "+373"
      },
      {
      "country": "摩洛哥",
      "code": "+212"
      },
      {
      "country": "摩纳哥",
      "code": "+377"
      },
      {
      "country": "莫桑比克",
      "code": "+258"
      },
      {
      "country": "墨西哥",
      "code": "+52"
      }
      ]
},
{
"key": "N",
"arrays": [
      {
      "country": "纳米比亚",
      "code": "+264"
      },
      {
      "country": "南非",
      "code": "+27"
      },
      {
      "country": "南斯拉夫",
      "code": "+381"
      },
      {
      "country": "瑙鲁",
      "code": "+674"
      },
      {
      "country": "尼泊尔",
      "code": "+977"
      },
      {
      "country": "尼加拉瓜",
      "code": "+505"
      },
      {
      "country": "尼日尔",
      "code": "+227"
      },
      {
      "country": "尼日利亚",
      "code": "+234"
      },
      {
      "country": "挪威",
      "code": "+47"
      }
      ]
},
{
"key": "P",
"arrays": [
      {
      "country": "葡萄牙",
      "code": "+351"
      }
      ]
},
{
"key": "R",
"arrays": [
      {
      "country": "日本",
      "code": "+81"
      },
      {
      "country": "瑞典",
      "code": "+46"
      },
      {
      "country": "瑞士",
      "code": "+41"
      }
      ]
},
{
"key": "S",
"arrays": [
      {
      "country": "萨尔瓦多",
      "code": "+503"
      },
      {
      "country": "塞拉利昂",
      "code": "+232"
      },
      {
      "country": "塞内加尔",
      "code": "+221"
      },
      {
      "country": "塞浦路斯",
      "code": "+357"
      },
      {
      "country": "塞舌尔",
      "code": "+248"
      },
      {
      "country": "沙特阿拉伯",
      "code": "+966"
      },
      {
      "country": "圣多美和普林西比",
      "code": "+239"
      },
      {
      "country": "圣卢西亚",
      "code": "+1758"
      },
      {
      "country": "圣马力诺",
      "code": "+378"
      },
      {
      "country": "圣文森特",
      "code": "+1784"
      },
      {
      "country": "圣文森特岛",
      "code": "+1784"
      },
      {
      "country": "斯里兰卡",
      "code": "+94"
      },
      {
      "country": "斯洛伐克",
      "code": "+421"
      },
      {
      "country": "斯洛文尼亚",
      "code": "+386"
      },
      {
      "country": "斯威士兰",
      "code": "+268"
      },
      {
      "country": "苏丹",
      "code": "+249"
      },
      {
      "country": "苏里南",
      "code": "+597"
      },
      {
      "country": "所罗门群岛",
      "code": "+677"
      },
      {
      "country": "索马里",
      "code": "+252"
      }
      ]
},
{
"key": "T",
"arrays": [
      {
      "country": "塔吉克斯坦",
      "code": "+992"
      },
      {
      "country": "台湾省",
      "code": "+886"
      },
      {
      "country": "泰国",
      "code": "+66"
      },
      {
      "country": "坦桑尼亚",
      "code": "+255"
      },
      {
      "country": "汤加",
      "code": "+676"
      },
      {
      "country": "特立尼达和多巴哥",
      "code": "+1809"
      },
      {
      "country": "突尼斯",
      "code": "+216"
      },
      {
      "country": "土耳其",
      "code": "+90"
      },
      {
      "country": "土库曼斯坦",
      "code": "+993"
      }
      ]
},
{
"key": "W",
"arrays": [
      {
      "country": "危地马拉",
      "code": "+502"
      },
      {
      "country": "委内瑞拉",
      "code": "+58"
      },
      {
      "country": "文莱",
      "code": "+673"
      },
      {
      "country": "乌干达",
      "code": "+256"
      },
      {
      "country": "乌克兰",
      "code": "+380"
      },
      {
      "country": "乌拉圭",
      "code": "+598"
      },
      {
      "country": "乌兹别克斯坦",
      "code": "+233"
      }
      ]
},
{
"key": "X",
"arrays": [
      {
      "country": "西班牙",
      "code": "+34"
      },
      {
      "country": "西萨摩亚",
      "code": "+685"
      },
      {
      "country": "希腊",
      "code": "+30"
      },
      {
      "country": "香港",
      "code": "+852"
      },
      {
      "country": "新加坡",
      "code": "+65"
      },
      {
      "country": "新西兰",
      "code": "+64"
      },
      {
      "country": "匈牙利",
      "code": "+36"
      },
      {
      "country": "叙利亚",
      "code": "+963"
      }
      ]
},
{
"key": "Y",
"arrays": [
      {
      "country": "牙买加",
      "code": "+1876"
      },
      {
      "country": "亚美尼亚",
      "code": "+374"
      },
      {
      "country": "也门",
      "code": "+967"
      },
      {
      "country": "伊拉克",
      "code": "+964"
      },
      {
      "country": "伊朗",
      "code": "+98"
      },
      {
      "country": "以色列",
      "code": "+972"
      },
      {
      "country": "意大利",
      "code": "+39"
      },
      {
      "country": "印度",
      "code": "+91"
      },
      {
      "country": "印度尼西亚",
      "code": "+62"
      },
      {
      "country": "英国",
      "code": "+44"
      },
      {
      "country": "约旦",
      "code": "+962"
      },
      {
      "country": "越南",
      "code": "+84"
      }
      ]
},
{
"key": "Z",
"arrays": [
      {
      "country": "赞比亚",
      "code": "+260"
      },
      {
      "country": "扎伊尔",
      "code": "+243"
      },
      {
      "country": "乍得",
      "code": "+235"
      },
      {
      "country": "直布罗陀",
      "code": "+350"
      },
      {
      "country": "智利",
      "code": "+56"
      },
      {
      "country": "中非共和国",
      "code": "+236"
      },
      {
      "country": "中国大陆",
      "code": "+86"
      }
      ]
}
];
var CountryList=React.createClass({
  getInitialState: function(){
    return{
      quhao: ''
    }
  },
  quhaoNative: function(code){
    //与app的交互
    var requestHybrid={
      tagname: 'forward',
      topage:'order',
      type:"native",
      item:"hotel",
      param: {
          typeId: "10124",
          quhao: code
      }
    }
    var native_callback=function(data){
        
    }
    uddh5.bridge(native_callback,requestHybrid);
  },
  render: function(){
    var arrays=this.props.arrays;
    return(
      <ul className="country-list">
        {$.map(arrays, function(elem, index){
          return(
            <li key={'country'+index} onClick={this.quhaoNative.bind(this, elem.code)}>{elem.country}<div className="absolute-middle country-code">{elem.code}</div></li>
          )
        }.bind(this))}
      </ul>
    )
  }
});
var Countries=React.createClass({
  render: function(){
    return(
      <div>
        {$.map(this.props.countries, function(elem, index){
          return (
            <div className="padding-inner item" key={'label'+index}>
              <h2><a id={"key"+index}>{elem.key}</a></h2>
              <CountryList key={'countrylist'+index} arrays={elem.arrays} />
            </div>
          )
        }.bind(this))}
      </div>
    )
  }
});
var JianSuoAside=React.createClass({
  scrollTarget: function(index){
      var top=$('#key'+index).offset().top;
      $(window).scrollTop(top);
  },
  showSearchBox: function(){
    this.props.toggleSearchbox();
  },
  render: function(){
    var capitalLetters=['A','B','C','D','E','F','G','H','J','K','L','M','N','P','R','S','T','W','X','Y','Z'];
    return(
      <div className="absolute-middle jiansuo-aside">
        <a href="javascript:void(0)" onClick={this.showSearchBox}><i className="hotel-icon icon-search"></i></a>
        {$.map(capitalLetters, function(elem, index){
          return(
            <a id={'letter_'+(index+1)} href="javascript:void(0)" key={'letter'+index} onClick={this.scrollTarget.bind(this, index+1)}>{elem}</a>
          )
        }.bind(this))}
      </div>
    )
  }
});

var SearchList= React.createClass({
  render: function(){
    var countries=this.props.countries.slice(1);
    return(
      <div className="searchlist">
        {$.map(countries, function(elem, index){
          var arrays=$.grep(elem.arrays, function (element) {return element.country.indexOf(this.props.filterText) > -1}.bind(this));
          return (
            <div className="padding-inner item" key={'label'+index}>
              <CountryList key={'countrylist'+index} arrays={arrays} />
            </div>
          )
        }.bind(this))}
      </div>
    )
  }
})

var SearchBar = React.createClass({
  componentDidMount: function(){
    this.refs.filterTextInput.focus();
  },
  handleChange: function() {
    this.props.onUserInput(this.refs.filterTextInput.value);
  },
  render: function() {
    return (
        <div className="search-box">
          <i className="hotel-icon icon-search absolute-middle"></i>
          <input type="search" ref="filterTextInput" onChange={this.handleChange} placeholder="输入国家名称" value={this.props.filterText}/>
        </div>
    );
  }
});

var UddQuhao=React.createClass({
  getDefaultProps: function(){
    return{
      countries: countries
    }
  },
  getInitialState: function(){
    return{
      shown: false,
      filterText: ''
    }
  },
  handleUserInput: function(filterText) {
    this.setState({
        filterText: filterText,
    });
  },
  shown: function(){
    this.setState({
      shown: true
    });
  },
  componentDidMount() {
    //与app的交互
    var requestHybrid={
      tagname: 'forward',
      topage:'order',
      type:"native",
      param: {
          typeId: "c10123",
          title: "选择国家或地区区号"
      }
    }
    var native_callback=function(data){
        
    }
    uddh5.bridge(native_callback,requestHybrid);
  },
  render: function(){
    return (
      <div className="quhao-component">
        {this.state.shown? <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput} /> : ''}
        {!!(this.state.filterText)? <SearchList countries={this.props.countries} filterText={this.state.filterText}/> : <Countries countries={this.props.countries} />}
        <JianSuoAside toggleSearchbox={this.shown}/>
      </div>
    )
  }
});
export default UddQuhao