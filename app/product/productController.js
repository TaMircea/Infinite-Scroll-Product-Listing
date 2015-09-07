(function() {
    'use strict';
angular
    .module('app')
    .controller('productController', productController);

    productController.$inject = ['$rootScope', '$scope']

    function productController($rootScope, $scope){
    	var vm = this;
    	vm.selectedProduct;

    	$scope.$on('showProduct', function(events, args){
            vm.selectedProduct = args;
            console.log(vm.selectedProduct)
        });
    }
})();
