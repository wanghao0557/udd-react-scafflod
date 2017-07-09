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
	this.app.post("/hotel/room", function(req, res){
		 var data = hotel.room(req.body.id);
		 res.contentType('json');
		 res.send('data');
	});
}