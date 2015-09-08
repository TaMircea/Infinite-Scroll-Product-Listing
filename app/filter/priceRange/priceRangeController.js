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


    	function getDomElement(element, all) {
			if (all && all !== undefined) {
				return document.querySelectorAll(element);
			} 
			else {
				return document.querySelector(element);
			}
		};

		function ngElement(element) {
			return angular.element(element);
		};

	    var rngCont    = getDomElement('.rangeContainer'),
			rangeLeft  = getDomElement('.rangeLeft'),
			rangeRight = getDomElement('.rangeRight'),
			spinLeft   = getDomElement('.spinLeft'),
			spinRight  = getDomElement('.spinRight');

		function fixEvent(event) {
			event = event || window.event;
			if (!event.target) event.target = event.srcElement;
			if (event.pageX == null && event.clientX != null) {
				var html = document.documentElement,
					body = document.body;
				event.pageX = event.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
				event.pageX -= html.clientLeft || 0;
			}
			if (!event.which && event.button) {
				event.which = event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) )
			}
			return event;
		};
		var sliderBoxCoordsLeft = getCoords(rngCont);
		var containerWidth = rngCont.offsetWidth || rngCont.clientWidth;

		function positions(spin) {
			document.onmousemove = function(event) {
				event = fixEvent(event);
				var positionPercent = ((event.pageX - sliderBoxCoordsLeft)/containerWidth)*100;
				var newPosRightSpin = 100-positionPercent;
				var range = Math.round((vm.maxRange/100)*positionPercent);

				if (spin == 'left' && positionPercent <= 100) {
					range = (range <= 0) ? 0 : range;
					if (range >= vm.minRange) {
						rangeLeft.style.width = positionPercent+'%';
						vm.filterMinRange = range;
						vm.setMinPrice();
						$scope.$apply();
					}
				}
				if (spin == 'right' && newPosRightSpin <= 100) {
					range = (range >= vm.maxRange) ? vm.maxRange : range;
						rangeRight.style.width = newPosRightSpin+'%';
						vm.filterMaxRange = range;
						vm.setMaxPrice();
						$scope.$apply();
				}
			}
			document.onmouseup = function() {
				ngElement(spinRight).removeClass('active');
				ngElement(spinLeft).removeClass('active');
				document.onmousemove = document.onmouseup = null;
			}
		};

	spinLeft.onmousedown = function() {
		spinRight.style.zIndex = '0';
		spinLeft.style.zIndex = '1';
		ngElement(spinLeft).addClass('active');
		positions('left');
		return false;
	};

	spinRight.onmousedown = function() {
		spinRight.style.zIndex = '1';
		spinLeft.style.zIndex = '0';
		ngElement(spinRight).addClass('active');
		positions('right');
		return false;
	};

	function getCoords(elem) {
		var box = elem.getBoundingClientRect();
		var body = document.body;

		var docElem = document.documentElement;
		var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
		var clientLeft = docElem.clientLeft || body.clientLeft || 0;
		var left = box.left + scrollLeft - clientLeft;

		return Math.round(left);
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
