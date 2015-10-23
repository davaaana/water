'use strict';

angular.module('core').controller('MoreController', ['$rootScope', '$scope','$http', 'coreUserSrv',
    function ($rootScope, $scope,$http, coreUserSrv) {
        $scope.title = 'asdsadsad';
        $scope.contentIds ={
            slide:6,
            home:1
        };
        try{
            $scope.content = JSON.parse($scope.$parent.contentMore);
        }catch (e){
            $scope.content = $scope.$parent.contentMore;
        }

    }
]);
