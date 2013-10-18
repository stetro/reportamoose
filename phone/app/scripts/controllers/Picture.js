'use strict';

angular.module('phoneApp').controller('PictureCtrl', function($scope, $window) {
	var pictureOptions = {
		quality: 75,
		destinationType: Camera.DestinationType.DATA_URL,
		sourceType: Camera.PictureSourceType.CAMERA,
		encodingType: Camera.EncodingType.JPEG,
		targetWidth: 300,
		targetHeight: 300
	};

	var base64header = 'data:image/jpeg;base64,';

	$scope.picture = '/icon.png';

	$scope.takePicture = function() {
		console.log('REPORT - Capturing Image from Camera ...');
		navigator.camera.getPicture(function(img) {
			$scope.$apply(function() {
				console.log('REPORT - Capturing Image from Camera - DONE');
				$scope.picture = base64header + img;
			});
		}, function(err) {
			$scope.$apply(function() {
				console.log('REPORT - Capturing Image from Camera - ERROR 	' + err);
			});
		}, pictureOptions);
	};
	$scope.back = function() {
		$window.history.back();
	};
});