function ticket_data(){
    this.success={
        code:1,
        msg:"操作成功",
        data:null
    }
}

ticket_data.prototype.getappticketdetail = function(){
    this.success.data = {
        "spotId": "101000093",
        "spotName": "熊伟景区",
        "spotPic": "http://static01.uddtrip.com:8001/group1/M00/00/25/wKgBR1etQaaAS6PZAAzodQCbVVc615.jpg",
        "spotPicCount": 3,
        "spotAverage": 0,
        "spotCommentsNum": 0,
        "spotOpentime": "1",
        "spotAddress": "1",
        "location": {
            "lat": 31.257536,
            "lon": 121.49873
        },
        "introduction": "<p>上海千禧海鸥大酒店坐落于虹桥中心区域是一个闹中有静的城市花园酒店上海千禧海鸥大酒店坐落于虹桥中心区域是一个闹中有静的城市花园酒店上海千禧海鸥大酒店坐落于虹桥中心区域是一个闹中有静的城市花园酒店上海千禧海鸥大酒店坐落于虹桥中心区域是一个闹中有静的城市花园酒店</p>",
        "productList": [
            {
                "productType": "成人票",
                "productId": "401000011",
                "productname": "111",
                "marketprice": 390,
                "startprice": 300,
                "advancedays": 2,
                "advancetime": "10:00:00",
                "isrefundName": "不可退"
            },
            {
                "productType": "残疾票",
                "productId": "401000011",
                "productname": "111",
                "marketprice": 390,
                "startprice": 300,
                "advancedays": 2,
                "advancetime": "10:00:00",
                "isrefundName": "不可退"
            },
            {
                "productType": "老人票",
                "productId": "401000011",
                "productname": "111",
                "marketprice": 390,
                "startprice": 300,
                "advancedays": 2,
                "advancetime": "10:00:00",
                "isrefundName": "不可退"
            },
            {
                "productType": "学生票",
                "productId": "401000011",
                "productname": "111",
                "marketprice": 390,
                "startprice": 300,
                "advancedays": 2,
                "advancetime": "10:00:00",
                "isrefundName": "不可退"
            },
            {
                "productType": "成人票",
                "productId": "401000011",
                "productname": "111",
                "marketprice": 390,
                "startprice": 300,
                "advancedays": 2,
                "advancetime": "10:00:00",
                "isrefundName": "不可退"
            },
            {
                "productType": "儿童票",
                "productId": "401000011",
                "productname": "111",
                "marketprice": 390,
                "startprice": 300,
                "advancedays": 2,
                "advancetime": "10:00:00",
                "isrefundName": "不可退"
            }
        ]
    }
    return this.success;
}

ticket_data.prototype.getpricedatelist = function(){
    this.success.data = {
        
    }
    return this.success;
}

module.exports = new ticket_data();