'use strict';

angular.module('backendApp').controller('MainCtrl', function($scope, $rootScope, $modal, leafletData) {
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
		events: {
			map: {
				enable: ['moveend']
			},
			marker: {
				enable: ['click', 'dragend'],
				logic: 'emit'
			}
		},
		markers: {},
		possibleStatus: ['open', 'in process', 'closed'],
		selectedGroup: false,
		selectedSubgroup: false,
		selectedStatus: false,
		selectedRequest: false
	});

	$scope.setSelectedGroup = function(group) {
		$scope.selectedGroup = group;
		$scope.selectedSubgroup = false;
		$scope.refreshMarkers();
	};
	$scope.setSelectedSubgroup = function(group) {
		$scope.selectedSubgroup = group;
		$scope.refreshMarkers();
	};
	$scope.setSelectedStatus = function(status) {
		$scope.selectedStatus = status;
		$scope.refreshMarkers();
	};
	$scope.refreshMarkers = function() {
		$rootScope.requestMarkers = $scope.generateRequestMarkersOutOf($rootScope.allRequests);
		$scope.addRequestMarkers();
	};
	$scope.selectRequest = function(request) {
		$scope.selectedRequest = request;
		$scope.focusRequest(request);
		$scope.open(request);
	};
	$scope.focusRequest = function(request) {
		$scope.center = {
			lat: parseFloat(request.lat),
			lng: parseFloat(request.lng) + 0.003,
			zoom: 17
		};
	};
	$scope.filterByGroups = function(request) {
		var statusFilter = request.status == $scope.selectedStatus || $scope.selectedStatus == false;
		if ($scope.selectedGroup) {
			if ($scope.selectedSubgroup) {
				return request.service.service_name == $scope.selectedSubgroup && statusFilter;
			}
			return request.service.group == $scope.selectedGroup && statusFilter;
		}
		return statusFilter;
	};

	$rootScope.allServices = $rootScope.Service.query(function() {
		$scope.$on('leafletDirectiveMap.moveend', function(e, args) {
			leafletData.getMap().then(function(map) {
				if (map._zoom <= 15) {
					var bounds = map.getBounds();
					$scope.loadRequests(bounds.getNorthWest().lat, bounds.getNorthWest().lng, bounds.getSouthEast().lat, bounds.getSouthEast().lng);
				}
			});
		});
		$scope.groups = $scope.generateGroupsOutOf($rootScope.allServices);
	});

	$scope.loadRequests = function(start_lat, start_lng, end_lat, end_lng) {
		$rootScope.allRequests = $rootScope.Request.query({
			start_lat: start_lat,
			start_lng: start_lng,
			end_lat: end_lat,
			end_lng: end_lng
		}, function() {
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
	};

	$scope.$on('leafletDirectiveMarker.click', function(e, args) {
		for (var r in $rootScope.allRequests) {
			if ($rootScope.allRequests[r].service_request_id == $scope.markers[args.markerName].id) {
				$scope.selectRequest($rootScope.allRequests[r]);
				break;
			}
		}
	});

	$scope.addRequestMarkers = function() {
		var newMarkers = {};
		for (var i = $rootScope.requestMarkers.length - 1; i >= 0; i--) {
			newMarkers[i + "marker"] = {
				id: $rootScope.requestMarkers[i].id,
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
		$scope.markers = newMarkers;
	};

	$scope.generateRequestMarkersOutOf = function(requests) {
		var markers = [];
		for (var r in requests) {
			if ($scope.filterByGroups(requests[r])) {
				var newRequest = {};
				newRequest.id = requests[r].service_request_id;
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


	$scope.open = function(request) {
		var modalInstance = $modal.open({
			templateUrl: 'template/modal/modal.html',
			controller: ModalInstanceCtrl,
			resolve: {
				request: function() {
					return request;
				},
				possibleStatus: function() {
					return $scope.possibleStatus;
				}
			}
		});

		modalInstance.result.then(function(selectedItem) {
			$scope.selected = selectedItem;
		});
	};
});

var ModalInstanceCtrl = function($scope, $modalInstance, request, possibleStatus) {

	$scope.request = request;
	$scope.possibleStatus = possibleStatus;
	$scope.ok = function() {
		$modalInstance.close($scope.selected.item);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
};