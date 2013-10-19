'use strict';

angular.module('phoneApp').controller('ReportCtrl', function($scope, $window, $location) {
	$scope.back = function() {
		$window.history.back()
	};
	$scope.detail = function() {
		$location.path('/detail');
	};
});