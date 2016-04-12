angular.module('starter')
.factory('customerApi', function($http, $q, $ionicLoading) {
	var state = {
		title: 'In Process',
		message: 'Everything is going on schedule. Your car is in the system and is being parked.',
		price: 2,
		time: 0,
		buttonText: 'Next',
		link: "#/app/walkthrough/parked"
	};
	var myToken = {};

	var base_url = 'http://sagegatzke.com/paygobackend';

    function login(phone, password, android_token,ios_token){
        console.log("android token");
        console.log(android_token);
        console.log("ios token");
        console.log(ios_token);
        console.log(android_token != null);
        var os = android_token != null ? "android" : "ios"; 
        var phone_token = os == "android" ? android_token : ios_token;
        console.log(os);
        console.log(phone_token);
        console.log("in login");
        var deferred = $q.defer();
        $ionicLoading.show();

        $http.post(base_url + '/paygoservices.php', {'phone':phone,'password':password,'phone_token': phone_token,'os':os})
            .success(function(response){
            	console.log("in success");
                $ionicLoading.hide();
                deferred.resolve(response);
                console.log("saving token");
                myToken = response;
                console.log(response);

            })
            .error(function(data){
            	console.log("in error");
            	console.log(data);
            	$ionicLoading.hide();
                deferred.reject();
            });


        return deferred.promise;

    };
    function getNewState(action,state){
        console.log("in new state");
        var deferred = $q.defer();
        $ionicLoading.show();

        $http.post(base_url + '/paygoservices.php', {'action':action,'token':myToken,'state':state})
            .success(function(response){
            	console.log("in action success");
            	console.log(JSON.stringify(response));
                $ionicLoading.hide();
                deferred.resolve(response);

            })
            .error(function(data){
            	console.log("in action error");
            	console.log(data);
            	$ionicLoading.hide();
                deferred.reject();
            });


        return deferred.promise;

    };
    function getOrderInfo(orderId){
        console.log("in new state");
        var deferred = $q.defer();
        $ionicLoading.show();

        $http.post(base_url + '/paygoservices.php', {'action':"carstate",'token':myToken,'state':"5"})
            .success(function(response){
                console.log("in action success");
                console.log(JSON.stringify(response));
                $ionicLoading.hide();
                deferred.resolve({
            title:"Thank you for parking with Paygo",
            message: "You've successfully checked out. Your credit card will be billed a total of $20, which includes parking fees and tip. You can change the tip amount at this time."
        });

            })
            .error(function(data){
                console.log("in action error");
                console.log(data);
                $ionicLoading.hide();
                deferred.reject();
            });


        return deferred.promise;
    };

	return {
		getState: function(stateIndex){
			return $http.get("http://sagegatzke.com/paygo/customer/state.php?state=" + stateIndex);
		},
		getNewState: getNewState,
		login: login,
        getOrderInfo:getOrderInfo
		
	}
})