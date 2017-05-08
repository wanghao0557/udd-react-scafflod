function Apk(){
	this.hotel={
		"key":"9894b98f-fbed-4ee7-8520-6311d024fa4e",
    	"token":"",
    	"secret":"d44792e2110b47aabfa59568b86614b5"
	};
	this.api={
		"key":"9894b98f-fbed-4ee7-8520-6311d024fa4e",
    	"token":"",
    	"secret":"d44792e2110b47aabfa59568b86614b5"
	};
	this.ticket={
		"key":"02a3499b-5a67-4027-ab8f-a5a9201ee388",
    	"token":"",
    	"secret":"3e3e36d107ab45869f30b53b6c569801"
	};
	this.localplay={
		"key":"9894b98f-fbed-4ee7-8520-6311d024fa4e",
    	"token":"",
    	"secret":"d44792e2110b47aabfa59568b86614b5"
	};
	this.guide={
		"key":"9894b98f-fbed-4ee7-8520-6311d024fa4e",
    	"token":"",
    	"secret":"d44792e2110b47aabfa59568b86614b5"
	};
	this.member={
		"key":"9894b98f-fbed-4ee7-8520-6311d024fa4e",
    	"token":"",
    	"secret":"d44792e2110b47aabfa59568b86614b5"
	};
	this.plane={
		"key":"47a5bbfd-a887-4bfb-b4fd-f02588445890",
    	"token":"",
    	"secret":"241ccd35b8974d30a72a6bed6847006a"
	};
	this.train={
		"key":"c06b041d-c140-4f52-8256-2ee9b1fa2395",
    	"token":"",
    	"secret":"ee265100479a44579a2a2507db5404a3"
	};
	this.corporatetravel={
		"key":"605621ab-b182-4673-8b43-fd3ddfa98871",
    	"token":"",
    	"secret":"fc87f3913d2646178a8b6a7a013c8401"
	};
	this.timestamp=Math.floor(new Date().getTime()/1000);
}
Apk.prototype.itemapk=null;
Apk.prototype.get_itemapk=function(itemname){
	this.itemapk=this[itemname];
    return this.itemapk;
}
Apk.prototype.get_itemsign=function(itemname,param){
    this.get_itemapk(itemname);
    var arr = [this.itemapk.key, param, this.timestamp, this.itemapk.secret];
    console.log('time');
    console.log(arr);
	return this.getMD5(arr.join('#'));
} 
Apk.prototype.getMD5=function(str){
    var crypto = require('crypto');
	return crypto.createHash('md5').update(str, 'utf8').digest('hex');
}
module.exports=Apk;
