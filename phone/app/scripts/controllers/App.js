'use strict';

angular.module('phoneApp').controller('AppCtrl', function($scope, $http, $rootScope, $window, $location, cordovaReady) {
	/*LEAFLET MAP SETTINGS*/
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
		events: {
			map: {
				enable: ['click'],
				logic: 'emit'
			}
		},
		menuOpen: false,
		markers: {},
		thanksMessage: false,
		showReportButton: false
	});

	console.log($rootScope.showThankMessage+" THANKS");

	$scope.findCurrentLocation = (function() {
		console.log('REPORT - Location Searching ...');
		navigator.geolocation.getCurrentPosition(function(pos) {
			console.log("REPORT - Location Searching - DONE");
			$scope.$apply(function() {
				var crd = pos.coords;
				$scope.markers.position = {
					lat: crd.latitude,
					lng: crd.longitude,
					focus: true,
					draggable: true
				};

				$scope.center = {
					lat: crd.latitude,
					lng: crd.longitude,
					zoom: 15
				};
			});

		}, function(err) {
			console.log("REPORT - ERROR FINDING LOCATION");
		});
	});

	$scope.findCurrentLocation();

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

	$rootScope.allServices = $rootScope.Service.query(function() {
		$rootScope.issueMarkers = $scope.generateIssueMarkersOutOf($rootScope.allServices);
		$rootScope.allRequests = $rootScope.Request.query(function() {
			$rootScope.requestMarkers = $scope.generateRequestMarkersOutOf($rootScope.allRequests);
			$scope.addRequestMarkers();
		});
	});

	$scope.toggleMenu = function() {
		$scope.menuOpen = !$scope.menuOpen;
	};

	$scope.setIssue = function(marker) {
		$scope.showReportButton = true;
		$scope.markers.position.name = marker.name;
		$scope.markers.position.icon = L.icon({
			iconUrl: marker.icon,
			iconSize: [35, 50],
			iconAnchor: [16, 43],
			popupAnchor: [2, -45]
		});
		$scope.markers.position.iconUrl = marker.icon;
		$scope.markers.position.message = marker.descr;
		$scope.markers.position.subcat = marker.subcat;
	};

	$scope.$on('leafletDirectiveMap.click', function(e, args) {
		$scope.markers.position.lat = args.leafletEvent.latlng.lat;
		$scope.markers.position.lng = args.leafletEvent.latlng.lng;
		$scope.center.lat = args.leafletEvent.latlng.lat;
		$scope.center.lng = args.leafletEvent.latlng.lng;
		$scope.center.zoom = 15;
	});

	$scope.lookUp = function(address) {
		delete $http.defaults.headers.common['X-Requested-With'];
		$http.get('http://maps.google.com/maps/api/geocode/json?sensor=false&address=' + address).success(function(data) {
			if (data.results.length > 0) {
				$scope.address = '';
				$scope.menuOpen = false;
				$scope.markers.position.lat = data.results[0].geometry.location.lat;
				$scope.markers.position.lng = data.results[0].geometry.location.lng;
				$scope.center = {
					lat: data.results[0].geometry.location.lat,
					lng: data.results[0].geometry.location.lng,
					zoom: 15
				}
			}
		});
	};

	$scope.reportNow = function() {
		$rootScope.position = $scope.markers.position;
		$location.path('/report');
	};
	$scope.settings = function() {
		$location.path('/settings');
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
				icon: '/images/marker_' + services[i].group + '.png',
				descr: services[i].description
			}
		}
		for (var marker in markers) {
			issueMarkers.push(markers[marker]);
		}
		return issueMarkers;
	}
});