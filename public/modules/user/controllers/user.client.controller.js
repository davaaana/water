'use strict';

angular.module('user').controller('LoginController', ['$rootScope', '$scope','$http', 'UserAuthSrv','Authentication','$location',
    function ($rootScope, $scope,$http, UserSrv,Authentication,$location) {
        $scope.title = 'asdsadsad';
        $scope.username = '';
        $scope.password = '';

        $scope.signin = function () {
            $('form').fadeOut(500);
            $('.wrapper').addClass('form-success');
            $http({
                method: "post",
                url: '/signin',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param({username: $scope.username, password: $scope.password})
            }).success(function (response) {
                Authentication.user = response;
                window.location.href = '#!/admin';
            }).error(function (response,status) {
                if(status == 401){
                    $scope.error = '???????????? ??? ????? ???? ?? ????? ?????!';
                }

            });
        };
    }
]);
