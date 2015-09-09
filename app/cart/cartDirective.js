(function() {
    'use strict';
angular
	.module('app')
	.directive('myCartDirective', cartDirective);


	function cartDirective(){
		
		var directive = {
			restrict: 'E',
			templateUrl: 'app/cart/cart.tmpl.html',

		};

		return directive;
	};
	
})();