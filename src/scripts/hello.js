//
// var app = angular.module("consumeRestApp", ["ngResource"]);
//
// app.factory("greeting", function($resource) {
//   return $resource("http://rest-service.guides.spring.io/greeting");
// });
//
// app.controller("GreetingCtrl", function($scope, greeting) {
//   greeting.query(function(data) {
//     $scope.greeting = data;
//   }, function(err) {
//     // console.error("Error occured: ", err);
//   });
// });

angular.module('consumeapi', [])
  .controller('GreetingCtrl', function($scope, $http) {
    $http.get('http://127.0.0.1:8000/question/').
    then(function(response) {
      $scope.greeting = response.data;
    });
  });
