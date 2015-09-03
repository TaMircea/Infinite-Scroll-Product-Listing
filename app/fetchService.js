angular
	.module('app')
	.service('productFetch', productFetch);

	function productFetch($http, $q){
		return({
                    getProducts: getProducts
              });

		function getProducts() {
        	var request = $http({
                method: "get",
                url: "http://www.json-generator.com/api/json/get/crUhBLYYPm?indent=2",
                params: {
                    action: "get"
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }

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