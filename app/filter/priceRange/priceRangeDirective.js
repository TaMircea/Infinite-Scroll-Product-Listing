(function() {
    'use strict';
angular
	.module('app')
	.directive('myPriceRangeDirective', myPriceRangeDirective);


	function myPriceRangeDirective(){

		var directive = {
			restrict: 'E',
			templateUrl: 'app/filter/priceRange/priceRange.tmpl.html',

		};
		return directive;
	};
	
})();