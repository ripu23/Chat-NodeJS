var app = angular.module('testApp',[])
          app.controller('TestController', function($scope, $http){


  console.log("Inside Test Controller");
  $scope.message = "Hi from controller";
  $http.get('/getContacts').then(function(response){
    console.log("Data received from get contacts api");
    if(response){
      $scope.contacts = response.data;
    }
  });

  $scope.addContact = function(){
    console.log($scope.newContact);
    $http.post('/addContact', $scope.newContact).then(function(response){
      console.log(response);
    })


  };





});
