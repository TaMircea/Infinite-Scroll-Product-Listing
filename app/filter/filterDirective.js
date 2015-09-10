(function() {
    'use strict';
angular
	.module('app')
	.directive('myFilterDirective', filterDirective);
	function filterDirective(){
		var directive = {
			restrict: 'E',
			templateUrl: 'app/filter/filter.tmpl.html',
			scope:{},
			controller: filterController,
			controllerAs: 'shop',
			bindToController: true
		};
		return directive;
	};
	 filterController.$inject = ['filterProductService', 'filterRangeService']
    function filterController(filterProductService, filterRangeService){
    	var vm = this;
        vm.filtersShown = true;
        vm.showFilters = showFilters;
        vm.hideFilters = hideFilters;
        vm.filterMinPrice = 0;
        vm.filterMaxPrice = 100;
        vm.setMinMaxPrice = setMinMaxPrice;
        vm.minRange;
        vm.maxRange;
    	vm.catFilter = catFilter;
        vm.products = [];
        vm.categories = [];
        vm.categories.push("All");
        vm.change = change;
        vm.currentCategory = "All";
        vm.sendMinMaxRange = sendMinMaxRange
        filterProductService.filterDataSent().then(null, null, function(data){
            vm.products = data.products;
            vm.minRange = data.min;
            vm.maxRange = data.max;
            vm.sendMinMaxRange();
            vm.catFilter();
        });
        filterRangeService.minRangeSent().then(null, null, function(min){
            vm.minRange = min;
            vm.setMinMaxPrice('Min');
        });
        filterRangeService.maxRangeSent().then(null, null, function(max){
            vm.maxRange = max;
            vm.setMinMaxPrice('Max');
        });
        vm.category = vm.categories[0];
        function change (option){ 
                vm.currentCategory=option;
                console.log(vm.currentCategory);
                filterProductService.changeCategory(option);
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
        function setMinMaxPrice(MinOrMax){
            if(MinOrMax == 'Min'){
                filterProductService.sendMinPrice(vm.minRange);
            }
            if(MinOrMax == 'Max'){
                filterProductService.sendMaxPrice(vm.maxRange);
            }
        };
        function showFilters(){
            vm.filtersShown = true;
        }
        function hideFilters(){
            vm.filtersShown = false;
        }
        function sendMinMaxRange(){
            var data = {
                min: vm.minRange,
                max: vm.maxRange
            }
            filterRangeService.sendMinMaxRange(data);
        }
	}
})();