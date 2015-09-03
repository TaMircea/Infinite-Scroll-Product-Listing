angular
	.module('app')
	.service('filterService', filterService);

	function filterService() {
		return({
			getProducts: getProducts,
			setProducts: setProducts
		});
		
		var products = [];

		function getProducts() {
			return products;
		}

		function setProducts(products){
			products = products;
			catFilter(products);
		}
	}