angular
    .module('app')
    .service('productFetch', productFetch);
    function productFetch($http, $q){
      var vm = this;
      vm.products= [];
      vm.currentProduct = {};

      return({
        getProds: getProds,
        fetchProd: fetchProd
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
        function fetchProd(id){
              var request = $http({
                method: "get",
                url: "data/getProduct.php",
                params: {
                  id: id
                }
              });
              return( request.then( handleSuccess, handleError ) );
            }
    }



