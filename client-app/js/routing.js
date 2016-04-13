(function () {

'use strict';


  angular.module('CharsheetApp')

  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when("/", {
          templateUrl: "./partials/home/show.html",
          controller: "HomeController"
        })
        // .when("/profile", {
        //   templateUrl: "./partials/profile/profile.html",
        //   controller: "ProfileController"
        // })
        // .when('/users', {
        //   templateUrl:"./partials/users/index.html",
        //   controller:"UsersController"
        // })
        // .when('/users/:userId', {
        //   templateUrl:"./partials/users/show.html",
        //   controller:"UserController"
        // })
        // .when('/files',{
        //   templateUrl:"./partials/files/show.html",
        //   controller:"FileController"
        // });
        .otherwise({
           redirectTo: '/'
        });
    }
  ]);

}());