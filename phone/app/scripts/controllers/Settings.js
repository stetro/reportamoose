'use strict';

angular.module('phoneApp').controller('SettingsCtrl', function($scope, $window, $rootScope, $location) {
	$scope.back = function() {
		$rootScope.keepPosition = true;
		$window.history.back();
	};
	$scope.save = function() {
		$rootScope.keepPosition = true;
		$window.history.back();
	};
});