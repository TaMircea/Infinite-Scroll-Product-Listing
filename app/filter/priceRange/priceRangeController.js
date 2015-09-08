(function() {
    'use strict';
angular
    .module('app')
    .controller('priceRangeController', priceRangeController);

    priceRangeController.$inject = ['$rootScope', '$scope']

    function priceRangeController($rootScope, $scope){

    	var vm = this;

    	vm.minRange = 0;
		vm.maxRange = 100;

		vm.filterMinRange = vm.minRange;
		vm.filterMaxRange = vm.maxRange;

    	vm.setMaxPrice = setMaxPrice;
    	vm.setMinPrice = setMinPrice;


    	function getDomElement(element) {
			return document.querySelector(element);
		};
		function ngElement(element) {
			return angular.element(element);
		};
	    var rngCont    = getDomElement('.rangeContainer'),
			rangeLeft  = getDomElement('.rangeLeft'),
			rangeRight = getDomElement('.rangeRight'),
			spinLeft   = getDomElement('.spinLeft'),
			spinRight  = getDomElement('.spinRight');

		var box = rngCont.getBoundingClientRect();
		var sliderBoxCoordsLeft = Math.round(box.left);
		var containerWidth = rngCont.offsetWidth;

		function positions(spin) {
			document.onmousemove = function(event) {
				var positionPercent = ((event.pageX - sliderBoxCoordsLeft)/containerWidth)*100;
				var newPosRightSpin = 100-positionPercent;
				var range = Math.round((vm.maxRange/100)*positionPercent);

				if (spin == 'left' && positionPercent <= 100) {
					range = (range <= 0) ? 0 : range;
					if (range >= vm.minRange && range < vm.filterMaxRange) {
						rangeLeft.style.width = positionPercent+'%';
						vm.filterMinRange = range;
						vm.setMinPrice();
						$scope.$apply();
					}
				}
				if (spin == 'right' && newPosRightSpin <= 100) {
					range = (range >= vm.maxRange) ? vm.maxRange : range;
						if(range > vm.filterMinRange){
						rangeRight.style.width = newPosRightSpin+'%';
						vm.filterMaxRange = range;
						vm.setMaxPrice();
						$scope.$apply();
					}
				}
			}
			document.onmouseup = function() {
				ngElement(spinRight).removeClass('active');
				ngElement(spinLeft).removeClass('active');
				document.onmousemove = document.onmouseup = null;
			}
		};

		spinLeft.onmousedown = function() {
			ngElement(spinLeft).addClass('active');
			positions('left');
		};
		spinRight.onmousedown = function() {
			ngElement(spinRight).addClass('active');
			positions('right');
		};

		function setMinPrice(){
	        $rootScope.$broadcast('minRangeChanged', vm.filterMinRange);
	        };
	    function setMaxPrice(){
            $rootScope.$broadcast('maxRangeChanged', vm.filterMaxRange);
	   		};		
	   	$scope.$on('Range',function(event, min, max){
			console.log(min+" & "+max);
			vm.minRange = min;
			vm.maxRange = max;
	   		});
    }
})();
