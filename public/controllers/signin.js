var app = angular.module("testApp",[])
				 .controller("SignInController",
				    function($scope, $http){


						$scope.error = false;
						 console.log('Inside sign in controller');
						 $scope.name = "ripudamant";

						 $scope.login = function(){
							 	var user = {'userId': $scope.username, 'password': $scope.password};
								console.log($scope.username,$scope.password);
								$http.get('/getUsers').then(function(data){
									if(data){
										angular.forEach(data.data, function(value, key){
											if(value.userId == $scope.username && value.password == $scope.password){
												localStorage.user = value.userId;
												console.log(localStorage);
												window.location.replace('/chat.html');
											}
										})
										error = true;
									}
								})
						}

						$scope.register = function(){
							$http.post('/registerUser',{'userId': $scope.newUserName, 'password': $scope.newPassword}).then(function(response){
								if(response){
									console.log(response);
								}
							});
						}
});
