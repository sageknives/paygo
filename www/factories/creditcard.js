angular.module('starter')
.factory('creditcard', function($http, $q, $ionicLoading) {
	//var date = Date.now();
    //$scope.state.order_time = Date.parse(data.order_time) - date;
    //$scope.state.isReady = new Date($scope.state.order_time).getMinutes() >= 1;
    //console.log(new Date($scope.state.order_time).getMinutes());
    //console.log($scope.state.isReady);
    //      $scope.state.payment = {};
    //$scope.state.payment.tip = 4;
    //$scope.state.payment.price = $scope.state.price;
    //$scope.state.payment.total = parseInt($scope.state.payment.price)+parseInt($scope.state.payment.tip);
    //$scope.paymentChoice = [
    //    { text: "MasterCard   **** **** **** 1234", value: "card", selected: true },
    //    { text: "Pay at Stand with Cash, Credit or Validation", value: "stand" , selected: false  }
    //];
    //$scope.state.payment.type = $scope.paymentChoice[0].value;
    //$scope.changeTip = function(num){
    //  if($scope.state.payment.tip != 0 || num > 0){
    //    $scope.state.payment.tip = parseInt($scope.state.payment.tip)+num;
    //    $scope.state.payment.total = parseInt($scope.state.payment.tip) + parseInt($scope.state.payment.price);
    //  }
    //};
    var addValues = function(num1, num2){
        return parseInt(num1) + parseInt(num2);
    }
    var paymentObj = {
        tip: 4,
        price: 0,
        total: 0,
        options:[
            { text: "MasterCard   **** **** **** 1234", value: "card", selected: true },
            { text: "Pay at Stand with Cash, Credit or Validation", value: "stand" , selected: false  }
        ],
        type: null

    }
    function getPaymentObj(orderTime,orderPrice){
        paymentObj.order_time = orderTime;
        paymentObj.price = orderPrice;
        paymentObj.total = addValues(paymentObj.price, paymentObj.tip);
        paymentObj.type = paymentObj.options[0].value;
        return paymentObj;
    }

	return {
		getPaymentObj: getPaymentObj
		
	}
})