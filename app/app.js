var app = angular.module('myApp', []);

app.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});

app.filter('productFilter', function(){
    return function(products, options) {
        var filteredProducts = [];
        var products = products;
        var category = options.category;
        var price_min = options.min;
    	var price_max = 200;

        angular.forEach(products, function(product) {
        	if(product.price >= price_min && product.price<=price_max){

	            if(product.categoriesRaw.indexOf(category) != -1){
	                filteredProducts.push(product);
	            }
	            if(category == "All"){
	                filteredProducts.push(product);
	            }
	        }
        });
        return filteredProducts;
    }
});

app.controller('customersCtrl', function($scope, $http) {
	$scope.products;
	$scope.displayedProducts;
    $http.get("data/products.php")
    .success(function(response) {
    	console.log(response);
    	$scope.products = response;
    	$scope.displayedProducts = $scope.products.slice(0,10);
    	$scope.catFilter();
    });
    $scope.LoadMoreData = function() {
		 $scope.upLimit += 10;
		 $scope.displayedProducts = $scope.products.slice(0,$scope.upLimit);
	}
    $scope.upLimit=10;




    $scope.playSound = function(){
    	$scope.audio.play();
    }
    $scope.audio = new Audio('assets/sounds/Ka-Ching.wav');
    $scope.categories = [];
    $scope.categories.push("All");
    $scope.currentCategory = "All";
    $scope.filterMinPrice = 0;


    $scope.change = function(option){
        
        $scope.currentCategory=option;
        console.log($scope.currentCategory);
    };

    $scope.catFilter=function(){
	    	angular.forEach($scope.products, function(product){
	        var cat = product.categoriesRaw;
	        angular.forEach(cat, function(val){
	            if($scope.categories.indexOf(val) == -1) {
	                $scope.categories.push(val);
	                $scope.currentCategory=val;
	            }
	        });
	    });
    }


    $scope.cartProducts = [];
    $scope.addProduct = function(prod){
    	$scope.addPro = this;
    	$scope.prod=prod;
    	if($scope.cartProducts.indexOf($scope.prod) == -1){
    			$scope.prod.qInCart = 1;
                $scope.cartProducts.push($scope.prod);
            }
         else{
         	$scope.prod.qInCart ++;
         }

    }
    $scope.removeProduct = function(prod){
    	if(prod.qInCart>1){
    		prod.qInCart--;
    	}
    	else{
    		var index = $scope.cartProducts.indexOf(prod);
    		$scope.cartProducts.splice(index, 1);
    	}
    }

    $scope.invoiceItems = [];
    $scope.buyCart = function(){
    	$scope.invoiceItems = $scope.cartProducts;
    	$scope.cartProducts=[];
    	$scope.playSound();
    }
});