'use strict';

angular.module('phoneApp').controller('ReportCtrl', function($scope, $rootScope, $window, $location) {

	angular.extend($scope, {
		defaults: {
			zoomControl: false,
			dragging: false,
			touchZoom: false,
			tap: false,
			trackResize: false,
			keyboard: false
		},
		center: {
			lat: $rootScope.position.lat,
			lng: $rootScope.position.lng,
			zoom: 15
		},
		markers: {
			position: $rootScope.position
		}
	});
	$scope.markers.position.draggable = false;
	$scope.markers.position.focus = false;
	$scope.showPhotoInfo = false;
	$scope.showThankMessage = false;

	$scope.back = function() {
		$window.history.back();
	};
	$scope.callback = function() {
		console.log('Fooo');
	};
	$scope.send = function() {
		$rootScope.showThankMessage = true;
		$rootScope.position.icon = 'images/elk.png';
		$rootScope.position.message = "";
		$rootScope.position.focus = false;
		$rootScope.tempmarkers.push($rootScope.position);
		$location.path('/');
	}
});