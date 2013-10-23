'use strict';

angular.module('phoneApp').controller('SettingsCtrl', function($scope, $window, $rootScope) {
	$scope.back = function() {
		$window.history.back();
	};
});