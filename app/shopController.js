(function() {
    'use strict';



angular
    .module('app')
    .controller('customersCtrl', customersCtrl);


        function customersCtrl($scope, productFetch) {

            var vm = this;
            


        	vm.displayedProducts = [];

            vm.upLimit=10;
            vm.LoadMoreData = LoadMoreData;

            vm.playSound = playSound;
            vm.audio = new Audio('assets/sounds/Ka-Ching.wav');

            vm.change = change;
            vm.currentCategory = "All";

            vm.catFilter = catFilter;
            vm.products = [];
            vm.categories = [];
            vm.categories.push("All");
            
            vm.filterMinPrice = 0;
            vm.filterMaxPrice = 100;


            vm.addProduct = addProduct;
            vm.removeProduct = removeProduct;
            vm.cartProducts = [];
            
            vm.buyCart = buyCart;
            vm.invoiceItems = [];
            
            LoadProduct();
            //////////////
            function LoadProduct(){
                 productFetch.getProducts().then(function(products){
                    
                    vm.displayedProducts = products.slice(0,vm.upLimit);
                    vm.products = products;
                    vm.catFilter();
                });
            }

            function LoadMoreData() {
                 vm.upLimit += 10;
                 vm.displayedProducts = vm.products.slice(0,vm.upLimit);
            }
            function playSound (){
                vm.audio.play();
            }
            function change (option){ 
                vm.currentCategory=option;
                console.log(vm.currentCategory);
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
                vm.invoiceItems = vm.cartProducts;
                vm.cartProducts=[];
                vm.playSound();
            }
        };
})();