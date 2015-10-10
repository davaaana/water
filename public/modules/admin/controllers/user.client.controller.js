'use strict';

angular.module('admin').controller('UserController', ['$rootScope', '$scope','$http', 'AdminUserSrv','Authentication','$location',
    function ($rootScope, $scope,$http, UserSrv,Authentication,$location) {

        $scope.getUsers = function () {
            UserSrv.getAllUser().then(function (result) {
                $scope.users = result;
            });
        }

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
            UserSrv.deleteUser(username).then(function (response) {
                if(response.status == 200){
                    $scope.getUsers();
                    $('#user').modal('hide');
                    $rootScope.notifyMessage = {message:response.data.message,type:1};
                }else{
                    $rootScope.notifyMessage = {message:response.data.message,type:0};
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
