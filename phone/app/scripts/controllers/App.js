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
			zoom: 13
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

	$rootScope.issueMarkers = [{
		name: 'animal-issue',
		descr: 'Ded or alive moose',
		icon: '/images/marker_moose.png',
		subcat: ['Moose', 'Rabbit', 'Zombie', 'Human']
	}, {
		name: 'road-issue',
		descr: 'Problems with the road',
		icon: '/images/marker_road.png',
		subcat: ['Asphalt', 'Pothile']
	}, {
		name: 'winter-issue',
		descr: 'Winter care ...',
		icon: '/images/marker_snow.png',
		subcat: ['Snow', 'Ice', 'Snowman', 'Snowboarder']
	}, {
		name: 'tash-issue',
		descr: 'Trash somwhere',
		icon: '/images/marker_trash.png',
		subcat: ['Cans', 'Leafs', 'Dirt', '...']
	}, {
		name: 'light-issue',
		descr: 'Not working light',
		icon: '/images/marker_light.png',
		subcat: ['Trafficlight', 'Streetlight', '...']
	}];

	$scope.findCurrentLocation = (function() {
		console.log('REPORT - Location Searching ...');
		navigator.geolocation.getCurrentPosition(function(pos) {
			console.log("REPORT - Location Searching - DONE");
			$scope.$apply(function() {
				var crd = pos.coords;
				$scope.markers = {
					position: {
						lat: crd.latitude,
						lng: crd.longitude,
						focus: true,
						draggable: true
					}
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
});