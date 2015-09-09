(function() {
    'use strict';
angular
    .module('app')
    .controller('galleryController', galleryController);

    galleryController.$inject = ['$rootScope', '$scope', 'productFetch','$q','filterProductService']

    function galleryController($rootScope, $scope, productFetch, $q, filterProductService){
    	var vm = this;

        vm.loading = false;
    	vm.products = [];
        vm.LoadProduct=LoadProduct;
        vm.sendProductToCart = sendProductToCart;
      	vm.limit=0;
        vm.currentCategory = "All";

        vm.filterMinPrice = 0;
        vm.filterMaxPrice = 100;
        vm.sendProductInfo = sendProductInfo;
        vm.sendFiltersData = sendFiltersData;

        vm.filterRefresh = filterRefresh;

        vm.min;vm.max;
        vm.extremePrice = extremePrice;

        vm.LoadProduct();

        $scope.$watch(
            function getValue(){
            console.log('function watched');
            return (filterProductService.currentCategory);
            },
            function catChanged(newValue, oldvalue){
                vm.currentCategory = newValue;
        });

        $scope.$on('minPriceChanged', function(events, min){
            vm.filterMinPrice = min;
        });
        $scope.$on('maxPriceChanged', function(events, max){
            vm.filterMaxPrice = max;
        });
       

        function filterRefresh(){
            vm.extremePrice(vm.filteredProducts);
            vm.sendFiltersData(vm.filteredProducts, vm.min, vm.max);
            console.log(vm.filteredProducts);
            console.log(vm.min + ' '+ vm.max)
        };

      	function LoadProduct(){
                vm.loading = true;
                 productFetch.getProducts(vm.limit).then(function(products){
                    vm.products.push.apply(vm.products, products);
                    var min = vm.extremePrice(vm.products, 'min');
                    var max = vm.extremePrice(vm.products, 'max');
                    vm.sendFiltersData(products, min, max);
                    vm.loading = false;   
                    vm.limit += 20;                 
                });
        }
        function sendProductToCart(product){
            $rootScope.$broadcast('addToCart', product);   
        }
        function sendProductInfo(product){
            $rootScope.$broadcast('showProduct', product); 
        }

        function sendFiltersData(prod, min ,max){

            /*filterProductService.setFilterData(prod, min, max);*/
            $rootScope.$broadcast('loadCats', prod, min, max);
        }

        function extremePrice(products,type){
            var max, min;
            var prices = [];
            angular.forEach(products, function(value, key) {
                prices.push(value.price);
            });
            prices.sort(function(a, b){return b-a});
            max = prices[0];
            min = prices[prices.length-1];

            if(type == 'max'){
                return max;
            };
            if (type == 'min') {
                return min;
            };
            if(type == null){
                vm.max = max;
                vm.min = min;
            }

        }
    }
})();
