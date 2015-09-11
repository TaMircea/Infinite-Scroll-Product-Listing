angular
	.module('app')
	.service('cartGalleryService', cartGalleryService);
	function cartGalleryService($q) {
		var vm = this;
		vm.sendProdDefer = $q.defer();
		vm.productSent = productSent;
		vm.sendProduct = sendProduct;
		function productSent() {
			return vm.sendProdDefer.promise;
		}
		function sendProduct (product){
			vm.sendProdDefer.notify(product);
		}
	}