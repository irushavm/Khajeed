angular.module('starter.services', [])

.service('LoginService', function($http,$ionicPopup,$window) {

  services = {};

  services.loginUser = function(name, pw,cb) {
      var status;
      $http.post("http://localhost:3000/api/Users/login/", {"email":name,"password":pw})
  	  .then(function (successResponse) {
  	    console.log(successResponse);
    		$window.loginstatus=1;
    		$window.token = successResponse.data.id;
        cb();
      },function (errorResponse) {
        console.log(errorResponse);
        delete $window.token;
        cb();
      });
    };
    //Additional Functions
    services.signupUser = function(name, pw,cb) {
      $http.post("http://localhost:3000/api/Users",
      {"email":name,"password":pw})
      .then(function (successResponse) {
  			console.log(successResponse);
  			if(successResponse.data.email === name) {
  				var alertPopup = $ionicPopup.alert({
  					title: 'Registration Successful',
  					template: 'You will be redirected to the Login Page'
          });
          cb(null);
       }
     },function (errorResponse) {
       cb(errorResponse);
     });
   };

  return services;
})
.service('PreferenceAddService', function($http,$state,$ionicPopup,$window) {
  var services = {};

  services.AddPrefs = function(title, city, category, keys, fils,cb) {
      var status;
      $http.post("http://localhost:3000/api/Preferences/addOne/",
      {
        "title":title,
        "city":city,
        "category":category,
        "keywords":keys,
        "filter":fils
      })
      .then(function (successResponse) {
  			console.log(successResponse);
  			$window.loginstatus=1;
        cb(null);
  		},function (errorResponse) {
  			console.log(errorResponse);
        cb(errorResponse);
  		});
    };


    //Additional Functions


  return services;
});
