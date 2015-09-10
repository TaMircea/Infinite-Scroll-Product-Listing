angular
	.module('app')
	.service('filterRangeService', filterRangeService);

	function filterRangeService($q){
		var vm = this;

		vm.minRangeDefer = $q.defer();
		vm.minRangeSent = minRangeSent;
		vm.sendMinRange = sendMinRange;
		function minRangeSent() {
			return vm.minRangeDefer.promise;
		}
		function sendMinRange(min) {
			vm.minRangeDefer.notify(min)
		}

		vm.maxRangeDefer = $q.defer();
		vm.maxRangeSent = maxRangeSent;
		vm.sendMaxRange = sendMaxRange;
		function maxRangeSent() {
			return vm.maxRangeDefer.promise;
		}
		function sendMaxRange(max) {
			vm.maxRangeDefer.notify(max)
		}

		vm.minMaxRangeDefer = $q.defer();
		vm.minMaxRangeSent = minMaxRangeSent;
		vm.sendMinMaxRange = sendMinMaxRange;
		function minMaxRangeSent() {
			return vm.minMaxRangeDefer.promise;
		}
		function sendMinMaxRange(data) {
			vm.minMaxRangeDefer.notify(data)
		}

	}