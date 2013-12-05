'use strict';

angular.module('backendApp').controller('MainCtrl', function($scope, $rootScope) {
	angular.extend($scope, {
		defaults: {
			scrollWheelZoom: false,
			maxZoom: 18
		},
		center: {
			lat: 61.4981508,
			lng: 23.7610254,
			zoom: 15
		},
		markers: {},
		possibleStatus: ['open','handled','closed']
	});
	$rootScope.allServices = $rootScope.Service.query(function() {
		$rootScope.issueMarkers = $scope.generateIssueMarkersOutOf($rootScope.allServices);
		$rootScope.allRequests = $rootScope.Request.query(function() {
			$rootScope.requestMarkers = $scope.generateRequestMarkersOutOf($rootScope.allRequests);
			$scope.addRequestMarkers();
		});
	});
	$scope.addRequestMarkers = function() {
		for (var i = $rootScope.requestMarkers.length - 1; i >= 0; i--) {
			$scope.markers[i + "marker"] = {
				lat: $rootScope.requestMarkers[i].lat,
				lng: $rootScope.requestMarkers[i].lng,
				focus: false,
				draggable: false,
				icon: L.icon({
					iconUrl: $rootScope.requestMarkers[i].icon,
					iconSize: [33, 32],
					iconAnchor: [16, 43],
					popupAnchor: [2, -45]
				})
			};
		};
	};
	$scope.generateRequestMarkersOutOf = function(requests) {
		var markers = [];
		for (var r in requests) {
			var newRequest = {};
			newRequest.lat = requests[r].lat;
			newRequest.lng = requests[r].lng;
			newRequest.message = requests[r].description;
			for (var s in $rootScope.allServices) {
				if ($rootScope.allServices[s].service_code == requests[r].service_code) {
					newRequest.icon = 'images/warning_' + $rootScope.allServices[s].group + '.png';
					break;
				}
			}
			markers.push(newRequest);
		}
		return markers;
	};

	$scope.generateIssueMarkersOutOf = function(services) {
		var markers = {};
		var issueMarkers = [];
		for (var i in services) {
			console.log("foo");
			markers[services[i].group] = {
				name: services[i].group,
				icon: 'images/marker_' + services[i].group + '.png',
				descr: services[i].description
			}
		}
		for (var marker in markers) {
			issueMarkers.push(markers[marker]);
		}
		return issueMarkers;
	};
});