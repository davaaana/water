'use strict';

angular.module('user').controller('LoginController', ['$rootScope', '$scope','$http', 'UserSrv','Authentication','$location',
    function ($rootScope, $scope,$http, UserSrv,Authentication,$location) {
        $scope.title = 'asdsadsad';
        $scope.username = 'davaana';
        $scope.password = '123';
        $scope.signin = function () {
            $http({
                method: "post",
                url: '/signin',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param({username: $scope.username, password: $scope.password})
            }).success(function (response) {
                Authentication.user = response;
                window.location.href = '#!/admin';
            }).error(function (response) {
                $scope.error = response.message;
            });
        };
    }
]);
