angular
	.module('app')
	.service('galleryProductService', galleryProductService);

	function galleryProductService($q) {

		var vm = this;
		vm.sendinfo = $q.defer();
		vm.infoSent = infoSent;
		vm.sendInfo = sendInfo;
		function infoSent() {
			return vm.sendinfo.promise;
		}
		function sendInfo (product){
			vm.sendinfo.notify(product);
		}

	}