(function() {
    'use strict';
angular
  .module('myProduct',[])
  .directive('myProductDirective', myProductDirective);
  function myProductDirective(){
    var directive = {
      restrict: 'E',
      templateUrl: 'app/product/product.tmpl.html',
      scope: {
        product: '='
      },
    };
    return directive;
  };
})();
