angular
	.module('app')
	.service('storeService', storeService);

	function storeService($http, $q){
		return ({
			buyProducts: buyProducts

		})

		function buyProducts(list) {
        	var request = $http({
				    url: "data/buyCart.php",
				        method: "POST",
				        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				        data:list
				    })
        	.success(function () {});
            };
            
        }