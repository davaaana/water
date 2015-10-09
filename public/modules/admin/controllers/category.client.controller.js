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
                    $scope.getCategory();
                    $('#category').modal('hide');
                }else{
                    alert(response.data.message);
                }
            });
        }

        $scope.deleteCategory = function (id) {
            CategorySrv.deleteCategory(id).then(function (response) {
                if(response.status == 200){
                    $scope.getCategory();
                    $('#category').modal('hide');
                }else{
                    alert(response.data.message);
                }
            });
        }
    }
]);
