(function() {
    'use strict';
angular
    .module('app')
    .controller('galleryController', galleryController);

    function galleryController($rootScope, $scope, productFetch, filterService, productCartService){
    	var vm = this;

    	vm.products;
        vm.LoadProduct=LoadProduct;
      	vm.LoadMoreData = LoadMoreData;
        vm.sendProductToCart = sendProductToCart;
      	vm.limit=1;
        vm.currentCategory = "All";

        vm.filterMinPrice = 0;
        vm.filterMaxPrice = 100;

        vm.LoadProduct();

        $scope.$on('categoryChanged', function(events, args){
            vm.currentCategory = args;
        });
        $scope.$on('minPriceChanged', function(events, args){
            vm.filterMinPrice = args;
        });
        $scope.$on('maxPriceChanged', function(events, args){
            vm.filterMaxPrice = args;
        });


      	function LoadProduct(){
                vm.limit += 20;
                 productFetch.getProducts(vm.limit).then(function(products){

                    vm.products = products;
                    filterService.setProducts(vm.products);
                    $rootScope.$broadcast('loadCats', products);
                    
                });
        }
        function LoadMoreData() {
            vm.LoadProduct();
        }
        function sendProductToCart(product){
            productCartService.setProduct(product);
            $rootScope.$broadcast('addToCart', product)
        }



    }
})();
