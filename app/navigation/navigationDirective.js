(function() {
    'use strict';
angular
  .module('myNavigation',[])
  .directive('myNavigationDirective', myNavigationDirective);
  function myNavigationDirective(){
    var directive = {
      restrict: 'E',
      templateUrl: 'app/navigation/navigation.tmpl.html',
      scope: {},
      controller: navigationController,
      controllerAs: 'nav',
      bindToController: true
    };
    return directive;
  };

  function navigationController(){
    var vm = this;
    vm.selectedTab = '';
    vm.shownNav = true;
  }
})();
