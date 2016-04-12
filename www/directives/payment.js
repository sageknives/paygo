angular.module('starter').directive('payment', function() {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl:'templates/payment.html'
  };
});