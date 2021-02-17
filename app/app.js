'use strict'

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
])
  .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!')

    $routeProvider.otherwise({ redirectTo: '/view1' })
  }])

  .controller('appController', function ($scope, $timeout) {
    $scope.originalUser = {
      gender: '',
      fname: '',
      lname: '',
      email: ''
    }

    $scope.user = angular.copy($scope.originalUser)

    $scope.submitSubscriber = function () {
      if($scope.user.gender === '' || $scope.user.fname === '' || $scope.user.lname ==='' || $scope.user.email ===''){
        return;
      }

      let url = 'https://api.sheety.co/f746d650958bef07d26c4dae368ca02f/probeaufgabe/users'
      let body = {
        user: {
          gender: $scope.user.gender,
          firstname: $scope.user.fname,
          lastname: $scope.user.lname,
          email: $scope.user.email
        }
      }

      $scope.saving = true;
      document.getElementById('subscribe').value = 'Loading';
      $timeout ( function (){
        $scope.saving = false;
        $scope.subscriberForm.$submitted = false;
        $scope.user = angular.copy($scope.originalUser);
        document.getElementById('subscribe').value = 'Subscribe'
        document.getElementById('privacyCheck').checked = false;
      }, 1000)
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers:{
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then(json => {
          /* TODO have a better look why it won't work properly
          $scope.saving = false;
          $scope.subscriberForm.$submitted = false;
        $scope.user = angular.copy($scope.originalUser);*/
          alert('The form was submitted properly');
        })
    }

  })

