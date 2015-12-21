angular.module('admin').factory('AdminUserSrv', function ($http) {
    return {
        getAllUser: function (params) {
            var promise = $http.get('/users').then(function (response) {
                return response.data;
            });
            return promise;
        },
        createUser: function (user,image) {
            var promise = $http({
                method: 'POST',
                url: ' /createUser',
                headers: {'Content-Type': undefined},
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append('user', angular.toJson(user));
                    formData.append('file', image[0]);
                    return formData;
                }
            }).success(function (err,response) {
                return response;
            });
            return promise;
        },
        updateUser: function (user,image) {
            var promise = $http({
                method: 'POST',
                url: ' /updateUser',
                headers: {'Content-Type': undefined},
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append('user', angular.toJson(user));
                    formData.append('file', image[0]);
                    return formData;
                }
            }).success(function (err,response) {
                return response;
            });
            return promise;
        },
        deleteUser: function (id) {
            var promise = $http({
                method: 'DELETE',
                url: ' /user/'+id
            }).success(function (err,response) {
                return response;
            });
            return promise;
        }
    };
});
