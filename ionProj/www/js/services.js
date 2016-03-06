angular.module('starter.services', [])

.service('LoginService', function($http,$ionicPopup,$window) {
    return {
        loginUser: function(name, pw) {
	    var status;
	        $http.post("http://10.216.234.94:3000/api/Users/login/", {"email":name,"password":pw})
			.then(function (successResponse) {
				console.log(successResponse);
				$window.loginstatus=1;			
				$window.token = successResponse.data.id;	
			},
			function (errorResponse) {
				console.log(errorResponse);
				delete $window.token;
			});
        }
    }
})

.service('PreferencesService', function($http,$ionicPopup,$window) {
    return {
        AddPrefs: function(title, city, category, keys, fils) {
	    var status;
	        $http.post("http://10.216.234.94:3000/explorer/Preferences/addOne/", {
	        			"title":title,"city":city,"category":category,"keywords":keys,"filter":fils})
			.then(function (successResponse) {
				console.log(successResponse);
				$window.loginstatus=1;			
				$window.token = successResponse.data.id;	
			},
			function (errorResponse) {
				console.log(errorResponse);
				delete $window.token;
			});
        }
    }
})

.service('SignupService', function($http,$ionicPopup) {
    return {
        signupUser: function(name, pw) {

	    $http.post("http://10.216.234.94:3000/api/Users", {"email":name,"password":pw})
		.then(function (successResponse) {
			console.log(successResponse);
			if(successResponse.data.email === name) {
				var alertPopup = $ionicPopup.alert({
					title: 'Signup successful!!',
					template: 'Go Login!'
			   	 });			
			}
		},
		function (errorResponse) {
			console.log(errorResponse);
		});    
	}
	}
});
