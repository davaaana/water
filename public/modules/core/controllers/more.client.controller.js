'use strict';

angular.module('core').controller('MoreController', ['$rootScope', '$scope','$http', 'coreUserSrv','$location',
    function ($rootScope, $scope,$http, coreUserSrv,location) {
        $scope.title = 'asdsadsad';
        $scope.contentIds ={
            slide:6,
            home:1
        };
        $scope.pageNumber = [];
        $scope.page = 0;
        $scope.sshow = false;

        console.log(location);

        if(location.$$search.id){
            coreUserSrv.getContent(location.$$search.id).then(function (data) {
               $scope.content = data;
            });
        }else if(location.$$search.search && location.$$search.search != ''){
            $scope.searchToText = location.$$search.search;
            coreUserSrv.searchContents(location.$$search.search).then(function (data,status) {
                $scope.sshow = true;
                if(data.status == 201)
                    $scope.resultText = data.data.message;
                else{
                    $scope.content = data.data;
                    $scope.resultText = $scope.content.length;
                }

            })
        }
        if(location.$$search.more=='true'){
            $scope.sshow = false;
            coreUserSrv.getContents('',$scope.page,10).then(function (res) {
                $scope.content = res.data;
                $scope.totalCount = res.count;
                for(var i = 0;i < res.count/10;i++){
                    $scope.pageNumber.push(i);
                }
            });
        }

        $scope.pageChange = function (el) {
            coreUserSrv.getContents('',el,10).then(function (response) {
                $scope.content = response.data;
                $scope.totalCount = response.count;
            })
        };
    }
]);
