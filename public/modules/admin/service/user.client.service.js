angular.module('admin').factory('AdminUserSrv', function ($http) {
    return {
        getAllUser: function (params) {
            var promise = $http.get('/users').then(function (response) {
                return response.data;
            });
            return promise;
        },
        createUser: function (params,image) {
            var promise = $http.post('/user', {
                username: params.username,
                password: params.password,
                firstname: params.firstname,
                phone: params.phone,
                email: params.email,
                lastname: params.lastname,
                image:image
            }).then(function (response) {
                return response.data;
            });

            return promise;
        },
        updateUser: function (user,image) {
            var promise = $http({
                method: 'POST',
                url: ' /updateUser',
                headers: {'Content-Type': undefined},
                transformRequest: function (data) {
                    console.log(data);
                    var formData = new FormData();
                    formData.append('user', angular.toJson(user));
                    formData.append('file', image[0]);
                    return formData;
                }
            }).then(function (response) {
                return response.data;
            });
            return promise;
        }
    };
});
