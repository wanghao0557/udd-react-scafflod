function Apk() {
	this.hotel = {
		key: 'key',
		token: 'token',
		secret: 'secret'
	};
	this.timestamp = Math.floor(new Date().getTime() / 1000);
}

Apk.prototype.itemapk = null;
Apk.prototype.get_itemapk = function(itemname) {
	this.itemapk = this[itemname];
	return this.itemapk;
}
Apk.prototype.get_itemsign = function(itemname, param) {
	this.get_itemapk(itemname);
	var arr = [this.itemapk.key, param, this.timestamp, this.itemapk.secret];
	return this.getMD5(arr.join('#'));
}
Apk.prototype.getMD5 = function(str) {
	var crypto = require('crypto');
	return crypto.createHash('md5').update(str, 'utf8').digest('hex');
}
module.exports = Apk;