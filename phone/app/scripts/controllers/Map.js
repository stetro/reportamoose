'use strict';

angular.module('phoneApp').controller('MapCtrl', function($scope,$window) {
	$scope.center = {
		lat: 61.4981508,
		lng: 23.7610254,
		zoom: 13
	};
	angular.extend($scope, {
		defaults: {
			scrollWheelZoom: false
		}
	});
	$scope.back = function() {
		$window.history.back();
	};
});