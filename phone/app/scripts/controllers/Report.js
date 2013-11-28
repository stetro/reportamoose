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

	var generateListOfSameGroup = function() {
		var list = [];
		for (var i in $rootScope.allServices) {
			if ($rootScope.allServices[i].group == $rootScope.position.name) {
				list.push($rootScope.allServices[i]);
			}
		}
		return list;
	};

	$scope.serviceListOfSameGroup = generateListOfSameGroup();


	$scope.back = function() {
		$rootScope.showThankMessage = false;
		$rootScope.keepPosition = true;
		$window.history.back();
	};
	$scope.callback = function() {
		console.log('Fooo');
	};
	$scope.send = function() {

		var request = new $rootScope.Request({
			"service_code": $scope.selectedService.service_code,
			"description": $scope.requestDescription,
			"lat": $rootScope.position.lat,
			"lng": $rootScope.position.lng,
			"media_url": "http://www.op-marburg.de/var/storage/images/op/lokales/wirtschaft/wirtschaft-lokal/schlagloecher-ziehen-vor-allem-stossdaempfer-in-mitleidenschaft/10969177-1-ger-DE/Schlagloecher-ziehen-vor-allem-Stossdaempfer-in-Mitleidenschaft_ArtikelQuer.jpg"
		});
		request.$save();
		$rootScope.showThankMessage = true;
		// $rootScope.position.icon = 'images/elk.png';
		// $rootScope.position.message = "";
		// $rootScope.position.focus = false;
		// $rootScope.tempmarkers.push($rootScope.position);
		$location.path('/');
	}
});