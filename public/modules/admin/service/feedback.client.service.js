angular.module('admin').factory('FeedbackSrv', function ($http) {
    return {
        getFeedbacks: function () {
            var promise = $http.get('/feedback').then(function (response) {
                return response.data;
            });
            return promise;
        },
        sendAnswer: function (answer) {
            var promise = $http.post('/feedbackRes',answer).success(function (err,response) {
                return response;
            });
            return promise;
        }
    };
});
