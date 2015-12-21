'use strict';

angular.module('admin').controller('ContentController', ['$rootScope', '$scope','$http', 'AdminContentSrv','Authentication','$location',
    function ($rootScope, $scope,$http, ContentSrv,Authentication,$location) {

        $scope.pageNumber = [];
        $scope.addModalContent = function () {
            $scope.content = {};
            $scope.title_edit='Нэмэх';
            $scope.updateBtn = false;
            $('#content').modal('show');
        }

        $scope.getCategories = function () {
            ContentSrv.getCategories().then(function (response) {
                $scope.categories = response;
            })
        }

        $scope.getCategoryName = function (id) {
            for(var i in $scope.categories){
                if($scope.categories[i].id == id)
                    return  $scope.categories[i].name;
            }
        };

        $scope.getContents = function () {
            ContentSrv.getContents('',0,5).then(function (response) {
                $scope.pageNumber = [];
                $scope.contents = response.data;
                $scope.totalCount = response.count;
                for(var i = 0;i < response.count/5;i++){
                    $scope.pageNumber.push(i);
                }
            })
        }

        $scope.pageChange = function (el) {
            ContentSrv.getContents('',el,5).then(function (response) {
                $scope.contents = response.data;
                $scope.totalCount = response.count;
            })
        };

        $scope.updateModalContent = function (content) {
            $scope.content = {};
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
                    $rootScope.notifyMessage = {message:response.data.message,type:1};
                }else{
                    alert(response.data.message);
                    $rootScope.notifyMessage = {message:response.data.message,type:0};
                }
            });
        }

        $scope.createContent = function () {
            ContentSrv.createContent($scope.content,$scope.files).then(function (response) {
                if(response.status == 200){
                    $scope.getContents();
                    $('#content').modal('hide');
                    $rootScope.notifyMessage = {message:response.data.message,type:1};
                }else{
                    $rootScope.notifyMessage = {message:response.data.message,type:0};
                }
            });
        }

        $scope.deleteContent = function (id) {
            BootstrapDialog.show({
                size: BootstrapDialog.SIZE_SMALL,
                title: 'Устгах',
                message: 'Итгэлтэй байна уу?',
                buttons: [
                    {
                        label: 'Тийм',
                        cssClass: 'btn-global-accept btn-sm',
                        action: function (dialogItself) {
                            ContentSrv.deleteContent(id).then(function (response) {
                                if(response.status == 200){
                                    $scope.getContents();
                                    $('#content').modal('hide');
                                    $rootScope.notifyMessage = {message:response.data.message,type:1};
                                }else{
                                    $rootScope.notifyMessage = {message:response.data.message,type:0};
                                }
                            });
                            dialogItself.close();
                        }
                    }, {
                        label: 'Үгүй',
                        cssClass: 'btn-global-reject btn-sm',
                        action: function (dialogItself) {
                            dialogItself.close();
                        }
                    }]
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
