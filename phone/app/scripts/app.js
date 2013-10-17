'use strict';

var app = {
	initialize: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, true);
	},
	onDeviceReady: function() {
		console.log("REPORT - Device Ready!");
		angular.element(document).ready(function() {
			angular.bootstrap(document);
		});
	},
};

app.initialize();

angular.module('phoneApp', [])
	.config(function($routeProvider, $compileProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
		$compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
	});