'use strict';

angular.module('user').controller('LoginController', ['$rootScope', '$scope','$http', 'UserAuthSrv','Authentication','$location',
    function ($rootScope, $scope,$http, UserSrv,Authentication,$location) {
        $scope.title = 'asdsadsad';
        $scope.username = '';
        $scope.password = '';

        $scope.signin = function () {

            $http({
                method: "post",
                url: '/signin',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param({username: $scope.username, password: $scope.password})
            }).success(function (response) {
                $('form').fadeOut(500);
                $('.wrapper').addClass('form-success');
                setTimeout(function() {
                    Authentication.user = response;
                    window.location.href = '#!/admin';
                }, 2000);

            }).error(function (response,status) {
                if(status == 401){
                    $scope.error = 'Хэрэглэгчийн нэр нууц үг буруу байна!';
                    $scope.username = '';
                    $scope.password = '';
                }

            });
        };
    }
]);
