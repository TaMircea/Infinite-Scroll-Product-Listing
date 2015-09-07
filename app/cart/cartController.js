(function() {
    'use strict';
angular
    .module('app')
    .controller('cartController', cartController);

    cartController.$inject = ['$rootScope', '$scope', 'storeService']
    function cartController($rootScope, $scope, storeService){
			var vm = this;   	
            vm.playSound = playSound;
            vm.audio = new Audio('assets/sounds/Ka-Ching.wav');

            vm.addProduct = addProduct;
            vm.removeProduct = removeProduct;
            vm.cartProducts = [];
            
            vm.buyCart = buyCart;
            vm.invoiceItems = [];

            vm.cartTotalCalc = cartTotalCalc;
            vm.cartTotal = 0;
            vm.shoppingStarted = false;

            vm.cartShown = false;
            vm.showCart = showCart;
            vm.hideCart = hideCart;
            vm.emptyCart = true;

            //////////////
            
            $scope.$on('addToCart', function(events, args){
                vm.addProduct(args);
            });

            function playSound (){
                vm.audio.play();
            }
           
            function addProduct(prod){
                vm.shoppingStarted = true;
                vm.emptyCart = false;
                vm.prod=prod;
                if(vm.cartProducts.indexOf(vm.prod) == -1){
                    vm.prod.qInCart = 1;
                    vm.cartProducts.push(vm.prod);
                }
                else{
                    vm.prod.qInCart ++;
                }
                vm.cartTotalCalc();
            }
            function removeProduct(prod){
                if(prod.qInCart>1){
                    prod.qInCart--;
                }
                else{
                    var index = vm.cartProducts.indexOf(prod);
                    vm.cartProducts.splice(index, 1);
                }
                vm.cartTotalCalc();
                if(!vm.cartProducts[0]){
                    vm.emptyCart = true;
                    vm.shoppingStarted = false;
                }
            }
            function buyCart () {
                storeService.buyProducts(vm.cartProducts)
                vm.cartProducts=[];
                vm.playSound();
                vm.cartTotal = 0;
                vm.shoppingStarted = false;
                vm.emptyCart = true;
            }

            function cartTotalCalc(){
                vm.cartTotal = 0;
                angular.forEach(vm.cartProducts, function(value, key) {
                    vm.cartTotal += (value.price * value.qInCart);
                });
            }

            function showCart(){
                vm.cartShown = true;
            }

            function hideCart(){
                vm.cartShown = false;
            }

    }
})();
