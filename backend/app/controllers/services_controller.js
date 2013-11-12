var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var ServicesController = new Controller();
var Service = require('../models/Service');

/*
GET		/services 		index
POST	/services 		create
GET		/services/:id 	show
PUT		/services/:id 	update
DELETE 	/services/:id 	destroy
*/

ServicesController.index = function() {
	var self = this;
	Service.find(function(err, services) {
		if (err) {
			self.res.json([]);
		} else {
			for (s in services) {
				services[s].service_code = services[s]._id;
			}
			self.res.json(services);
		}
	});
};

ServicesController.create = function() {
	console.log(this.req.body);
	var service = new Service(this.req.body);
	var self = this;
	service.save(function(err) {
		if (err) {
			self.res.send(400, err);
		} else {
			service.service_code = service._id;
			self.res.json(service);
		}
	});
};

ServicesController.show = function() {
	var self = this;
	Service.findOne({
		_id: this.param("id")
	}, function(err, service) {
		if (err) {
			self.res.send(400, err);
		} else {
			service.attributes = [];
			service.service_code = service._id;
			self.res.json(service)
		}
	});
};

ServicesController.update = function() {
	var self = this;
	var service = this.req.body;
	delete service._id;
	Service.findOneAndUpdate({
		_id: this.param("id")
	}, service, {}, function(err, service) {
		if (err) {
			self.res.send(500, err);
		} else if (service === null) {
			self.res.send(400, "Service not found.");
		} else {
			service.service_code = service._id;
			self.res.json(service);
		}
	});
};

ServicesController.destroy = function() {
	var self = this;
	Service.findOneAndRemove({
		_id: this.param("id")
	}, {}, function(err, service) {
		if (err) {
			self.res.send(400, err);
		} else {
			self.res.json(service);
		}
	});
};

module.exports = ServicesController;