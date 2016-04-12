// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'starter.controllers'])

.run(function($ionicPlatform,$state,$ionicPopup) {
  $ionicPlatform.ready(function() {
    var io = Ionic.io();
    var user = Ionic.User.current();
    
    if (!user.id) {
      user.id = Ionic.User.anonymousId();
    }
    
    // Just add some dummy data..
    user.set('name', 'Sage');
    user.set('bio', 'This is my little biose');
    user.save();

    var push = new Ionic.Push({
      "canRunActionsOnWake": true, //Can run actions outside the app,
      "onNotification": function(notification) {
        var data = notification.payload;
        console.log("in notification");
        console.log(JSON.stringify(data));
        var alertPopup = $ionicPopup.alert({
          title: user.get('name') + ', you received a push notification!',
          template: data.title
        });

        alertPopup.then(function(res) {
          console.log('testification');
        });
        //alert(user.get('name') + ', you received a push notification! You\'re fun state is ' + data.funstate + "! " + notification.title);
        if(data.carstate){
          console.log(JSON.stringify(data.carstate));
          user.set('carstate',data.carstate);
          user.save();
        }
        if(data.title){
          console.log("screen change");
          $state.go('app.home', {}, {reload: true}); 
        }
      },
      "pluginConfig": {
        "android": {
          "iconColor": "#0000FF"
        }
      }
    });
    
   
    var callback = function(data) {
      push.addTokenToUser(user);
      user.save();
      console.log("user");
      console.log(JSON.stringify(user));
      var token = user.get('_push');
      console.log("android");
      console.log(JSON.stringify(token.android_tokens[0]));
      console.log("ios");
      console.log(JSON.stringify(token.ios_tokens[0]));
      console.log("tokenobj");
      console.log(JSON.stringify(token));
      console.log("whole user");
      console.log(JSON.stringify(user));
      console.log('register is happening');
    };
    push.register(callback);
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.account', {
    url: '/account',
    views: {
      'menuContent': {
        templateUrl: 'templates/account.html',
          controller: 'AccountCtrl'
      }
    }
  })

  .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html',
          controller: 'SettingsCtrl'
        }
      }
    })
    .state('app.walkthrough', {
      url: '/walkthrough',
      views: {
        'menuContent': {
          templateUrl: 'templates/walkthrough.html',
          controller: 'walkthroughCtrl'
        }
      }
    })
    .state('app.inprocess', {
      url: '/walkthrough/inprocess',
      views: {
        'menuContent': {
          templateUrl: 'templates/inprocess.html',
          controller: 'InProcessCtrl'
        }
      }
    })
    .state('app.parked', {
      url: '/walkthrough/parked',
      views: {
        'menuContent': {
          templateUrl: 'templates/parked.html',
          controller: 'ParkedCtrl'
        }
      }
    })
    .state('app.reparking', {
      url: '/walkthrough/reparking',
      views: {
        'menuContent': {
          templateUrl: 'templates/reparking.html',
          controller: 'ReparkingCtrl'
        }
      }
    })
    .state('app.pickup', {
      url: '/walkthrough/pickup',
      views: {
        'menuContent': {
          templateUrl: 'templates/pickup.html',
          controller: 'PickupCtrl'
        }
      }
    })
    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        }
      }
    })
    .state('app.home', {
      url: '/home',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.completed', {
      url: '/completed',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/completed.html',
          controller: 'CompletedCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
