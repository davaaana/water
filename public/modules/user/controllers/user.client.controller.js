'use strict';

angular.module('user').controller('LoginController', ['$rootScope', '$scope','$http', 'UserAuthSrv','Authentication','$location',
    function ($rootScope, $scope,$http, UserSrv,Authentication,$location) {
        $scope.title = 'asdsadsad';
        $scope.username = 'davaana';
        $scope.password = '123';

        $scope.signin = function () {
            var params = {username:$scope.username,password:$scope.password};
            UserSrv.signin(params);
        };
    }
]);
