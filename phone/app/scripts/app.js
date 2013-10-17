'use strict';

var app = {
	initialize: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, true);
	},
	onDeviceReady: function() {
		console.log('REPORT - Device Ready!');
		angular.element(document).ready(function() {
			angular.bootstrap(document);
		});
	},
};

app.initialize();

var phoneApp = angular.module('phoneApp', ["leaflet-directive"]);

phoneApp.config(function($routeProvider, $compileProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainCtrl'
		})
		.when('/map', {
			templateUrl: 'views/map.html',
			controller: 'MapCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
	$compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});

