angular.module('user').factory('coreUserSrv', function ($http) {
    return {
        getAllUser: function (params) {
            var promise = $http.get('/user').then(function (response) {
                return response.data;
            });
            return promise;
        },
        createUser: function (params) {
            var promise = $http.post('/user', {
                username: params.username,
                password: params.password,
                firstname: params.firstname,
                phone: params.phone,
                email: params.email,
                lastname: params.lastname
            }).then(function (response) {
                return response.data;
            });

            return promise;
        }
    };
});
