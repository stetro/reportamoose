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

	$scope.markers.position.icon = L.icon({
		iconUrl: $scope.markers.position.iconUrl,
		iconSize: [35, 50],
		iconAnchor: [16, 43],
		popupAnchor: [2, -45]
	});

	$scope.requestDescription = $rootScope.position.requestDescription;

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
	$scope.save = function() {
		$rootScope.draft = $rootScope.position;
		$rootScope.position.requestDescription = $scope.requestDescription;
		$location.path('/');
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

		if ($rootScope.draft.lat == $rootScope.position.lat && $rootScope.draft.lng == $rootScope.position.lng) {
			$rootScope.draft = '';
		}
		$rootScope.showThankMessage = true;
		$location.path('/');
	}
});