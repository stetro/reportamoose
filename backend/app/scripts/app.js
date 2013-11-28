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