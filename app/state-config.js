
angular
    .module('app')
    .config(config)

function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider.
            state('about',{
            url: '/about',
            views:{ 'page':{
                templateUrl: 'app/routerTmpl/about.tmpl.html'
            }
        }}).
        state('contact',{
            url: '/contact',
            views:{ 'page':{
                templateUrl: 'app/routerTmpl/contact.tmpl.html'
            }
        }}).
        state('home',{
            url: '/home',
            views:{ 'page':{
                templateUrl: 'app/routerTmpl/home.tmpl.html'
            }
        }}).
        state('shop',{
            url: '/shop',
            views:{ 'page':{
                templateUrl: 'app/routerTmpl/shop.tmpl.html'
            }
        }}).
        state('shop.product', {
            url: '/:name?id',
            views: {'project':{
                templateUrl: 'app/routerTmpl/singleProduct.tmpl.html',
                controller:
                function productController(productFetch, $stateParams){
                      var vm = this;
                      vm.selectedProduct;
                      if(vm.selectedProduct == null){
                        loadProduct();
                      }
                      function loadProduct(){
                          vm.selectedProduct = productFetch.fetchProd($stateParams.id).then(function(prod){
                              vm.selectedProduct = prod[0];
                            });
                    }
                },
                controllerAs: 'shop',}
                }
        });

    }

