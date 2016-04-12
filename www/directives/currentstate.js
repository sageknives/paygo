angular.module('starter').directive('currentstate', function() {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl:'templates/currentstate.html'
  };
});