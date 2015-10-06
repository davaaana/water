'use strict';

angular.module('admin').controller('DashboardController', ['$rootScope', '$scope','$http', 'UserSrv','Authentication','$location',
    function ($rootScope, $scope,$http, UserSrv,Auth,$location) {
        if(!Auth.user){ return $location.path('/login');}

    }

]);
