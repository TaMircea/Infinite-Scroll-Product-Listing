// route-config.js
angular
    .module('app')
    .config(config);
function config($routeProvider) {
    $routeProvider.
      when('/Products/:name', {
          templateUrl: 'app/product/product.tmpl.html'
        }).
      when('/About',{
          templateUrl: 'app/route.tmpl/about.tmpl.html'
        }).
      when('/',{
          templateUrl: 'app/route.tmpl/shop.tmpl.html'
        }).
        when('/Contact',{
          templateUrl: 'app/route.tmpl/contact.tmpl.html'
        }).
        when('/Shop',{
          templateUrl:'app/route.tmpl/home.tmpl.html'
        })
}

