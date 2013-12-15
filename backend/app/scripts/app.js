'use strict';

var backendApp = angular.module('backendApp', ['leaflet-directive', 'ngResource']);
backendApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainCtrl'
		})
		.when('/services', {
			templateUrl: 'views/services.html',
			controller: 'ServicesCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});

backendApp.run(function($rootScope, $resource, $http) {
	$rootScope.Service = $resource('/services/:id', {
		id: "@service_code"
	}, {
		update: {
			method: 'PUT'
		}
	});
	$rootScope.Request = $resource('/requests/:id', {
		id: "@service_request_id"
	}, {
		update: {
			method: 'PUT'
		}
	});

});

backendApp.filter('timestampToDate', function() {
	return function(timestamp) {
		if (timestamp === undefined) return;
		return convertDate(timestamp).toString("dd.MM.yyyy");
	};
});

backendApp.filter('timestampToTime', function() {
	return function(timestamp) {
		if (timestamp === undefined) return;
		return convertDate(timestamp).toString("HH:mm");
	};
});

function convertDate(timestamp) {
	var string = timestamp.substr(0, timestamp.length - 5) + 'Z';
	var time = Date.parse(string);
	return time;
}