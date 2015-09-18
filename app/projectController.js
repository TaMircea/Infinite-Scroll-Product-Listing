/**
* app Module
*
* Description
*/
angular.module('app').
  controller('productController', ['productFetch', '$stateParams', '$scope',
    function(productFetch, $stateParams, $scope){
      var vm = this;
      vm.selectedProduct;
      loadProduct();
      console.log(vm.selectedProduct);
      $scope.$on('$stateChangeSuccess',function(){
          loadProduct();
          console.log(vm.selectedProduct);
      })
      function loadProduct(){
          vm.selectedProduct = productFetch.getProduct($stateParams.id);
      }
  }])
