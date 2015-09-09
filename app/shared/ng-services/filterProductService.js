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
		vm.data = {
			currentCategory: vm.currentCategory,
			setCategory: 	 vm.setCategory,
			getCategory:  	 vm.getCategory
		}
		return{
			data: vm.data
		};

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
