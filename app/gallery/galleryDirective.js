(function() {
    'use strict';
angular
	.module('app')
	.directive('myGalleryDirective', galleryDirective);


	function galleryDirective(){

		var directive = {
			restrict: 'E',
			templateUrl: 'app/gallery/gallery.tmpl.html',
			controller: galleryCtrl,
        	controllerAs: 'gallery',
        	bindToController: true
		};
		return directive;
	};

	function galleryCtrl(productFetch){
    	var gallery = this;

    	  gallery.products = 0;
        gallery.LoadProduct=LoadProduct;
      	gallery.LoadProduct();
      	gallery.LoadMoreData = LoadMoreData;
      	gallery.limit=10;

      	function LoadProduct(){
                gallery.limit += 20;
                 productFetch.getProducts(gallery.limit).then(function(products){
                    
                    gallery.products = products;
                    
                });
        }
        function LoadMoreData() {
            gallery.LoadProduct();
        }
    };

})();