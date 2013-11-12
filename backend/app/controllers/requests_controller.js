var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var RequestsController = new Controller();
var Request = require('../models/Request');

/*
GET		/requests 		index
POST	/requests 		create
GET		/requests/:id 	show
PUT		/requests/:id 	update
DELETE 	/requests/:id 	destroy
*/

RequestsController.index = function() {
	var self = this;
	Request.find(function(err, requests) {
		if (err) {
			self.res.json([]);
		} else {
			for (s in requests) {
				requests[s].request_code = requests[s]._id;
			}
			self.res.json(requests);
		}
	});
};

RequestsController.create = function() {
	console.log(this.req.body);
	var request = new Request(this.req.body);
	var self = this;
	request.save(function(err) {
		if (err) {
			self.res.send(400, err);
		} else {
			request.request_code = request._id;
			self.res.json([{
				"service_request_id": request._id,
				"service_notice": "The City will inspect and require the responsible party to correct within 24 hours and/or issue a Correction Notice or Notice of Violation of the Public Works Code",
				"account_id": null
			}]);
		}
	});
};

RequestsController.show = function() {
	var self = this;
	Request.findOne({
		_id: this.param("id")
	}, function(err, request) {
		if (err) {
			self.res.send(400, err);
		} else {
			request.attributes = [];
			request.request_code = request._id;
			self.res.json(request)
		}
	});
};

RequestsController.update = function() {
	var self = this;
	var request = this.req.body;
	delete request._id;
	Request.findOneAndUpdate({
		_id: this.param("id")
	}, request, {}, function(err, request) {
		if (err) {
			self.res.send(500, err);
		} else if (request === null) {
			self.res.send(400, "Request not found.");
		} else {
			request.request_code = request._id;
			self.res.json(request);
		}
	});
};

RequestsController.destroy = function() {
	var self = this;
	Request.findOneAndRemove({
		_id: this.param("id")
	}, {}, function(err, request) {
		if (err) {
			self.res.send(400, err);
		} else {
			self.res.json(request);
		}
	});
};

module.exports = RequestsController;