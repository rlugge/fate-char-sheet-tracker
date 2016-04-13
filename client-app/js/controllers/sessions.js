(function () {

'use strict';


  angular.module('CharsheetApp')
  .controller('SessionsController',['$scope','Profile', function($scope, Profile){
    $scope.Profile = Profile;
  }]);
}());