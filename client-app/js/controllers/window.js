(function () {

'use strict';

  angular.module('CharsheetApp')
  .controller('WindowController',['$scope','Profile', function($scope, Profile){
    $scope.profile = Profile;
  }]);
}());