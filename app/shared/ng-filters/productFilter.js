(function() {
    'use strict';
angular
    .module('app')
    .filter('productFilter', productFilter);
        function productFilter(){
            return function(products, options) {
                var filteredProducts = [];
                var products = products;
                var category = options.category;
                var price_min = options.min;
            	var price_max = options.max;
                var name = options.name;
                if(name!=null || name != undefined){
                    name = name.toUpperCase();
                }
                angular.forEach(products, function(product) {
                  if(product.name.toUpperCase().indexOf(name) != -1 || name == null || name == undefined){
                	if(product.price >= price_min && product.price<=price_max){
        	          if(product.categoriesRaw.indexOf(category) != -1){
        	            filteredProducts.push(product);
        	            }
        	            if(category == "All"){
        	              filteredProducts.push(product);
        	            }
        	        }
                  }
                });
                return filteredProducts;
            }
        };
})();
