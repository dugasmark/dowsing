'use strict';


angular.module('dowsing').controller('interface', ['$scope', 'dowsing',
	function($scope, dowsing) {
		$scope.dowsing = dowsing;
		console.log('dowsing',dowsing);


		//$scope.title = "Titre";
		$scope.datas = {};
		$scope.datas.outer = [{"label":"Extérieur 1", "value":60, "color": "#2682c7"}, 
				            {"label":"Extérieur 2", "value":60, "color": "#55a8e6"}, 
				            {"label":"Extérieur 3", "value":60,"color":"#9dcbed"}];

		$scope.datas.inner = [{"label":"Intérieur 1", "value":60, "color": "#2682c7"}, 
				            {"label":"Intérieur 2", "value":60, "color": "#55a8e6"}, 
				            {"label":"Intérieur 3", "value":60,"color":"#9dcbed"}];


		
	}
]);