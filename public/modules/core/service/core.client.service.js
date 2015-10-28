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
        getContents: function (categoryName, page, pageSize) {
            var promise = $http.get('/contents?categoryName='+categoryName+'&page='+page+'&pageSize='+pageSize).then(function (response) {
                return response.data;
            });
            return promise;
        },
        searchContents: function (text) {
            var promise = $http.get('/contentSearch?search='+text).then(function (response) {
                return response;
            });
            return promise;
        },
        getContent: function (id) {
            var promise = $http.get('/content/'+id).then(function (response) {
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
        },
        generateCaptcha: function () {
            var promise = $http.get('/captcha').then(function (response) {
                return response.data;
            });
            return promise;
        },
        sendFeed: function (model) {
            var promise = $http.post('/feedback',model).then(function (response) {
                return response;
            });
            return promise;
        }
    };
});
