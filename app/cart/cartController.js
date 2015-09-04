(function() {
    'use strict';
angular
    .module('app')
    .controller('cartController', cartController);

    cartController.$inject = ['$rootScope', '$scope', 'productCartService', 'storeService']
    function cartController($rootScope, $scope, productCartService, storeService){
			var vm = this;   	
            vm.playSound = playSound;
            vm.audio = new Audio('assets/sounds/Ka-Ching.wav');

            vm.addProduct = addProduct;
            vm.removeProduct = removeProduct;
            vm.cartProducts = [];
            
            vm.buyCart = buyCart;
            vm.invoiceItems = [];

            //////////////
            
            $scope.$on('addToCart', function(events, args){
                console.log(args);
                vm.addProduct(args);
            });

            function playSound (){
                vm.audio.play();
            }
           
            function addProduct(prod){
                vm.prod=prod;
                if(vm.cartProducts.indexOf(vm.prod) == -1){
                    vm.prod.qInCart = 1;
                    vm.cartProducts.push(vm.prod);
                }
                else{
                    vm.prod.qInCart ++;
                }
            }
            function removeProduct(prod){
                if(prod.qInCart>1){
                    prod.qInCart--;
                }
                else{
                    var index = vm.cartProducts.indexOf(prod);
                    vm.cartProducts.splice(index, 1);
                }
            }
            function buyCart () {
                storeService.buyProducts(vm.cartProducts)
                vm.cartProducts=[];
                vm.playSound();
            }

    }
})();
