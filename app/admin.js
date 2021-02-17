'use strict'

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.version'
])
  .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!')

    $routeProvider.otherwise({ redirectTo: '/view1' })
  }])

  .controller('appController', function ($scope, $http){

    $http({
      method: 'GET',
      url: 'https://api.sheety.co/f746d650958bef07d26c4dae368ca02f/probeaufgabe/users',
      headers: {
        'Content-Type': 'application/json'
      }
    }) .then(function success(response){
      $scope.users = response.data.users;
      console.log(response.data.users);
    }, function error(response){
      console.log(response);
    });
  });