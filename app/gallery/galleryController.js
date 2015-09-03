(function() {
    'use strict';
angular
    .module('app')
    .controller('galleryController', galleryController);

    function galleryController($scope, productFetch){
    	var gallery = this;

    	gallery.products;
        gallery.LoadProduct=LoadProduct;
      	gallery.LoadMoreData = LoadMoreData;
      	gallery.limit=1;

        gallery.LoadProduct();

      	function LoadProduct(){
                gallery.limit += 20;
                 productFetch.getProducts(gallery.limit).then(function(products){
                    
                    gallery.products = products;
                    
                });
        }
        function LoadMoreData() {
            gallery.LoadProduct();
        }



    }
})();
