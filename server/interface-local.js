function Interface() {
	this.app = null;
}

Interface.prototype.init = function(app) {
	this.app = app;
	var bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: false
	}));

	this.hotel();
}
Interface.prototype.hotel = function() {
	var hotel = require('./data/hotel');
	console.log(hotel);
	this.app.post("/hotel/detail", function(req, res){
		console.log(req.body)
		var data = hotel.detail(req.body.id);
		res.contentType('json');
		res.send(data);
	});
}

module.exports = new Interface();