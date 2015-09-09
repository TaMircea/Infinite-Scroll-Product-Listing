(function() {
    'use strict';
angular
    .module('app')
    .controller('filterController', filterController);

    filterController.$inject = ['$rootScope', '$scope','filterProductService']
    function filterController($rootScope, $scope, filterProductService){
    	var vm = this;

        vm.filtersShown = true;
        vm.showFilters = showFilters;
        vm.hideFilters = hideFilters;



        vm.filterMinPrice = 0;
        vm.filterMaxPrice = 100;
        vm.setMinPrice = setMinPrice;
        vm.setMaxPrice = setMaxPrice;

        vm.minRange;
        vm.maxRange;

    	vm.catFilter = catFilter;
        vm.products = [];
        vm.categories = [];
        vm.categories.push("All");

        vm.change = change;
        vm.currentCategory = "All";
        vm.sendMinMaxRange = sendMinMaxRange

         $scope.$on('loadCats', function(events, products, min, max){
            vm.products = products;
            vm.minRange = min;
            vm.maxRange = max;
            vm.sendMinMaxRange();

            vm.catFilter();
        });

        $scope.$on('minRangeChanged', function(events, min){
            vm.minRange = min;
            vm.setMinPrice();
        });
        $scope.$on('maxRangeChanged', function(events, max){
            vm.maxRange = max;
            vm.setMaxPrice();
        });

       /* $scope.$watch(
            function(){ return {prod: filterProductService.products, 
                                min:  filterProductService.min,
                                max:  filterProductService.max
                                };
             },
            function(data) {
                vm.products = data.prod;
                vm.min = data.min;
                vm.max = data.max;

                vm.sendMinMaxRange();
                vm.catFilter();  
      
           }
        )*/

        function change (option){ 
                vm.currentCategory=option;
                console.log(vm.currentCategory);
                filterProductService.setCategory(vm.currentCategory);
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
            $rootScope.$broadcast('minPriceChanged', vm.minRange);
        };
        function setMaxPrice(){
            $rootScope.$broadcast('maxPriceChanged', vm.maxRange);
        };
        function showFilters(){
            vm.filtersShown = true;
        }
        function hideFilters(){
            vm.filtersShown = false;
        }
        function sendMinMaxRange(){
            $rootScope.$broadcast('Range', vm.minRange, vm.maxRange);
        }

	}
})();
