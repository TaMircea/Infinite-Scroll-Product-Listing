angular
	.module('app')
	.service('filterProductService', filterProductService);

	function filterProductService(){
		var vm = this;

		vm.currentCategory = "All";
		vm.setCategory = setCategory;
		vm.setFilterData = setFilterData;
		vm.products;
		vm.min;
		vm.max;
		vm.data = {
			currentCategory: vm.currentCategory,
			setCategory: 	 vm.setCategory
		}
		return{
			data: vm.data
		};

		function setCategory(cat){
			vm.currentCategory = cat;
		}
		function setFilterData(products, min, max){
			vm.products = products;
			vm.min = min;
			vm.max = max
		}


	}
