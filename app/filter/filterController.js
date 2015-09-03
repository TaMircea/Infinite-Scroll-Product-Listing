(function() {
    'use strict';
angular
    .module('app')
    .controller('filterController', filterController);

    function filterController(filterService){
    	var filter = this;

        filter.filterMinPrice = 0;
        filter.filterMaxPrice = 100;



    	filter.catFilter = catFilter;
        filter.products = [];
        filter.categories = [];
        filter.categories.push("All");

        filter.change = change;
        filter.currentCategory = "All";
        
        filter.products = filterService.getProducts();
        filter.catFilter();

        function change (option){ 
                filter.currentCategory=option;
                console.log(filter.currentCategory);
        };


        function catFilter(){
                angular.forEach(filter.products, function(product){
                    var cat = product.categoriesRaw;
                    angular.forEach(cat, function(val){
                    if(filter.categories.indexOf(val) == -1) {
                        filter.categories.push(val);
                        filter.currentCategory=val;
                    }
                });
            });
        }
	}
})();
