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
            $scope.user.re_password = entity.password;
            $scope.title_edit = 'Хэрэглэгч засах';
            $('#user').modal('show');
        }

        $scope.updateUser = function () {
            console.log($scope.image)
            UserSrv.updateUser($scope.user,$scope.files).then(function (et) {
                console.log(et);
            });
        }

        $scope.deleteUser = function (username) {
            alert(username);
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
