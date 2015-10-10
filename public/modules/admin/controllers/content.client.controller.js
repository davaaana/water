'use strict';

angular.module('admin').controller('ContentController', ['$rootScope', '$scope','$http', 'AdminContentSrv','Authentication','$location',
    function ($rootScope, $scope,$http, ContentSrv,Authentication,$location) {

        $scope.addModalContent = function () {
            $scope.title_edit='Нэмэх';
            $scope.updateBtn = false;
            $('#content').modal('show');
        }

        $scope.getCategories = function () {
            ContentSrv.getCategories().then(function (response) {
                $scope.categories = response;
            })
        }

        $scope.getContents = function () {
            ContentSrv.getContents().then(function (response) {
                $scope.contents = response;
            })
        }

        $scope.updateModalContent = function (content) {
            $scope.title_edit = 'Засах'
            $scope.content = content;
            $scope.updateBtn = true;
            $('#content').modal('show');
        }

        $scope.updateContent = function () {
            ContentSrv.updateContent($scope.content,$scope.files).then(function (response) {
                if(response.status == 200){
                    $scope.getContents();
                    $('#content').modal('hide');
                }else{
                    alert(response.data.message);
                }
            });
        }

        $scope.createContent = function () {
            ContentSrv.createContent($scope.content,$scope.files).then(function (response) {
                if(response.status == 200){
                    $scope.getContents();
                    $('#content').modal('hide');
                }else{
                    alert(response.data.message);
                }
            });
        }

        $scope.deleteContent = function (id) {
            ContentSrv.deleteContent(id).then(function (response) {
                if(response.status == 200){
                    $scope.getContents();
                    $('#content').modal('hide');
                }else{
                    alert(response.data.message);
                }
            });
        }

        $scope.files = [];

        //listen for the file selected event
        $scope.$on("fileSelected", function (event, args) {
            $scope.$apply(function () {
                $scope.files.push(args.file);
            });
        });
    }
]);
