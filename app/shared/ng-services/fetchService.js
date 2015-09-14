angular
    .module('app')
    .service('productFetch', productFetch);
    function productFetch($http, $q){

      return({
        getProducts: getProducts
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
        };
        function handleError( response ) {
          if (
              ! angular.isObject( response.data ) ||
              ! response.data.message
              ) {
              return( $q.reject( "An unknown error occurred." ) );
        }
        return( $q.reject( response.data.message ) );
        }
        function handleSuccess( response ) {
            return( response.data );
        }

    }



