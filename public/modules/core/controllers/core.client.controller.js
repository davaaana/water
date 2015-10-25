'use strict';

angular.module('core').controller('CoreController', ['$rootScope', '$scope', '$http', 'coreUserSrv',
    function ($rootScope, $scope, $http, coreUserSrv) {
        $scope.title = 'asdsadsad';

        coreUserSrv.getAllUser().then(function (results) {
            $scope.users = results
        });

        $scope.getContent = function (id) {
            window.location.href = '#!/index/more?id=' + id;
        };

        $scope.searchContent = function (text) {
            window.location.href = '#!/index/more?search=' + text;
            window.location.reload();
        }
    }

]);
