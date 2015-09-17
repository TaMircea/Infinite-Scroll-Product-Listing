angular
    .module('app')
    .service('productFetch', productFetch);
    function productFetch($http, $q){
      var vm = this;
      vm.products= [];

      return({
        getProds: getProds,
        getProduct: getProduct
        });

        function getProducts(start) {
           var request = $http({
            method: "get",
            url: "data/products.php",
            params: {
              start: start
            }
        });
           return( request.then( handleSuccess, handleError ) );
        }
        function handleError( response ) {
        return( $q.reject( response.data.message ) );
        }
        function handleSuccess( response ) {
            return( response.data );
        }

        function getProds(start){
          getProducts(start).then(function(products){
            vm.products.push.apply(vm.products, products);
          });
          return vm.products;
        }
        function getProduct(id){
          if(vm.products[0] == null){
            getProds(0);
          }
          var product;
          angular.forEach(vm.products, function(prod){
            if(prod.Id == id){
              product = prod;
            }
          });

          return product;
        }
    }



