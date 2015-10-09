angular.module('admin').factory('AdminCategorySrv', function ($http) {
    return {
        getCategories: function (params) {
            var promise = $http.get('/categories').then(function (response) {
                return response.data;
            });
            return promise;
        },
        createCategory: function (category) {
            var promise = $http({
                method: 'POST',
                url: ' /category',
                data:category
            }).success(function (err,response) {
                return response.data;
            }).error(function (err,response) {
                return response;
            });
            return promise;
        },
        updateCategory: function (category) {
            var promise = $http({
                method: 'PUT',
                url: ' /category/'+category.id,
                data:category
            }).success(function (err,response) {
                return response;
            });
            return promise;
        },
        deleteCategory: function (id) {
            var promise = $http({
                method: 'DELETE',
                url: ' /category/'+id
            }).success(function (err,response) {
                return response;
            });
            return promise;
        }
    };
});
