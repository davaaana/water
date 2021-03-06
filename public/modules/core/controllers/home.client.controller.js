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
           $scope.lastContents = res;
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

        $scope.getImageSrc = function (index) {
            //var imgJPG = $scope.postContents[index].content.find('img');
            var img = angular.element($scope.lastContents[index].content).find('img').attr("src");

            if (img) {
                $scope.lastContents[index].image = img;
            } else {
                $scope.lastContents[index].image = '/img/not-image.gif';
            }
        }

        coreUserSrv.getContents('Онцлох мэдээ',0,10).then(function (res) {
            $scope.postContents = res.data;
        });
    }

]);
