(function() {
    'use strict';
angular
	.module('MyGallery',[])
	.directive('myGalleryDirective', galleryDirective);
	function galleryDirective(){
		var directive = {
			restrict: 'E',
			templateUrl: 'app/gallery/gallery.tmpl.html',
			scope: {},
			controller: galleryController,
			controllerAs: 'shop',
			bindToController: true	
		};
		return directive;
	};
	galleryController.$inject = ['productFetch','$q','filterProductService', 'cartGalleryService', 'galleryProductService']
    function galleryController(productFetch, $q, filterProductService, cartGalleryService, galleryProductService){
    	var vm = this;
        vm.loading = false;
    	vm.products = [];
        vm.LoadProduct=LoadProduct;
        vm.sendProductToCart = sendProductToCart;
      	vm.start=0;
        vm.currentCategory = "All";
        vm.filterMinPrice = 0;
        vm.filterMaxPrice = 100;
        vm.sendProductInfo = sendProductInfo;
        vm.sendFiltersData = sendFiltersData;
        vm.filterRefresh = filterRefresh;
        vm.min;vm.max;
        vm.extremePrice = extremePrice;
        vm.LoadProduct();
        filterProductService.categoryChanged().then(null, null, function(value){
            vm.currentCategory = value;
        })
        filterProductService.minPriceSent().then(null, null, function(min){
            vm.filterMinPrice = min;
        })
        filterProductService.maxPriceSent().then(null, null, function(max){
            vm.filterMaxPrice = max;
        })
        function filterRefresh(){
            vm.extremePrice(vm.filteredProducts);
            vm.sendFiltersData(vm.filteredProducts, vm.min, vm.max);
            console.log(vm.filteredProducts);
            console.log(vm.min + ' '+ vm.max)
        };
      	function LoadProduct(){
                vm.loading = true;
                 productFetch.getProducts(vm.start).then(function(products){
                    vm.products.push.apply(vm.products, products);
                    var min = vm.extremePrice(vm.products, 'min');
                    var max = vm.extremePrice(vm.products, 'max');
                    vm.sendFiltersData(products, min, max);
                    vm.loading = false;   
                    vm.start += 20;                 
                });
        }
        function sendProductToCart(product){
            cartGalleryService.sendProduct(product);   
        }
        function sendProductInfo(product){
            galleryProductService.sendInfo(product);
        }
        function sendFiltersData(prod, min ,max){
            var data = {
                products: prod,
                min: min,
                max: max
            };
            filterProductService.sendFilterData(data);
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