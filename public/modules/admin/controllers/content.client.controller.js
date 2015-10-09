'use strict';

angular.module('admin').controller('ContentController', ['$rootScope', '$scope','$http', 'UserSrv','Authentication','$location',
    function ($rootScope, $scope,$http, UserSrv,Authentication,$location) {
        $scope.add = function () {
            $scope.title_edit='Нэмэх';
            $('#content').modal('show');
        }

        $scope.update = function () {
            $scope.title_edit = 'Засах'
            $('#content').modal('show');
        }
    }
]);
