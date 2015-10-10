'use strict';

angular.module('admin').controller('DashboardController', ['$rootScope', '$scope','$http', 'UserSrv','AdminUserSrv','Authentication','$location','DashboardSrv','AdminContentSrv',
    function ($rootScope, $scope,$http, UserSrv,AdminUserSrv,Auth,$location,DashboardSrv,ContentSrv) {
        if(!Auth.user){ return $location.path('/login');}
        $scope.title = 'Хоосо   н';
        $http.get('/roles').success(function (response) {
            $scope.roles = response;
        });

        $http.get('/categories').success(function (response) {
            $scope.categories = response;
        });

        $scope.getCategoryName = function (id) {
            for(var i in $scope.categories){
                if($scope.categories[i].id == id)
                    return  $scope.categories[i].name;
            }
        };

        $scope.authUser = Auth.user;

        $scope.initDashboard = function () {
            ContentSrv.getContents().then(function (response) {
                $scope.contents = response;
            })

            DashboardSrv.getChartContent().then(function (response) {
                buildChart('chartContent',response,'chartContent','pie',300,300,'Нийт мэдээ агуулгаар',$scope);
            });
            DashboardSrv.getChartUser().then(function (response) {
                buildChart('chartUser',response,'chartUser','pie',300,300,'Хэрэглэгчийн оруулсан мэдээ',$scope);
            });
            DashboardSrv.getLastContent().then(function (response) {

            })
        }

        $scope.updateModalUser = function (entity) {
            $scope.user = entity;
            $scope.updateBtn = true;
            $scope.user.re_password = entity.password;
            $scope.title_edit = 'Хэрэглэгч засах';
            $('#AuthUser').modal('show');
        }

        $scope.updateUser = function () {
            if(!$scope.user.password || $scope.user.password=='' || $scope.user.password != $scope.user.re_password){
                return $rootScope.notifyMessage = {message:'Нууц үгээ шалгаад дахин оролдоно уу?',type:0};
            }
            AdminUserSrv.updateUser($scope.user,$scope.files).then(function (response) {
                if(response.status == 200){
                    $('#AuthUser').modal('hide');
                    $scope.authUser = response.data.body;
                    $rootScope.notifyMessage = {message:response.data.message,type:1};
                }else{
                    alert(response.data.message);
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
