'use strict';

angular.module('phoneApp').controller('AppCtrl', function($scope, $window, $location) {
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
		markers: {}
	});
	$scope.reportChoice = false;
	$scope.report = function() {
		$scope.reportChoice = true;
	};
	$scope.close = function() {
		$scope.reportChoice = false;
	}
	$scope.reportNow = function() {
		$location.path('/report');
	};

	$scope.findCurrentLocation = function() {
		console.log('REPORT - Location Searching ...');
		navigator.geolocation.getCurrentPosition(function(pos) {
			console.log("REPORT - Location Searching - DONE");
			$scope.$apply(function() {
				var crd = pos.coords;
				$scope.markers = {
					yourPosition: {
						lat: crd.latitude,
						lng: crd.longitude,
						focus: true,
						draggable: true
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
	};
	$scope.findCurrentLocation();
});