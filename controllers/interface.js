'use strict';


angular.module('dowsing').controller('interface', ['$scope', 'dowsing',
	function($scope, dowsing) {
		$scope.dowsing = dowsing;
		console.log('dowsing',dowsing);
	}
]);