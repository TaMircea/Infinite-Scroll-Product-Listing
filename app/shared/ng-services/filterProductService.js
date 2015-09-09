angular
	.module('app')
	.service('filterProductService', filterProductService);

	function filterProductService(){
		var vm = this;

		vm.currentCategory = "All";
		vm.setCategory = setCategory;
		vm.getCurrent = getCurrent;
		vm.setFilterData = setFilterData;
		vm.products;
		vm.min;
		vm.max;
		

		function getCurrent(){
			return vm.currentCategory;
		}
		function setCategory(cat){
			vm.currentCategory = cat;
		}
		function setFilterData(products, min, max){
			vm.products = products;
			vm.min = min;
			vm.max = max
		}


	}
