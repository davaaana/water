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
                }else{
                    alert(response.data.message);
                }
            });
        }

        $scope.createCategory = function () {
            CategorySrv.createCategory($scope.category).then(function (response) {
                if(response.status == 200){
                    $rootScope.notifyMessage = {message:'succes',type:0}
                    $scope.getCategory();
                    $('#category').modal('hide');
                }else{
                    alert(response.data.message);
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
                            CategorySrv.deleteCategory(id).then(function (response) {
                                if(response.status == 200){
                                    $scope.getCategory();
                                    $rootScope.notifyMessage = {message:'succes',type:0}
                                    $('#category').modal('hide');
                                }else{
                                    alert(response.data.message);
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
    }
]);
