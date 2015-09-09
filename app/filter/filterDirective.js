(function() {
    'use strict';
angular
	.module('app')
	.directive('myFilterDirective', filterDirective);


	function filterDirective(){

		var directive = {
			restrict: 'E',
			templateUrl: 'app/filter/filter.tmpl.html',

		};
		return directive;
	};
	
})();