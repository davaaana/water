'use strict';

angular.module('admin').controller('UserController', ['$rootScope', '$scope','$http', 'AdminUserSrv','Authentication','$location',
    function ($rootScope, $scope,$http, UserSrv,Authentication,$location) {

        $scope.getUsers = function () {
            UserSrv.getAllUser().then(function (result) {
                $scope.users = result;
            });
        }

        $http.get('/roles').success(function (response) {
            $scope.roles = response;
        });

        $scope.getRoleName = function (id) {
            for(var i in $scope.roles){
                if($scope.roles[i].id == id)
                    return  $scope.roles[i].name;
            }
        };

        $scope.updateModalUser = function (entity) {
            $scope.user = entity;
            $scope.updateBtn = true;
            $scope.user.re_password = entity.password;
            $scope.title_edit = 'Хэрэглэгч засах';
            $('#user').modal('show');
        }

        $scope.createModalUser = function () {
            $scope.user = {};
            $scope.title_edit = 'Хэрэглэгч нэмэх';
            $scope.updateBtn = false;
            $('#user').modal('show');
        }

        $scope.updateUser = function () {
            UserSrv.updateUser($scope.user,$scope.files).then(function (response) {
                if(response.status == 200){
                    $scope.getUsers();
                    $('#user').modal('hide');
                    $rootScope.notifyMessage = {message:response.data.message,type:1};
                }else{
                    alert(response.data.message);
                    $rootScope.notifyMessage = {message:response.data.message,type:0};
                }
            });
        }

        $scope.createUser = function () {
            if($scope.user.password != $scope.user.re_password){
                return $scope.error = 'Нууц үгээ шалгаад дахин оролдоно уу?';
            }
            UserSrv.createUser($scope.user,$scope.files).then(function (response) {
                if(response.status == 200){
                    $scope.getUsers();
                    $('#user').modal('hide');
                    $rootScope.notifyMessage = {message:response.data.message,type:1};
                }else{
                    $rootScope.notifyMessage = {message:response.data.message,type:0};
                }
            });
        }

        $scope.deleteUser = function (username) {
            BootstrapDialog.show({
                size: BootstrapDialog.SIZE_SMALL,
                title: 'Устгах',
                message: 'Итгэлтэй байна уу?',
                buttons: [
                    {
                        label: 'Тийм',
                        cssClass: 'btn-global-accept btn-sm',
                        action: function (dialogItself) {
                            UserSrv.deleteUser(username).success(function (response) {
                                if(response.status == 200){
                                    $scope.getUsers();
                                    $('#user').modal('hide');
                                    $rootScope.notifyMessage = {message:response.data.message,type:1};
                                }else{
                                    $rootScope.notifyMessage = {message:response.data.message,type:0};
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

        $scope.files = [];

        //listen for the file selected event
        $scope.$on("fileSelected", function (event, args) {
            $scope.$apply(function () {
                $scope.files.push(args.file);
            });
        });

    }
]);
