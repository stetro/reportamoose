'use strict';

angular.module('phoneApp')
	.controller('PictureCtrl', function($scope) {
		var pictureOptions = {
			quality: 20
		};
		
		var base64header = 'data:image/jpeg;base64,';
		
		$scope.picture = '';

		$scope.takePicture = function() {
			console.log('REPORT - Capturing Image from Camera ...');
			navigator.camera.getPicture(function(img) {
				console.log('REPORT - Capturing Image from Camera - DONE');
				$scope.picture = base64header + img;
			}, function(err) {
				console.log('REPORT - Capturing Image from Camera - ERROR 	' + err);
			}, pictureOptions);
		};
	});