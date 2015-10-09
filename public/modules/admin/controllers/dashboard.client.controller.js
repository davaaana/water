'use strict';

angular.module('admin').controller('DashboardController', ['$rootScope', '$scope','$http', 'UserSrv','Authentication','$location',
    function ($rootScope, $scope,$http, UserSrv,Auth,$location) {
        if(!Auth.user){ return $location.path('/login');}
        $scope.title = 'Хоосо   н';
        $http.get('/roles').success(function (response) {
            $scope.roles = response;
        });

        $scope.authUser = window.user;
    }

]);
