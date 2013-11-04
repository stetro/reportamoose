'use strict';

angular.module('phoneApp').controller('AppCtrl', function($scope, $window, $location, cordovaReady) {
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
		menuOpen: false,
		markers: {},
		thanksMessage: false,
		issueMarkers: [{
			name: 'animal-issue',
			descr: 'Ded or alive moose',
			icon: '/images/marker.png'
		}, {
			name: 'road-issue',
			descr: 'Problems with the road',
			icon: '/images/marker.png'
		}, {
			name: 'winter-issue',
			descr: 'Winter care ...',
			icon: '/images/marker2.png'
		}, {
			name: 'winter-issue',
			descr: 'Winter care ...',
			icon: '/images/marker2.png'
		}, {
			name: 'winter-issue',
			descr: 'Winter care ...',
			icon: '/images/marker2.png'
		}]
	});

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
		$scope.markers.position.name = marker.name;
		$scope.markers.position.icon = L.icon({
			iconUrl: marker.icon,
			iconSize: [25, 41]
		});
		$scope.markers.position.message = marker.descr;
	};

	$scope.reportNow = function() {
		$location.path('/report');
	};
	$scope.settings = function() {
		$location.path('/settings');
	};
});