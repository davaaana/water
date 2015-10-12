'use strict';

angular.module('admin').controller('CategoryController', ['$rootScope', '$scope','$http', 'AdminCategorySrv','Authentication','$location',
    function ($rootScope, $scope,$http, CategorySrv,Authentication,$location) {

        $scope.getCategory = function () {
            CategorySrv.getCategories().then(function (result) {
                $scope.categories = result;
            });
        }

        $scope.updateModalCategory = function (entity) {
            $scope.category = entity;
            $scope.updateBtn = true;
            $scope.title_edit = 'Категори засах';
            $('#category').modal('show');
        }

        $scope.createModalCategory = function () {
            $scope.category = {};
            $scope.title_edit = 'Категори нэмэх';
            $scope.updateBtn = false;
            $('#category').modal('show');
        }

        $scope.updateCategory = function () {
            CategorySrv.updateCategory($scope.category).then(function (response) {
                if(response.status == 200){
                    $scope.getCategory();
                    $('#category').modal('hide');
                    $rootScope.notifyMessage = {message:response.data.message,type:1};
                }else{
                    $rootScope.notifyMessage = {message:response.data.message,type:0};
                }
            });
        }

        $scope.createCategory = function () {
            CategorySrv.createCategory($scope.category).then(function (response) {
                if(response.status == 200){
                    $rootScope.notifyMessage = {message:response.data.message,type:1};
                    $scope.getCategory();
                    $('#category').modal('hide');
                }else{
                    $rootScope.notifyMessage = {message:response.data.message,type:0};
                }
            });
        }

        $scope.deleteCategory = function (id) {
            BootstrapDialog.show({
                size: BootstrapDialog.SIZE_SMALL,
                title: 'Устгах',
                message: 'Итгэлтэй байна уу?',
                buttons: [
                    {
                        label: 'Тийм',
                        cssClass: 'btn-global-accept btn-sm',
                        action: function (dialogItself) {
                            CategorySrv.deleteCategory(id).success(function (response) {
                                if(response.status == 200){
                                    $scope.getCategory();
                                    $rootScope.notifyMessage = {message:response.data.message,type:1};
                                    $('#category').modal('hide');
                                }else{
                                    $rootScope.notifyMessage = {message:response.data.message,type:1};
                                }
                            }).error(function () {
                                $rootScope.notifyMessage = {message:'Энэ өгөгдлийг устгах боломжгүй',type:0};
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
    }
]);
