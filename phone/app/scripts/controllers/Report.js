'use strict';

angular.module('phoneApp').controller('ReportCtrl', function($scope, $rootScope, $window) {

	angular.extend($scope, {
		defaults: {
			scrollWheelZoom: false,
			maxZoom: 18
		},
		center: {
			lat: $rootScope.position.lat,
			lng: $rootScope.position.lng,
			zoom: 13
		},
		markers: {
			position: $rootScope.position
		}

	});

	$scope.back = function() {
		$window.history.back();
	};
});