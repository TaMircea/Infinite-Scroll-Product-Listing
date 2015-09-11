(function() {
    'use strict';
angular
	.module('app')
	.directive('myPriceRangeDirective', myPriceRangeDirective);
	function myPriceRangeDirective(){
		var directive = {
			restrict: 'E',
			templateUrl: 'app/filter/priceRange/priceRange.tmpl.html',
			scope: {},
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
    	vm.getDomElement = getDomElement;
    	function getDomElement(element) {
			return document.querySelector(element);
		};
		var range = vm.getDomElement('.range'),
 	        left = vm.getDomElement('.range_left'),
	        right = vm.getDomElement('.range_right'),
	        rangeLeft = Math.round( range.getBoundingClientRect().left),
	        rangeWidth = range.getBoundingClientRect().width,
 	        newVal;  

	    left.onmousedown = function(){
	        startMoving('left');
	    }
	    right.onmousedown = function(){
	        startMoving('right');
	    }
	    function startMoving(direction){
		      document.onmousemove = function(){
		    	var clickPos = ((event.pageX - rangeLeft)/rangeWidth)*100;
		        if(direction === 'left' && clickPos <= vm.filterMaxRange){
		        	left.style.width = clickPos + '%';
		        	newVal = (clickPos <= vm.minRange) ? vm.minRange : clickPos; 
		        	vm.filterMinRange = Math.round(newVal);
		        	vm.setMinMaxRange('Min');
		        }
		      	if(direction === 'right' && clickPos >= vm.filterMinRange){
		        	right.style.width = (100-clickPos) + '%';
		        	newVal = (clickPos >= vm.maxRange) ? vm.maxRange : clickPos; 
		        	vm.filterMaxRange = Math.round(newVal);
		        	vm.setMinMaxRange('Max');
		      	}
		      }
		      document.onmouseup = function(){
		      	document.onmousemove = null;
		      }
		  }
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
