(function() {
    'use strict';
angular
	.module('app')
	.directive('whenScrolled', whenScrolled);

		function whenScrolled() {
		    return function(scope, elm, attr) {
		        var raw = elm[0];
		        elm.bind('scroll', function() {
		            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
		                scope.$apply(attr.whenScrolled);
		            }
		        });
		    };
		};
})();