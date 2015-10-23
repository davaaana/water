'use strict';

angular.module('core').controller('LawController', ['$rootScope', '$scope','$http', 'coreUserSrv',
    function ($rootScope, $scope,$http, coreUserSrv) {
        $scope.title = 'asdsadsad';
        $scope.contentIds ={
            slide:6,
            home:1
        };
    }
]);
