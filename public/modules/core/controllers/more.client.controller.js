'use strict';

angular.module('core').controller('MoreController', ['$rootScope', '$scope','$http', 'coreUserSrv','$location',
    function ($rootScope, $scope,$http, coreUserSrv,location) {
        $scope.title = 'asdsadsad';
        $scope.contentIds ={
            slide:6,
            home:1
        };

        console.log($scope);

        if(location.$$search.id){
            coreUserSrv.getContent(location.$$search.id).then(function (data) {
               $scope.content = data;
            });
        }else if(location.$$search.search != ''){
            $rootScope.searchText = location.$$search.search;
            coreUserSrv.searchContents(location.$$search.search).then(function (data) {
                $scope.content = data;
            })
        }

    }
]);
