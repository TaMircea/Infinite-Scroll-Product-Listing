// route-config.js
angular
    .module('app')
    .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/projects', {
            templateUrl: 'project.html',
            controller: 'Project',
            controllerAs: 'vm',
            resolve: {
                moviesPrepService: moviesPrepService
            }
        });
}

function moviesPrepService(movieService) {
    return movieService.getMovies();
}

// avengers.js
angular
    .module('app')
    .controller('Avengers', Avengers);

Avengers.$inject = ['moviesPrepService'];
function Avengers(moviesPrepService) {
      var vm = this;
      vm.movies = moviesPrepService.movies;
}