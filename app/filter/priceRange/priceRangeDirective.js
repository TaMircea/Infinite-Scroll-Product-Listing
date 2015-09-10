(function() {
    'use strict';
angular
	.module('app')
	.directive('myPriceRangeDirective', myPriceRangeDirective);

	function myPriceRangeDirective(){

		var directive = {
			restrict: 'E',
			templateUrl: 'app/filter/priceRange/priceRange.tmpl.html',
			scope: {
				range: '='
			},
			controller: priceRangeController,
			controllerAs: 'range',
			bindToController: true
		};
		return directive;
	};

    priceRangeController.$inject = ['filterRangeService']
    function priceRangeController(filterRangeService){

    	var vm = this;

    	vm.minRange = 0;
		vm.maxRange = 100;

		vm.filterMinRange = vm.minRange;
		vm.filterMaxRange = vm.maxRange;

    	vm.setMinMaxRange = setMinMaxRange;


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
						vm.setMinMaxRange('Min');
					}
				}
				if (spin == 'right' && newPosRightSpin <= 100) {
					range = (range >= vm.maxRange) ? vm.maxRange : range;
						if(range > vm.filterMinRange){
						rangeRight.style.width = newPosRightSpin+'%';
						vm.filterMaxRange = range;
						vm.setMinMaxRange('Max');
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

		function setMinMaxRange(MinOrMax){
            if(MinOrMax == 'Min'){
                filterRangeService.sendMinRange(vm.filterMinRange);
            }
            if(MinOrMax == 'Max'){
                filterRangeService.sendMaxRange(vm.filterMaxRange);
            }
        };

	   	filterRangeService.minMaxRangeSent().then(null, null, function(data){
	   		vm.minRange = data.min;
			vm.maxRange = data.max;

        });
    }
})();
