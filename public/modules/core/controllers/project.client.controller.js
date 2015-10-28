'use strict';

angular.module('core').controller('ProjectController', ['$rootScope', '$scope','$http', 'coreUserSrv',
    function ($rootScope, $scope,$http, coreUserSrv) {
        $scope.title = 'asdsadsad';
        $scope.contentIds ={
            slide:6,
            home:1
        };

        $scope.homePage = 0;
        coreUserSrv.getContents('Төсөл хөтөлбөрүүд',$scope.homePage,10).then(function (res) {
            $scope.contents = res.data;
        });
    }
]);
