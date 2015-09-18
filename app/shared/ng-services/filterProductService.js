angular
	.module('app')
	.service('filterProductService', filterProductService);

	function filterProductService($q){
		var vm = this;

		vm.notificationDefer = $q.defer();
		vm.categoryChanged = categoryChanged;
		vm.changeCategory = changeCategory;
		function categoryChanged() {
			return vm.notificationDefer.promise;
		}
		function changeCategory (valueToPass){
			vm.notificationDefer.notify(valueToPass);
		}

		vm.dataDefer = $q.defer();
		vm.filterDataSent = filterDataSent;
		vm.sendFilterData = sendFilterData;
		function filterDataSent() {
			return vm.dataDefer.promise;
		}
		function sendFilterData(data) {
			vm.dataDefer.notify(data)
		}

		vm.minDefer = $q.defer();
		vm.minPriceSent = minPriceSent;
		vm.sendMinPrice = sendMinPrice;
		function minPriceSent() {
			return vm.minDefer.promise;
		}
		function sendMinPrice(min) {
			vm.minDefer.notify(min)
		}

		vm.maxDefer = $q.defer();
		vm.maxPriceSent = maxPriceSent;
		vm.sendMaxPrice = sendMaxPrice;
		function maxPriceSent() {
			return vm.maxDefer.promise;
		}
		function sendMaxPrice(max) {
			vm.maxDefer.notify(max)
		}

		vm.nameDefer = $q.defer();
		vm.nameSent = nameSent;
		vm.sendName = sendName;
		function nameSent() {
			return vm.nameDefer.promise;
		}
		function sendName(name) {
			vm.nameDefer.notify(name)
		}

	}
