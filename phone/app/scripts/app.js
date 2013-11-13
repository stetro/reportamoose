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
		document.addEventListener('offline', this.offline, true);
		angular.element(document).ready(function() {
			angular.bootstrap(document);
		});
	},
	offline: function() {
		alert("You need to be online in order to use this application!")
	}
};

app.initialize();

var phoneApp = angular.module('phoneApp', ["leaflet-directive", "ngDragDrop"]);

phoneApp.run(function($rootScope) {
	$rootScope.locations = [];
	$rootScope.report = {};
	$rootScope.showThankMessage = false;
	$rootScope.settings = {
		name: "",
		mail: "",
		city: ""
	};
	$rootScope.tempmarkers = [{
		lat: 61.497414,
		lng: 23.771583,
		icon: 'images/warning.png'
	}, {
		lat: 61.497618,
		lng: 23.751498,
		icon: 'images/warning.png'
	}, {
		lat: 61.502410,
		lng: 23.742572,
		icon: 'images/warning.png'
	}, {
		lat: 61.505645,
		lng: 23.770038,
		icon: 'images/warning.png'
	}];
	$rootScope.issueMarkers = [{
		name: 'animal-issue',
		descr: 'Dead or alive moose',
		icon: '/images/marker_moose.png',
		subcat: ['Moose', 'Rabbit', 'Zombie', 'Human']
	}, {
		name: 'road-issue',
		descr: 'Problems with the road',
		icon: '/images/marker_road.png',
		subcat: ['Asphalt', 'Pothole']
	}, {
		name: 'winter-issue',
		descr: 'Winter care ...',
		icon: '/images/marker_snow.png',
		subcat: ['Snow', 'Ice', 'Snowman', 'Snowboarder']
	}, {
		name: 'tash-issue',
		descr: 'Trash somwhere',
		icon: '/images/marker_trash.png',
		subcat: ['Cans', 'Leafs', 'Dirt', '...']
	}, {
		name: 'light-issue',
		descr: 'Not working light',
		icon: '/images/marker_light.png',
		subcat: ['Trafficlight', 'Streetlight', '...']
	}];
});

phoneApp.config(function($routeProvider, $compileProvider) {
	$routeProvider
		.when('/app', {
			templateUrl: 'views/main.html',
			controller: 'MainCtrl'
		})
		.when('/map', {
			templateUrl: 'views/map.html',
			controller: 'MapCtrl'
		})
		.when('/position', {
			templateUrl: 'views/position.html',
			controller: 'PositionCtrl'
		})
		.when('/picture', {
			templateUrl: 'views/picture.html',
			controller: 'PictureCtrl'
		})
		.when('/', {
			templateUrl: 'views/app.html',
			controller: 'AppCtrl'
		})
		.when('/report', {
			templateUrl: 'views/report.html',
			controller: 'ReportCtrl'
		})
		.when('/detail', {
			templateUrl: 'views/detail.html',
			controller: 'DetailCtrl'
		})
		.when('/settings', {
			templateUrl: 'views/settings.html',
			controller: 'SettingsCtrl'
		})
		.when('/store', {
			templateUrl: 'views/store.html',
			controller: 'StoreCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
	$compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});

phoneApp.factory('cordovaReady', function() {
	return function(fn) {
		var queue = [];
		var impl = function() {
			queue.push(Array.prototype.slice.call(arguments));
		};
		document.addEventListener('deviceready', function() {
			queue.forEach(function(args) {
				fn.apply(this, args);
			});
			impl = fn;
		}, false);
		return function() {
			return impl.apply(this, arguments);
		};
	};
});