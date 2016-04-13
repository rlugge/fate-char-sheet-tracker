(function () {

'use strict';

  function SessionsCtrl(Profile){
    "ngInject";
    console.log(Profile);
    this.Profile = Profile;
  }
  angular.module('CharsheetApp').controller('SessionsCtrl',SessionsCtrl);
}());