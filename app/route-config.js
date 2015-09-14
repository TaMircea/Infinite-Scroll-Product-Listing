// route-config.js
angular
    .module('app')
    .config(config);
function config($routeProvider) {
    $routeProvider
        .when('/Products/:name', {
            templateUrl: 'app/product/product.tmpl.html'
        })
}

