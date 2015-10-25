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

        $scope.generateCaptcha = function () {
            $("#captcha").attr("src", "/captcha?" + (new Date()).getTime());
        }

        $scope.sendFeed = function (model) {
            var form = true;
            if(model == undefined){
                $("#feedName").css('border','2px solid red');
                $("#feedDescription").css('border','2px solid red');
                $("#feedEmail").css('border','2px solid red');
                $("#feedCaptcha").css('border','2px solid red');
            }
            if(model.name == undefined || !model.name){
                $("#feedName").css('border','2px solid red');
                form = false;
            }

            if(model.description == undefined && !model.description){
                $("#feedDescription").css('border','2px solid red');
                form = false;
            }

            if(!model.email){
                $("#feedEmail").css('border','2px solid red');
                form = false;
            }

            if(!model.captcha){
                $("#feedCaptcha").css('border','2px solid red');
                form = false;
            }

            if(form){
                $('input').css('border','1px solid blue');
                coreUserSrv.sendFeed(model).then(function (res) {
                    if(res.status == 200)
                        $scope.feed = {};
                    $rootScope.notifyMessage = {message:res.data.message,type:1};
                });
            }else{
                $rootScope.notifyMessage = {message:'Та улаанаар хүрээлсэн хэсгүүдийг бөглөнө үү?',type:0}
                return
            }

        }
    }

]);
