function HotelData() {
	this.success = {
		code: 1,
		msg: '操作成功',
		data: null
	}
}

HotelData.prototype.detail = function() {
	this.success.data = {
		id: 123,
		name: '豪华大酒店'
	}
	return this.success;
}

module.exports = new HotelData();