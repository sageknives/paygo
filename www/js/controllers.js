angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state,customerApi) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  //var user = Ionic.User.current();
  // Form data for the login modal
  /*$scope.loginData = {};
  $scope.loginData.phone ="2062261460";
  $scope.loginData.password ="paygofun";

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };*/

  // Perform the login action when the user submits the login form
  /*$scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    var tokenObj = user.get('_push');

    customerApi.login($scope.loginData.phone, $scope.loginData.password,tokenObj.android_tokens[0], tokenObj.ios_tokens[0]).then(function(data){
      console.log(JSON.stringify(data));
      $state.go('app.home');
      //alert("Success"); 
    });
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  $timeout(function(){
    console.log("in open modal");
    $scope.modal.show();
  });*/
})
.controller('LoginCtrl', function($scope,$location,$state,$ionicHistory, customerApi) {
  console.log("in login");
  var user = Ionic.User.current();
  console.log("this is this is this is this is this is user obj");
  console.log(JSON.stringify(user));
  console.log(user);
  // Form data for the login modal
  $scope.loginData = {};
  $scope.loginData.phone ="2062261460";
  $scope.loginData.password ="paygofun";
  $scope.doLogin = function() {
    console.log("this is this is this is this is this is user obj");
  console.log(JSON.stringify(user));
    console.log('Doing login', JSON.stringify($scope.loginData));
    var tokenObj = user.get('_push');
    console.log('Doing tokenobj', JSON.stringify(tokenObj));
    customerApi.login($scope.loginData.phone, $scope.loginData.password,tokenObj.android_tokens[0], tokenObj.ios_tokens[0]).then(function(data){
      console.log(JSON.stringify(data));
      $ionicHistory.nextViewOptions({
          historyRoot: true
      });
      $state.transitionTo("app.home");

      //alert("Success"); 
    });
  };
})
.controller('walkthroughCtrl', function($scope,customerApi) {
  customerApi.getState(-1).then(function(data){
      $scope.state = data.data;
      $scope.state.buttonText = "Next";
    });
})
.controller('InProcessCtrl', function($scope,$ionicActionSheet,$timeout,$state,customerApi) {
  customerApi.getState(0).then(function(data){
      $scope.state = data.data;
    });
  $scope.show = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
     { text: 'Yes, I\'m Ready' }
     ],
     titleText: '<h2 class="action-sheet-text">Ready to retrieve your car?</h2>' +
     '<p class="action-sheet-text">We will begin retrieving your vehicle immediately. Your vehicle will be automatically reparked after 15 minutes. There is a $5 reparking fee</p>',
     cancelText: 'Nevermind',
     cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          if(index === 0){
            $state.go('app.parked');
          }
         return true;
       }
     });


 };
})
.controller('ParkedCtrl', function($scope,$ionicActionSheet,$timeout,$state,customerApi) {
  customerApi.getState(1).then(function(data){
      $scope.state = data.data;
    });
  $scope.show = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
     { text: 'Yes, I\'m Ready' }
     ],
     titleText: '<h2 class="action-sheet-text">Ready to retrieve your car?</h2>' +
     '<p class="action-sheet-text">We will begin retrieving your vehicle immediately. Your vehicle will be automatically reparked after 15 minutes. There is a $5 reparking fee</p>',
     cancelText: 'Nevermind',
     cancel: function() {
          // add cancel code..
      },
      buttonClicked: function(index) {
        if(index === 0){
          $state.go('app.reparking');
        }
       return true;
     }
   });


 };
})
.controller('ReparkingCtrl', function($scope,$ionicActionSheet,$timeout,$state,customerApi) {
  customerApi.getState(2).then(function(data){
      $scope.state = data.data;
    });
  $scope.show = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
     { text: 'Yes, I\'m Ready' }
     ],
     titleText: '<h2 class="action-sheet-text">Ready to retrieve your car?</h2>' +
     '<p class="action-sheet-text">We will begin retrieving your vehicle immediately. Your vehicle will be automatically reparked after 15 minutes. There is a $5 reparking fee</p>',
     cancelText: 'Nevermind',
     cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          if(index === 0){
            $state.go('app.pickup');
          }
         return true;
       }
     });


 };
})
.controller('PickupCtrl', function($scope,$ionicActionSheet,$timeout,$state) {
  $scope.pageTitle = "Ready for Pickup";
  $scope.pageMessage = "We are reparking your vehicle per your request. There is a $5 reparking fee.";
  $scope.buttonText = "Retrieve my Vehicle";
  $scope.price = 13;
  $scope.time = 5;
  $scope.show = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
     { text: 'Yes, I\'m Ready' }
     ],
     titleText: '<h2 class="action-sheet-text">Ready to retrieve your car?</h2>' +
     '<p class="action-sheet-text">We will begin retrieving your vehicle immediately. Your vehicle will be automatically reparked after 15 minutes. There is a $5 reparking fee</p>',
     cancelText: 'Nevermind',
     cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          if(index === 0){
            $state.go('app.pickup');
          }
         return true;
       }
     });


 };
})
.controller('SettingsCtrl', function($scope, $stateParams) {
})
.controller('AccountCtrl', function($scope, $stateParams) {
})
.controller('CompletedCtrl', function($scope, $state, $stateParams,$ionicHistory,customerApi) {
  $scope.$on('$ionicView.enter', function(e) {
    customerApi.getNewState('updateorder',6).then(function(data){
      console.log("in complete controller");
      $scope.state = data;
      $scope.goHome = function(){
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $state.transitionTo("app.home");
      }
    });
  });
})
.controller('HomeCtrl', function($scope, $stateParams, customerApi,$ionicActionSheet,$timeout, creditcard) {
  $scope.$on('$ionicView.enter', function(e) {
    console.log("reload");
    customerApi.getNewState('carstate').then(function(data){
      console.log("in HomeCtrl post post");
      $scope.state = data;
      console.log("create now date");
      var date = Date.now();
      console.log("create order Time");
      $scope.state.order_time = Date.parse(data.order_time) - date;
      console.log("check if ready");
      $scope.state.isReady = new Date($scope.state.order_time).getMinutes() >= 1;
      console.log(new Date($scope.state.order_time).getMinutes());
      if($scope.state.order_time == null) $scope.state.order_time = 10;
      //console.log($scope.state.isReady);
      console.log("get cc obj");
      $scope.state.payment = creditcard.getPaymentObj(data.order_time,data.price);
      //$scope.state.payment.tip = 4;
      //$scope.state.payment.price = $scope.state.price;
      //$scope.state.payment.total = parseInt($scope.state.payment.price)+parseInt($scope.state.payment.tip);
      //$scope.paymentChoice = [
      //    { text: "MasterCard   **** **** **** 1234", value: "card", selected: true },
      //    { text: "Pay at Stand with Cash, Credit or Validation", value: "stand" , selected: false  }
      //];
      //$scope.state.payment.type = $scope.paymentChoice[0].value;
      $scope.changeTip = function(num){
        if($scope.state.payment.tip != 0 || num > 0){
          $scope.state.payment.tip = parseInt($scope.state.payment.tip)+num;
          $scope.state.payment.total = parseInt($scope.state.payment.tip) + parseInt($scope.state.payment.price);
        }
      };
      $scope.updateChoice = function(choice){

      };
      //console.log($scope.state);

    });
  });
  /*var push = new Ionic.Push();
  var user = Ionic.User.current();
  console.log("user");
  console.log(user.get('carstate'));
  if(!user.get('carstate')) user.set('carstate','-1'); */
    var buttonStatesInfo = [
      { text:'<h2 class="action-sheet-text">READY TO RETRIEVE YOUR CAR?</h2><p class="action-sheet-text">We will begin retrieving your vehicle immediately. Your vehicle will be automatically reparked after 15 minutes. There is a $5 reparking fee.</p>',
        confirm:'Yes, I\'m Ready',
        cancel:'Never Mind',
        stateNumber: 5
    },{
      text:'<h2 class="action-sheet-text">ARE YOU SURE?</h2><p class="action-sheet-text">Canceling your request means we will repark your vehicle. There is a $5 parking fee.</p>',
        confirm:'Yes, I\'m Sure',
        cancel:'Never Mind',
        stateNumber: 4
    }
    ];
    $scope.show = function() {
      var selected = 0;
      if($scope.state.order_state == 5){
        selected = 1;
      }
    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [
      { text: buttonStatesInfo[selected].confirm},
      { text: buttonStatesInfo[selected].cancel}
      ],
      titleText: buttonStatesInfo[selected].text,
      buttonClicked: function(index) {
        if(index === 0){
          customerApi.getNewState('updateorder',buttonStatesInfo[selected].stateNumber).then(function(data){
            console.log("in HomeCtrl post updateorder");
            console.log(JSON.stringify(data));
            $scope.state = data;
            var date = Date.now();
            console.log("date:" + date);
            console.log("order_time:" + $scope.state.order_time);
            $scope.state.order_time = Date.parse(data.order_time) - date;
            console.log("order_time:" + $scope.state.order_time);

            $scope.state.isReady = new Date($scope.state.order_time).getMinutes() >= 1;
            console.log(new Date($scope.state.order_time).getMinutes());
      if($scope.state.order_time == null) $scope.state.order_time = 10;
            if(data.order_state >= 5){
              $scope.state.payment = creditcard.getPaymentObj(data.order_time,data.price);

            }
            //$scope.state.time = Date.parse($scope.state.time);

            //console.log($scope.state);

          });
        }
       return true;
     }
   });
 };
    
});
