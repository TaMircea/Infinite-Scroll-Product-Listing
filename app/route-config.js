// route-config.js
angular
    .module('app')
    .config(config)
    .controller('productController', productController);

function config($routeProvider) {
    $routeProvider
        .when('/Products/:name&:price', {
            templateUrl: 'app/product/product.tmpl.html',
            controller: 'productController',
            controllerAs: 'show'
        }).
        when('/about',{
          templateUrl: 'app/routerTmpl/about.tmpl.html'
        }).
        when('/contact',{
          templateUrl: 'app/routerTmpl/contact.tmpl.html'
        }).
        when('/home',{
          templateUrl: 'app/routerTmpl/home.tmpl.html'
        })
}


    productController.$inject = ['galleryProductService', '$routeParams']
    function productController(galleryProductService, $routeParams){
        var vm = this;
        vm.selectedProduct = {};
        vm.selectedProduct.name = $routeParams.name;
        vm.selectedProduct.price = $routeParams.price;
        console.log(vm.selectedProduct)


    }

