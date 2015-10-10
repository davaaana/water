angular.module('admin').factory('DashboardSrv', function ($http) {
    return {
        getChartUser: function () {
            var promise = $http.get('/chartUser').then(function (response) {
                return response.data;
            });
            return promise;
        },
        getChartContent: function () {
            var promise = $http.get('/chartContent').then(function (response) {
                //console.log(data);
                return response.data;
            });
            return promise;
        },
        getLastContent: function () {
            var promise = $http.get('/lastContents').then(function (response) {
                return response.data;
            });
            return promise;
        }
    };
});
