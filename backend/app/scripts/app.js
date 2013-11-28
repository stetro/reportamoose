'use strict';

angular.module('backendApp', [
	'ngResource'
]).config(function($routeProvider) {
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