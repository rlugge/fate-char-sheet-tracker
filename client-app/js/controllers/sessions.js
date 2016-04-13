(function () {

'use strict';

  function SessionsCtrl(Profile){
    "ngInject";
    this.Profile = Profile;
  }
  angular.module('CharsheetApp').controller('SessionsCtrl',SessionsCtrl);
}());