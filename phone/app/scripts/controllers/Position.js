'use strict';

angular.module('phoneApp').controller('PositionCtrl', function($scope, $window) {
	$scope.center = {
		lat: 61.4981508,
		lng: 23.7610254,
		zoom: 13
	};

	angular.extend($scope, {
		defaults: {
			scrollWheelZoom: false
		},
		markers: {}
	});

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
						message: "New Reporting Position",
						focus: true,
						draggable: true
					}
				};
				$scope.center.lat = crd.latitude;
				$scope.center.lng = crd.longitude;
			});

		}, function(err) {
			console.log("REPORT - ERROR FINDING LOCATION");
		});
	};
	$scope.back = function() {
		$window.history.back();
	};
});