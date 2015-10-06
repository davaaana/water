'use strict';

angular.module('core').controller('CoreController', ['$rootScope', '$scope','$http', 'coreUserSrv',
    function ($rootScope, $scope,$http, coreUserSrv) {
        $scope.title = 'asdsadsad';

        coreUserSrv.getAllUser().then(function (results) {
            $scope.users = results
        })
    }

]);
