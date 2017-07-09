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
	var that = this;
	var item ='hotel';
	var mid = require('./middleware');
	this.app.post("/", function(req, res) {
		var obj = {
			hotelId: req.body.id,
			userId: req.body.userId
		};
		var middleware = new mid();
		middleware.callH = function(data) {
			res.contentType('json');
			res.send(data);
		};
		middleware.post(obj, item, '/', middleware.callH);
	});
}