(function() {
    'use strict';
angular
    .module('app')
    .controller('galleryController', galleryController);

    galleryController.$inject = ['$rootScope', '$scope', 'productFetch']

    function galleryController($rootScope, $scope, productFetch){
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

        vm.LoadProduct();

        $scope.$on('categoryChanged', function(events, cat){
            vm.currentCategory = cat;
        });
        $scope.$on('minPriceChanged', function(events, min){
            vm.filterMinPrice = min;
        });
        $scope.$on('maxPriceChanged', function(events, max){
            vm.filterMaxPrice = max;
        });

      	function LoadProduct(){
                vm.loading = true;
                 productFetch.getProducts(vm.limit).then(function(products){
                    vm.products.push.apply(vm.products, products);
                    var min = extremePrice(vm.products, 'min');
                    var max = extremePrice(vm.products, 'max');
                    $rootScope.$broadcast('loadCats', products, min, max);
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
        function extremePrice(products,type){
            var max, min;
            var prices = [];
            angular.forEach(products, function(value, key) {
                prices.push(value.price);
            });
            prices.sort(function(a, b){return b-a});
            max = prices[0];
            min = prices[prices.length-1]
            if(type == 'max'){
                return max;
            };
            if (type == 'min') {
                return min;
            };

        }
    }
})();
