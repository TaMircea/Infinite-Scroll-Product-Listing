(function() {
    'use strict';
angular
	.module('app')
	.directive('myFilterDirective', filterDirective);


	function filterDirective(){

		var directive = {
			restrict: 'E',
			templateUrl: 'app/filter/filter.tmpl.html',
			controller: filterController,
        	controllerAs: 'filter',
        	bindToController: true
		};
		return directive;
	};
	function filterController(){
    	var filter = this;

        filter.filterMinPrice = 0;
        filter.filterMaxPrice = 100;



    	filter.catFilter = catFilter;
        filter.products = [];
        filter.categories = [];
        filter.categories.push("All");

        filter.change = change;
        filter.currentCategory = "All";

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