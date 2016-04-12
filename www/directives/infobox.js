
angular.module('starter').directive('infobox', function() {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl:'templates/infobox.html'
  };
}).directive('currentstate', function() {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl:'templates/currentstate.html'
  };
}).directive('payment', function() {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl:'templates/payment.html'
  };
});