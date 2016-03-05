angular.module('starter.services', [])

.service('LoginService', function($http,$ionicPopup,$window) {
    return {
        loginUser: function(name, pw) {
	    var status;
            $http.post("http://10.216.234.94:3000/api/Users/login/", {"email":name,"password":pw})
		.then(function (successResponse) {
			console.log(successResponse);
			if(successResponse.data.email === name) {
				$window.loginstatus=1;			
			}
			$window.loginstatus=1;
			$window.token = successResponse.data.id;	
		},
		function (errorResponse) {
			console.log(errorResponse);
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
