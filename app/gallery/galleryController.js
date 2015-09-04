(function() {
    'use strict';
angular
    .module('app')
    .controller('galleryController', galleryController);

    galleryController.$inject = ['$rootScope', '$scope', 'productFetch', 'filterService', 'productCartService']

    function galleryController($rootScope, $scope, productFetch, filterService, productCartService){
    	var vm = this;

        vm.loading = false;
    	vm.products = [];
        vm.LoadProduct=LoadProduct;
      	vm.LoadMoreData = LoadMoreData;
        vm.sendProductToCart = sendProductToCart;
      	vm.limit=0;
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
                vm.loading = true;
                 productFetch.getProducts(vm.limit).then(function(products){

                    vm.products.push.apply(vm.products, products);
                    filterService.setProducts(vm.products);
                    $rootScope.$broadcast('loadCats', products);
                    vm.loading = false;   
                    vm.limit += 20;                 
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
