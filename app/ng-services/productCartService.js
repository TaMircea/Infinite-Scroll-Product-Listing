angular
	.module('app')
	.service('productCartService', productCartService);

	function productCartService(){
		return({
			getProduct: getProduct,
			setProduct: setProduct
		})

		var products = [];
		function getProduct() {
			return product;
		}
		function setProduct(product){
			product = product;
		}
	}
