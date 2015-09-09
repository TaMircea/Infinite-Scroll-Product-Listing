(function() {
    'use strict';
angular
	.module('app')
	.directive('myGalleryDirective', galleryDirective);


	function galleryDirective(){

		var directive = {
			restrict: 'E',
			templateUrl: 'app/gallery/gallery.tmpl.html',

		};
		return directive;
	};

})();