(function() {
    'use strict';
angular
    .module('app')
    .controller('galleryCtrl', galleryCtrl);

    function galleryCtrl(productFetch){
    	var gallery = this;

    	gallery.products;
        gallery.LoadProduct=LoadProduct;
      	gallery.LoadProduct();
      	gallery.LoadMoreData = LoadMoreData;
      	gallery.limit=0;

      	function LoadProduct(){
                gallery.limit += 20;
                 productFetch.getProducts(gallery.limit).then(function(products){
                    
                    gallery.products = products;
                    gallery.catFilter();
                });
        }
        function LoadMoreData() {
            gallery.LoadProduct();
        }



    }
})();
