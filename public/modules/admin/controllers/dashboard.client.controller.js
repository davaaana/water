'use strict';

angular.module('admin').controller('DashboardController', ['$rootScope', '$scope','$http', 'UserSrv','AdminUserSrv','Authentication','$location',
    function ($rootScope, $scope,$http, UserSrv,AdminUserSrv,Auth,$location) {
        if(!Auth.user){ return $location.path('/login');}
        $scope.title = 'Хоосо   н';
        $http.get('/roles').success(function (response) {
            $scope.roles = response;
        });

        $scope.authUser = Auth.user;

        $scope.updateModalUser = function (entity) {
            $scope.user = entity;
            $scope.updateBtn = true;
            $scope.user.re_password = entity.password;
            $scope.title_edit = 'Хэрэглэгч засах';
            $('#AuthUser').modal('show');
        }

        $scope.updateUser = function () {
            AdminUserSrv.updateUser($scope.user,$scope.files).then(function (response) {
                if(response.status == 200){
                    $scope.getUsers();
                    $('#AuthUser').modal('hide');
                    $rootScope.notifyMessage = {message:response.data.message,type:1};
                }else{
                    alert(response.data.message);
                    $rootScope.notifyMessage = {message:response.data.message,type:0};
                }
            });
        }
    }

]);
