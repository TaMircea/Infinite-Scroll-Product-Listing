(function() {
    'use strict';
angular
    .module('app')
    .controller('productController', productController);

    productController.$inject = ['galleryProductService']

    function productController(galleryProductService){
    	var vm = this;
    	vm.selectedProduct;

        galleryProductService.infoSent().then(null, null, function(info){
            vm.selectedProduct = info;
            console.log(vm.selectedProduct);
        })


    }
})();
