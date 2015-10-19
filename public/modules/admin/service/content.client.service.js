angular.module('admin').factory('AdminContentSrv', function ($http) {
    return {
        getCategories: function (params) {
            var promise = $http.get('/categories').then(function (response) {
                return response.data;
            });
            return promise;
        },
        getContents: function (params) {
            var promise = $http.get('/contents'+params).then(function (response) {
                return response.data;
            });
            return promise;
        },
        getContentSearch: function (search) {
            if(!search){
                search = '';
            }
            var promise = $http.get('/contentSearch?search = '+search).then(function (response) {
                return response.data;
            });
            return promise;
        },
        createContent: function (content,image) {
            var promise = $http({
                method: 'POST',
                url: ' /content',
                headers: {'Content-Type': undefined},
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append('content', angular.toJson(content));
                    formData.append('file', image[0]);
                    return formData;
                }
            }).success(function (err,response) {
                return response;
            });
            return promise;
        },
        updateContent: function (content,image) {
            var promise = $http({
                method: 'PUT',
                url: ' /content/'+content.id,
                headers: {'Content-Type': undefined},
                transformRequest: function (data) {
                    console.log(data);
                    var formData = new FormData();
                    formData.append('content', angular.toJson(content));
                    formData.append('file', image[0]);
                    return formData;
                }
            }).success(function (err,response) {
                return response;
            });
            return promise;
        },
        deleteContent: function (id) {
            var promise = $http({
                method: 'DELETE',
                url: ' /content/'+id
            }).success(function (err,response) {
                return response;
            });
            return promise;
        }
    };
});
