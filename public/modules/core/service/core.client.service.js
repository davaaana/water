angular.module('core').factory('coreUserSrv', function ($http) {
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
        },
        getContents: function (categoryId, page, pageSize) {
            var promise = $http.get('/contents?categoryId='+categoryId+'&page='+page+'&pageSize='+pageSize).then(function (response) {
                return response.data;
            });
            return promise;
        },
        getLastContents: function () {
            var promise = $http.get('/contents?page=0&pageSize=10').then(function (response) {
                return response.data;
            });
            return promise;
        },
        getSlideContents: function (contentId) {
            var promise = $http.get('/content/slide').then(function (response) {
                return response.data;
            });
            return promise;
        }
    };
});
