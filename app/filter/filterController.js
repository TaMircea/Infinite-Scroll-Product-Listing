(function() {
    'use strict';
angular
    .module('app')
    .controller('filterController', filterController);

    filterController.$inject = ['$rootScope', '$scope']
    function filterController($rootScope, $scope){
    	var vm = this;

        vm.filtersShown = false;
        vm.showFilters = showFilters;
        vm.hideFilters = hideFilters;



        vm.filterMinPrice = 0;
        vm.filterMaxPrice = 100;
        vm.setMinPrice = setMinPrice;
        vm.setMaxPrice = setMaxPrice;

    	vm.catFilter = catFilter;
        vm.products = [];
        vm.categories = [];
        vm.categories.push("All");

        vm.change = change;
        vm.currentCategory = "All";

         $scope.$on('loadCats', function(events, args){
                vm.products = args;
                vm.catFilter();
        });

        function change (option){ 
                vm.currentCategory=option;
                console.log(vm.currentCategory);
                $rootScope.$broadcast('categoryChanged', option);
        };


        function catFilter(){
                angular.forEach(vm.products, function(product){
                    var cat = product.categoriesRaw;
                    angular.forEach(cat, function(val){
                    if(vm.categories.indexOf(val) == -1) {
                        vm.categories.push(val);
                        vm.currentCategory=val;
                    }
                });
            });
        }

        function setMinPrice(){
            $rootScope.$broadcast('minPriceChanged', vm.filterMinPrice);
        };
        function setMaxPrice(){
            $rootScope.$broadcast('maxPriceChanged', vm.filterMaxPrice);
        };
        function showFilters(){
            vm.filtersShown = true;
        }
        function hideFilters(){
            vm.filtersShown = false;
        }
	}
})();
