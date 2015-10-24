'use strict';

angular.module('admin').controller('FeedbackController', ['$rootScope', '$scope','$http', 'AdminContentSrv','FeedbackSrv','Authentication','$location',
    function ($rootScope, $scope,$http, ContentSrv,Feedback,Authentication,$location) {
        $scope.getFeedback = function () {
            Feedback.getFeedbacks().then(function (res) {
               $scope.feedbacks = res;
            });
        }

        $scope.sendAnswer = function (answer) {
            Feedback.sendAnswer(answer).then(function (res) {
                $rootScope.notifyMessage = res;
            });
        }

        $scope.sendModalShow = function (feed) {
            $scope.answer = {
                id:feed.id,
                email:feed.email,
                question:feed.description,
                answer:''
            }
            $('#feed').modal('show');
        }
    }
]);
