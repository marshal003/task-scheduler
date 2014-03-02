'use strict';

angular.module('taskSchedulerApp')
  .controller('MainCtrl', ['$scope', '$firebase',  function($scope, $firebase){
	 var ref = new Firebase("https://vivid-fire-9759.firebaseio.com");
  	$scope.messages = $firebase(ref);
	var auth = new FirebaseSimpleLogin(ref, function(error, user){
		if(error){
			console.log("Error during logging");
			$scope.loginError = error;
		}else if(user){
			$scope.user = user;
		}else{
			$scope.loginError = "Please login to read and post message";
		}
	});
	 $scope.message = {};
	  $scope.postMessage = function(){
		  $scope.message.postedBy = $scope.user.email;
		  $scope.message.createdAt = new Date();
		  $scope.messages.$add($scope.message);
          $scope.message = {};
	  };
  }]);
