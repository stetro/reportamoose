'use strict';

var app = {
	initialize: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, true);
		document.addEventListener("touchstart", touchHandler, true);
		document.addEventListener("touchmove", touchHandler, true);
		document.addEventListener("touchend", touchHandler, true);
		document.addEventListener("touchcancel", touchHandler, true);
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

var phoneApp = angular.module('phoneApp', ["leaflet-directive", "ngDragDrop", "ngResource", "ngCookies", "angularLocalStorage"]);

phoneApp.run(function($rootScope, $resource, $http, storage) {
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

	$rootScope.locations = [];
	$rootScope.report = {};
	$rootScope.showThankMessage = false;
	$rootScope.showDraftMessage = false;
	$rootScope.keepPosition = false;
	$rootScope.settings = {
		name: "",
		mail: "",
		city: ""
	};
	$rootScope.requestMarkers = [];
	$rootScope.issueMarkers = [];
	storage.bind($rootScope, 'draft', {});
});

phoneApp.filter('timestampToTime', function() {
	return function(timestamp) {
		if (timestamp === undefined) return;
		var string = timestamp.substr(0, timestamp.length - 5) + 'Z';
		var time = Date.parse(string);
		return time.toString("dd.MM.yyyy HH:mm");
	};
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

function touchHandler(event) {
	var touch = event.changedTouches[0];

	var simulatedEvent = document.createEvent("MouseEvent");
	simulatedEvent.initMouseEvent({
			touchstart: "mousedown",
			touchmove: "mousemove",
			touchend: "mouseup"
		}[event.type], true, true, window, 1,
		touch.screenX, touch.screenY,
		touch.clientX, touch.clientY, false,
		false, false, false, 0, null);

	touch.target.dispatchEvent(simulatedEvent);
	event.preventDefault();
}

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