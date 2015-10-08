angular.module('user').factory('UserAuthSrv', function ($http,Authentication) {
    return {
        signin: function (params) {
            $http({
                method: "post",
                url: '/signin',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param({username: params.username, password: params.password})
            }).success(function (response) {
                Authentication.user = response;
                window.location.href = '#!/admin';
            }).error(function (response) {
                $scope.error = response.message;
            });
        }
    };
});
