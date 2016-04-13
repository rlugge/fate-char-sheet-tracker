(function () {

'use strict';


  var servicesModule = angular.module('CharsheetApp');
  
  servicesModule.factory('Profile',  ['$http','$resource', '$q', 'API_BASE', '$cookies',
    function($http, $resource, $q, apiPath, $cookies){
      var profileService = {
        user: null,
        userToken: token,
        profile:$resource(apiPath+'profile'),
        login: function(){
          console.log("Starting login...");
          profileService.loading = true;
          $http.post(apiPath+'sessions', {email:profileService.email, password:profileService.password})
          .then(function successCallback(response){
            profileService.loading=false;
            profileService.user = response.data.user;
            profileService.setAuthToken(response.data.jwt);
          },function failureCallback(response){
            profileService.loading=false;
          });
        },
        logout: function(){
          profileService.user=null;
          profileService.unsetAuthToken();
        },
        setAuthToken: function(token){
          $http.defaults.headers.common.Authorization = 'JWT ' + token;
          profileService.userToken = token;
          $cookies.put('auth_token', token);
        },
        unsetAuthToken: function(){
          $http.defaults.headers.common.Authorization = null;
          profileService.userToken=null;
          $cookies.remove('auth_token');
        },
        restoreProfile: function(){
          return $q(function(resolve, reject){
            $http.get(apiPath+'profile').then(
              function(response){
                profileService.user = response.data.user;
                resolve(response);
              },
              function(response){
                resolve(reject(response));
              });
          });
        },
        update: function(user){
          return $q(function(resolve, reject){
            $http.put(apiPath+'profile', {user:user}).then(
              function(response){
                profileService.user = response.data.user;
                resolve(user);
              }, function(response){
                reject(response);
              }
              );
          });
        },
        updatePassword: function(oldPassword, newPassword){
          return $q(function(resolve, reject){
            $http.put(apiPath+'profile/update_password',
              { password: newPassword, old_password: oldPassword}).then(
              function(response){
                resolve(response);
              },function(response){
                reject(response);
              });
          });
        },
        requestReset: function(email){
          return $q(function(resolve, reject){
            profileService.loading = true;
            $http.post(apiPath+'profile/request_reset_password',
              {email: email}).then(
              function(response){
                profileService.loading = false;
                resolve(response);
              },function(response){
                profileService.loading = false;
                reject(response);
              });
          });
        },
        performReset: function(email, code, password){
          return $q(function(resolve, reject){
            profileService.loading = true;
            $http.post(apiPath+'profile/reset_password',
              {email: email, code:code, password:password}).then(
              function(response){
                profileService.loading = false;
                resolve(response);
              },function(response){
                profileService.loading = false;
                reject(response);
              });
          });
        }
      };
      var token = $cookies.get('auth_token');
      if (token) {
        profileService.loading = true;
        $http.get(apiPath+'profile', { headers: { authorization: 'Token: ' + token }}).then(function(response){
          profileService.loading = false;
          profileService.user = response.data.user;
          profileService.setAuthToken(token);
        },function(response){
          profileService.loading=false;
          profileService.unsetAuthToken();
        });
      }
      return profileService;
  }]);

}());