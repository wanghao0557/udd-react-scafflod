function Hotel_data(){
	this.success={
		code:1,
		msg:"操作成功",
		data:null
	}
}
Hotel_data.prototype.room=function(id){
	if(id=123){
		 this.success.data={
			"id":123,
			"name":"豪华大酒店",
			"ImageItems": ["http://static.uddtrip.com/group1/M00/00/06/rBEIZleatwGAHo7rAAOi8ecsfrI912.jpg", "http://static.uddtrip.com/group1/M00/00/06/rBEIZleatwGAHo7rAAOi8ecsfrI912.jpg", "http://static.uddtrip.com/group1/M00/00/06/rBEIZleatwGAHo7rAAOi8ecsfrI912.jpg"],
			"Awards": {"dianping": "356", "tuijian": "11", "gaishan": "4"},
			"Sheshi": [{"title": "早餐", "text": "双早"}, {"title": "面积", "text": "25平米"}, {"title": "可住", "text": "2人"}, {"title": "加床", "text": "该房型不可加床"}, {"title": "楼层", "text": "1-5层"}, {"title": "床宽", "text": "双人床1.5 米"}, {"title": "宽带", "text": "全部房间wifi有线宽带免费"}, {"title": "其它", "text": "其它"}]

		 }
	}	
	return this.success;
}
Hotel_data.prototype.detail=function(id){	
    if(id=123){
        this.success.data= {
            "id":123,
            "lon": 121.395516,
            "phone": "021-62085888",
            "hotelHeadPic": "http://static.uddtrip.com/group1/M00/00/06/rBEIZleatwGAHo7rAAOi8ecsfrI912.jpg",
            "hotelEnName": "Grand Millennium Shanghai HongQiao",
            "commentSum": "10",
            "comment":[
              {"title": "满意", "num": "9"},
              {"title": "一般", "num": "1"},
              {"title": "待改善", "num": "0"}
            ],
            "hotelPic": "http://static.uddtrip.com/group1/M00/00/06/rBEIZleatwGAPlcPAANB3iO9nnM497.jpg,http://static.uddtrip.com/group1/M00/00/06/rBEIZleatwGAIT9-AAL-9T75flc885.jpg,http://static.uddtrip.com/group1/M00/00/06/rBEIZleatwGAIX_NAAOSjb-nvEo603.jpg,http://static.uddtrip.com/group1/M00/00/06/rBEIZleatwGAcS3aAAMA6vQr-Lg092.jpg,http://static.uddtrip.com/group1/M00/00/06/rBEIZleatwGAT8cPAAOvCjcrHNw274.jpg,",
            "hotelId": "102000003",
            "detailAddress": "上海长宁区延安西路2588号 ，近古北路。",
            "hotelAddress": "亚洲中国上海市上海市长宁区",
            "hotelName": "上海千禧海鸥大酒店",
            "roomType": [
                {
                    "buildingarea": "40",
                    "roomTypeName": "贵宾双床房"
                },
                {
                    "buildingarea": "40",
                    "roomTypeName": "贵宾双床房"
                }
            ],
            "commentavg": 4.8,
            "hotelClassName": "五星/豪华",
            "lat": 31.196995,
            "introduction": "<p>上海千禧海鸥大酒店坐落于虹桥中心区域,&nbsp;是一个闹中有静的城市花园酒店,&nbsp;拥有18,000平米的花园,&nbsp;绿化面积达60%&nbsp;以上.&nbsp;酒店安装有太阳能发电装置,专门给电动汽车充电的充电站等,&nbsp;是名副其实的绿色酒店.&nbsp;&nbsp;<br/>　　<br/>　　酒店的地理位置优越,&nbsp;紧邻国家会展中心(上海),&nbsp;古北家乐福,&nbsp;上海世贸商城以及各大领事馆.&nbsp;15-20分钟车程即可抵达上海虹桥机场和虹桥火车站(高铁)</p>",
            "Awards": {
              // 酒店等级、评分
              "Award": [
                {
                  "Provider": "周边环境",
                  "Rating": "4.5"
                },
                {
                  "Provider": "酒店服务",
                  "Rating": "4.1"
                },
                {
                  "Provider": "酒店设施",
                  "Rating": "4.4"
                },
                {
                  "Provider": "房间卫生",
                  "Rating": "4.3"
                }
              ]
            },
            "AreaInfo": {
              // 地标类区域和建筑列表
              "RefPoints": {
                // 区标
                "RefPoint": [
                  {
                    // 距离数
                    "Distance": "1.0",
                    "Description": "开车行驶4分钟",
                    "Name": "东方明珠"
                  },
                  {
                    // 距离数
                    "Distance": "1.2",
                    "Description": "开车行驶4分钟",
                    "Name": "外滩"
                  },
                  {
                    // 距离数
                    "Distance": "2.0",
                    "Description": "开车行驶4分钟",
                    "Name": "城隍庙"
                  },
                  {
                    // 距离数
                    "Distance": "1.0",
                    "Description": "开车行驶4分钟",
                    "Name": "东方明珠"
                  }
                ]
              }
            },
            "Services": {
              // 酒店服务和设备
              "Service": [
                {
                  // 设施设备代码, 参考CodeList (HAC)
                  "Code": "76",
                  // 设施设备类别，例如：客房设施和服务、宾馆餐饮设施等
                  "ID": "1004",
                  // 施或服务文字描述
                  "DescriptiveText": "免费停车"
                },
                {
                  "Code": "77",
                  "ID": "1004",
                  "DescriptiveText": "健身房"
                },
                {
                  "Code": "78",
                  "ID": "1004",
                  "DescriptiveText": "餐厅"
                },
                {
                  "Code": "79",
                  "ID": "1004",
                  "DescriptiveText": "叫醒服务"
                },
                {
                  "Code": "80",
                  "ID": "1004",
                  "DescriptiveText": "24小时热水"
                },
                {
                  "Code": "81",
                  "ID": "1004",
                  "DescriptiveText": "行李寄存"
                },
                {
                  "Code": "82",
                  "ID": "1004",
                  "DescriptiveText": "健身房"
                },
                {
                  "Code": "83",
                  "ID": "1004",
                  "DescriptiveText": "健身房"
                }
              ]
            },
            description: "酒店环境不错，房间卫生， 服务比较到位。因为餐厅装修，所以不提供餐饮，但周边小吃很方便，每餐品尝一个地方，可以保证一个星期不重样儿。 这里离静安寺比较近，仅800多米，地铁站也在那里，上海的交通总是那么方便。后又步行回酒店，颇有收获.酒店环境不错，房间卫生， 服务比较到位。因为餐厅装修，所以不提供餐饮，但周边小吃很方便，每餐品尝一个地方，可以保证一个星期不重样儿。 这里离静安寺比较近，仅800多米，地铁站也在那里，上海的交通总是那么方便。后又步行回酒店，颇有收获。"
        }
    }	
    return this.success;
}
Hotel_data.prototype.gethotelfacinfo=function(id){//获取酒店详情(设施)
    this.success.data={
      "hotelId": "102000078",
      "location": {
          "lat": 31.192745,
          "lon": 121.348983
      },
      "generalFacilitiesName": "大堂吧,大堂免费报纸,电梯,多功能厅,多媒体演示系统,非经营性客人休息区,公共区域闭路电视监控系统,公共音响系统,免费停车场,前台贵重物品保险柜,无烟楼层,有可无线上网的公共区域 免费,中餐厅,中央空调,礼品廊,行政楼层,",
      "activityFacilitiesName": "健身室,",
      "serviceItemName": "24小时前台服务,行李寄存,会议厅,婚宴服务,叫车服务,叫醒服务,接机服务,礼宾服务,商务中心,送餐服务,外币兑换服务,信用卡结算服务,一次性账单结算服务,邮政服务,专职行李员,专职门童,租车服务,",
      "phone": "021-62687788",
      "introduction": "<p>上海虹桥机场华港雅阁酒店位于虹桥枢纽一号航站楼，10号地铁线一号航站楼出口处，离虹桥国际机场仅几步之遥，毗邻二号航站楼和虹桥火车站（高铁），可直达浦东机场、各大繁华商业区、会展中心，交通便利。<br/>　　上海虹桥机场华港雅阁酒店拥有各式温馨客房，设计精美，环境优雅。酒店内设餐厅，为您奉上多样化美食，更提供长达18小时的膳食服务。便利的交通、齐全的服务项目、豪华的设施设备，上海华港雅阁酒店是您在商务、度假和宴会活动的安心选择。</p>"
    }
    return this.success;
}
Hotel_data.prototype.gethotelbasisinfo=function(id){  //获取酒店基本信息
     this.success.data=  {
          "hotelId": "102000078",
          "hotelName": "上海虹桥机场华港雅阁酒店",
          "hotelClassName": "四星/高档",
          "detailAddress": "上海长宁区空港一路458号上海虹桥机场内 ，近机场迎宾一路、国家会展中心。",
          "location": {
              "lat": 31.192745,
              "lon": 121.348983
          },
          "hotelHeadPic": "http://static.uddtrip.com/group1/M00/00/91/rBEIZVebG6yAR6iqAAM8a8O5cC0538.jpg",
          "hotelPicNum":5,
          "hotelScore": 0,
          "commentNum": 0
    }
    return this.success;
}
Hotel_data.prototype.getroomtype=function(id){  //获取房间信息
     this.success.data=  {
          "roomType": [
              {
                  "roomTypeId": "202000202",
                  "roomTypeName": "高级双床房",
                  "buildingArea": "28",
                  "bedType": "双床",
                  "picurl": "http://static.uddtrip.com/group1/M00/00/91/rBEIZVebG6yAXriHAAPDE2WuO2k418.jpg",
                  "stattprice": 528,
                  "hotelProduct": [
                      {
                          "productId": "405000204",
                          "resouceId": "302000207",
                          "productName": "上海虹桥机场华港雅阁酒店",
                          "includingbreakfastNane": "双早",
                          "refundPolicyName": "不可取消",
                          "refundDays": 0,
                          "refundTime": "00:00:00",
                          "refundRuleName": "扣全款",
                          "productPrice": 528,
                          "issell": 0
                      }
                  ]
              },
              {
                  "roomTypeId": "202000203",
                  "roomTypeName": "高级大床房",
                  "buildingArea": "25",
                  "bedType": "大床",
                  "picurl": "http://static.uddtrip.com/group1/M00/00/91/rBEIZVebG6yAXriHAAPDE2WuO2k418.jpg",
                  "stattprice": 528,
                  "hotelProduct": [
                      {
                          "productId": "405000205",
                          "resouceId": "302000213",
                          "productName": "上海虹桥机场华港雅阁酒店",
                          "includingbreakfastNane": "不含",
                          "refundPolicyName": "不可取消",
                          "refundDays": 0,
                          "refundTime": "00:00:00",
                          "refundRuleName": "扣全款",
                          "productPrice": 528,
                          "issell": 0
                      }
                  ]
              }
          ],
          "hotelId": "102000078"
    }
    return this.success;
}
Hotel_data.prototype.gethotelproductinfo=function(id){//获取房间产品信息
    this.success.data={
        "hotelId": "102000078",
        "roomTypeId": "202000202",
        "roomTypeName": "高级双床房",
        "buildingArea": "25",
        "maxPerson": 2,
        "bedType": "双床",
        "bedNum": 2,
        "bedSize": "1.1",
        "broadBand": 0,
        "broadBandName": "免费有线",
        "isAddBed": 0,
        "isAddBedName": "不可加床",
        "facilities": "1,2,3,4,8,9,10,11,13,14,17,22,25,26,28,29,31,32,33,34,35",
        "facilitiesName": "110V电压插座,220V电压插座,24小时热水,备用床具,电话,电热水壶,多种规格电源插座,房内保险箱,国际长途电话,国内长途电话,开夜床,迷你吧,手动窗帘,书桌,拖鞋,洗浴间电话,雨伞,浴缸,熨衣设备,遮光窗帘,针线包,",
        "mediaFacilities": "1,2,3,6,7,10,11,12,13,14",
        "mediaFacilitiesName": "吹风机,电子秤,房间内高速上网,客房WIFI覆盖免费,闹钟,小冰箱,液晶电视机,有线频道,语音留言,卫星频道,",
        "food": "3",
        "foodName": "免费瓶装水,",
        "bathRoom": "1,2,3,4",
        "bathRoomName": "独立淋浴间,免费洗漱用品(6样以上),浴室化妆放大镜,浴衣,",
        "picurl": null,
        "checkinTime": "12:00",
        "departureTime": "12:00",
        "hotelProduct": {
            "productId": "405000204",
            "resouceId": "302000207",
            "productName": "上海虹桥机场华港雅阁酒店",
            "includingbreakfastNane": "双早",
            "refundPolicyName": "不可取消",
            "refundDays": 0,
            "refundTime": "00:00:00",
            "refundRuleName": "扣全款",
            "productPrice": 528,
            "issell": 1
        }
    }
    return this.success;
}
module.exports=new Hotel_data();