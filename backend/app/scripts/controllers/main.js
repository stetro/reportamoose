'use strict';

angular.module('backendApp').controller('MainCtrl', function($scope, $rootScope) {
	angular.extend($scope, {
		defaults: {
			scrollWheelZoom: true,
			maxZoom: 18,
			tileLayer: "http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg"

		},
		center: {
			lat: 61.4981508,
			lng: 23.7610254,
			zoom: 15
		},
		markers: {},
		possibleStatus: ['open', 'in process', 'closed'],
		selectedGroup: false,
		selectedSubgroup: false,
		selectedRequest: false
	});

	$scope.setSelectedGroup = function(group) {
		$scope.selectedGroup = group;
		$scope.selectedSubgroup = false;
		$rootScope.requestMarkers = $scope.generateRequestMarkersOutOf($rootScope.allRequests);
		$scope.addRequestMarkers();
	};
	$scope.setSelectedSubgroup = function(group) {
		$scope.selectedSubgroup = group;
		$rootScope.requestMarkers = $scope.generateRequestMarkersOutOf($rootScope.allRequests);
		$scope.addRequestMarkers();
	};
	$scope.selectRequest = function(request) {
		$scope.selectedRequest = request;
		$scope.center = {
			lat: parseFloat(request.lat),
			lng: parseFloat(request.lng) + 0.003,
			zoom: 17
		};
	};
	$scope.filterByGroups = function(request) {
		if ($scope.selectedGroup) {
			if ($scope.selectedSubgroup) {
				return request.service.service_name == $scope.selectedSubgroup;
			}
			return request.service.group == $scope.selectedGroup;
		}
		return true;
	};

	$rootScope.allServices = $rootScope.Service.query(function() {
		$rootScope.allRequests = $rootScope.Request.query(function() {
			for (var request in $rootScope.allRequests) {
				for (var service in $rootScope.allServices) {
					if ($rootScope.allServices[service].service_code == $rootScope.allRequests[request].service_code) {
						$rootScope.allRequests[request].service = $rootScope.allServices[service];
					}
				}
			}
			$rootScope.requestMarkers = $scope.generateRequestMarkersOutOf($rootScope.allRequests);
			$scope.addRequestMarkers();
		});
		$scope.groups = $scope.generateGroupsOutOf($rootScope.allServices);
	});

	$scope.addRequestMarkers = function() {
		$scope.markers = [];
		for (var i = $rootScope.requestMarkers.length - 1; i >= 0; i--) {
			$scope.markers[i + "marker"] = {
				lat: $rootScope.requestMarkers[i].lat,
				lng: $rootScope.requestMarkers[i].lng,
				focus: false,
				draggable: false,
				icon: L.icon({
					iconUrl: $rootScope.requestMarkers[i].icon,
					iconSize: [33, 32],
					iconAnchor: [15, 15],
					popupAnchor: [2, -45]
				})
			};
		};
	};

	$scope.generateRequestMarkersOutOf = function(requests) {
		var markers = [];
		for (var r in requests) {
			if ($scope.filterByGroups(requests[r])) {
				console.log('asd')
				var newRequest = {};
				newRequest.lat = parseFloat(requests[r].lat);
				newRequest.lng = parseFloat(requests[r].lng);
				newRequest.message = requests[r].description;
				for (var s in $rootScope.allServices) {
					if ($rootScope.allServices[s].service_code == requests[r].service_code) {
						newRequest.icon = 'images/svgs/' + $rootScope.allServices[s].group + '_report.svg';
						break;
					}
				}
				markers.push(newRequest);
			}
		}
		return markers;
	};
	$scope.generateGroupsOutOf = function(services) {
		var groups = {};
		for (var i in services) {
			groups[services[i].group] = services[i].group;
		}
		return Object.keys(groups);
	};
});