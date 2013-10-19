'use strict';

angular.module('phoneApp').controller('ReportCtrl', function($scope,$window) {
	$scope.back = function() {
		$window.history.back()
	};
});