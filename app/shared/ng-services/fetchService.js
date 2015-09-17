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
        function fetchProd(id){
              var request = $http({
                method: "get",
                url: "data/getProduct.php",
                params: {
                  id: id
                }
              })
              return( request.then(function(response){console.log(response.data);return( response.data) }))
            }
        function getProduct(id){

          var product;
          if(vm.products[0] == null){
            fetchProd(id).then(function(pro){
              product = pro;
            });
            }
          angular.forEach(vm.products, function(prod){
            if(prod.Id == id){
              product = prod;
            }
          });

          return product;
        }
    }



