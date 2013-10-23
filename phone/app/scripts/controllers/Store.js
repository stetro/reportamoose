'use strict';

angular.module('phoneApp').controller('StoreCtrl', function($scope, $window, $location, $rootScope) {
	$scope.back = function() {
		$window.history.back();
	};
	$scope.report = function() {
		$location.path('/report');
	};
	$scope.delete = function() {
		for (var i = 0; $rootScope.locations.length > i; i++) {
			if ($rootScope.locations[i].checked == true) {
				$rootScope.locations.splice(i, 1);
			}
		}
	};
});