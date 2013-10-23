'use strict';

angular.module('phoneApp').controller('AppCtrl', function($scope, $window, $location, $rootScope, cordovaReady) {
	/*LEAFLET MAP SETTINGS*/
	angular.extend($scope, {
		defaults: {
			scrollWheelZoom: false,
			maxZoom: 18
		},
		center: {
			lat: 61.4981508,
			lng: 23.7610254,
			zoom: 13
		},
		markers: {},
		reportChoice: false
	});

	$scope.$on('leafletDirectiveMap.click', function(e) {
		console.log(e);
	});

	$scope.call = function() {
		window.location.href = 'tel:0404458889';
	};

	$scope.later = function() {
		var now = new Date();
		$rootScope.locations.push({
			name: now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear(),
			time: now.toUTCString(),
			checked: false
		});
		$scope.reportChoice = false;
	};

	$scope.findCurrentLocation = cordovaReady(function() {
		console.log('REPORT - Location Searching ...');
		navigator.geolocation.getCurrentPosition(function(pos) {
			console.log("REPORT - Location Searching - DONE");
			$scope.$apply(function() {
				var crd = pos.coords;
				$scope.markers = {
					position: {
						lat: crd.latitude,
						lng: crd.longitude,
						focus: true,
						draggable: true,
						message: "<strong><i class=\"icon-warning-sign\"></i> Report Position</strong><br/>(drag it to the right position)"
					}
				};
				$scope.center = {
					lat: crd.latitude,
					lng: crd.longitude,
					zoom: 15
				};
			});

		}, function(err) {
			console.log("REPORT - ERROR FINDING LOCATION");
		});
	});

	$scope.findCurrentLocation();

	$scope.report = function() {
		$scope.reportChoice = true;
	};
	$scope.close = function() {
		$scope.reportChoice = false;
	};
	$scope.reportNow = function() {
		$location.path('/report');
	};
	$scope.settings = function() {
		$location.path('/settings');
	};
	$scope.store = function() {
		$location.path('/store');
	};

});