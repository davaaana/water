'use strict';

angular.module('core').controller('HomeController', ['$rootScope', '$scope','$http', 'coreUserSrv',
    function ($rootScope, $scope,$http, coreUserSrv) {
        $scope.title = 'asdsadsad';
        $scope.contentIds ={
            slide:6,
            home:1
        };
        $scope.homePage = 0;



        coreUserSrv.getSlideContents($scope.contentIds.slide).then(function (res) {
            $scope.slides = res;
        });

        coreUserSrv.getLastContents().then(function (res) {
           $scope.lastContents = res.data;
        });

        coreUserSrv.getContents(29,$scope.homePage,10).then(function (res) {
            $scope.homeContents = res.data;
        })

        $scope.getContent = function (id) {
            $scope.$parent.getContent(id);
        }

        $scope.searchContent = function (text) {
            $scope.$parent.searchContent(text);
        }

        $scope.generateCaptcha = function () {
            $("#captcha").attr("src", "/captcha?" + (new Date()).getTime());
        }

        $scope.sendFeed = function (model) {
            coreUserSrv.sendFeed(model).then(function (res) {
                console.log(res);
            });
        }


    }

]);
