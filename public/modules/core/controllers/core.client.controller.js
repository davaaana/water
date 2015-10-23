'use strict';

angular.module('core').controller('CoreController', ['$rootScope', '$scope', '$http', 'coreUserSrv',
    function ($rootScope, $scope, $http, coreUserSrv) {
        $scope.title = 'asdsadsad';

        coreUserSrv.getAllUser().then(function (results) {
            $scope.users = results
        });

        $scope.getContent = function (id) {
            coreUserSrv.getContent(id).then(function (data) {
                $scope.contentMore = data;
                window.location.href = '#!/index/more'
            })
        };

        $scope.searchContent = function (text) {
            coreUserSrv.searchContents(text).then(function (res) {
                $scope.contentMore = res;
                $scope.$$childHead.content = res;
                console.log($scope);
                window.location.href = '#!/index/more'
            });
        }
    }

]);
