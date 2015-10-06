'use strict';

angular.module('core').
    directive('dialogDrag', function ($document) {
        "use strict";
        return function (scope, element) {
            var startX = 0,
                startY = 0,
                x = 0,
                y = 0;
            element.css({
                position: 'fixed',
                cursor: 'move'
            });
            element.on('mousedown', function (event) {
                event.preventDefault();
                startX = event.screenX - x;
                startY = event.screenY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                y = event.screenY - startY;
                x = event.screenX - startX;
                element.css({
                    top: y + 'px',
                    left: x + 'px'
                });
            }

            function mouseup() {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
            }
        };
    });
/* file upload hiih directive */
angular.module('core').directive('fileUpload', function () {
    return {
        scope: true,
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;

                for (var i = 0; i < files.length; i++) {

                    scope.$emit('fileSelected', {file: files[i], id: attrs.id});
                }
            });
        }
    };
});

angular.module('core').directive('validFile', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attrs, ngModel) {
            el.bind('change', function () {
                scope.$apply(function () {
                    ngModel.$setViewValue(el.val());
                    ngModel.$render();
                });
            });
        }
    };
});

/**
 *
 * in controller:
 *
 * angular.module('core').controller('NewsController', ['$rootScope','$scope', function($rootScope, $scope){}
 * controller дээрээ $rootScope нэмнэ
 *
 * $rootScope.notifyMessage = {message: 'Таны хүсэлт амжилттай илгээгдлээ.',type: 1};
 * message: '' - notification дээр гарах үг
 * type: 1 - Амжилттай болсон үед ногооноор гарах
 * type: 2 - Амжилтгүй болсон үед улаанаар гарах
 *
 */

angular.module('core').directive('notif', function ($rootScope) {
    return {
        restrict: 'E',
        replace: true,
        link: function ($scope) {

            $scope.close = function () {
                $('.notifId').fadeOut('slow');
            };

            $rootScope.$watch('notifyMessage', function () {

                if (isEmpty($rootScope.notifyMessage)) {
                    return;
                }

                if ($rootScope.notifyMessage.type == 1) {
                    $('.notifId').removeClass('noti-error');
                    $('.notifId').addClass('noti-success');
                    $('.notif-icon').removeClass('notif-icon-type-error');
                    $('.notif-icon').addClass('notif-icon-type-success');
                } else {
                    $('.notifId').removeClass('noti-success');
                    $('.notifId').addClass('noti-error');
                    $('.notif-icon').removeClass('notif-icon-type-success');
                    $('.notif-icon').addClass('notif-icon-type-error');
                }

                $('.notifId').fadeIn('slow');

                setTimeout(function () {
                    $('.notifId').fadeOut('slow');
                }, 5000);


            });

        },
        template: '<div class="notifId">' +
        '<div class="notif-icon"></div>' +
        '<div class="notif-msg">' +
        '<span>{{notifyMessage.message}}</span>' +
        '<br><br><button class="btn cancel-min" ng-click="close()">Хаах</button>' +
        '</div></div>'
    };
});


angular.module('core').directive('validFile', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attrs, ngModel) {
            el.bind('change', function () {
                scope.$apply(function () {
                    ngModel.$setViewValue(el.val());
                    ngModel.$render();
                });
            });
        }
    };
});

/**
 *
 * html: <vatrps-menu menu="menus" username="user.name" avatar-url="user.image"></vatrps-menu>
 * in controller:
 * $scope.menus = [
 *   {title: 'Dashboard', href: '#!/admin'},
 *    {title: 'Сугалаа', href: '#!/admin/lottery'},
 *    {title: 'Контент', href: '#!/admin/content', notif: 15},
 *    {title: 'Faq', href: '#!/admin/faq'},
 *    {title: 'Статик хуудсууд', href: '#!/admin/static'},
 *    {title: 'Файл менежер', href: '#!/admin/filemanager'},
 *    {title: 'Гарах', href: '#!/auth/signout'}
 * ];
 */

angular.module('core').directive('vatrpsMenu', ['$filter', function ($filter) {
    var menuTemplate =
        //'<div class="dashboard-menu-col" style="z-index: 10">' +
        //'<div class="vatps-logged-user">' +
        //'<div class="user-avatar">' +
        //'<img class="img-circle" src="{{avatarUrl}}" ng-src="{{avatarUrl}}" style="width: 70px;height: 70px;position: absolute"/>' +
        //'<div class="profileImageUpload" style="margin: 40px 0px 0px;"><span style="position: absolute;  text-align: center;margin: 0 5px 0 5px;">+ Зураг оруулах</span>' +
        //'<input id="inImage" type="file" accept="image/*" file-upload style="opacity: 0;position: relative;z-index: 22;display: inline;left: 0;cursor: pointer;  height: 30px;width: 70px;"/>' +
        //'</div>' +
        //'</div>' +
        //'<div class="user-name">{{username}}<a href="{{link}}"><div class="glyphicon glyphicon-cog user-name setting-btn" data-ng-click="setting()"></div></a></div>' +
        //'<div class="user-work"></div>' +
        //'</div>' +
        //'<div class="dashboard-menu" id="cssmenu">' +
        //'<ul>' +
        //'<li ng-repeat="item in menu"><a ng-href="{{item.href}}"><span>{{item.title}}</span><span class="menu-notif" ng-show="item.notif>0">{{item.notif}}</span></li>' +
        //'<li style="cursor: pointer"><a data-ng-click="exit();"><span>{{logout}}</span></li>' +
        //'</ul>' +
        //'</div>' +
        //'</div>';

        '<nav class="navbar navbar-default">' +
        '<div class="container-fluid">' +
        '<div class="navbar-header">' +
        '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">' +
        '<span class="sr-only">Toggle navigation</span>' +
        '<span class="icon-bar"></span>' +
        '<span class="icon-bar"></span>' +
        '<span class="icon-bar"></span>' +
        '</button>' +
        '<a class="navbar-brand" href="#"><img src="../../img/logo.png" /></a>' +
        '</div>' +
        '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' +
        '<ul class="nav navbar-nav navbar-left">' +
        '<li ng-repeat="item in menu"><a ng-href="{{item.href}}"><span>{{item.title}}</span><span class="menu-notif" ng-show="item.notif>0">{{item.notif}}</span></li>' +
        '</ul>' +
        '<ul class="nav navbar-nav navbar-right">' +
        '<li class="dropdown">' +
        '<div type="button" class="btn btn-userprofile navbar-btn dropdown-toggle"  data-toggle="dropdown" role="button" aria-expanded="false">{{username}} <span class="navbar-glyphicon glyphicon glyphicon-triangle-bottom"></span></div>' +
        '<ul class="dropdown-menu" role="menu">' +
        '<li><a href="#!/merchant/setting"><span class="navbar-glyphicon glyphicon glyphicon-cog"></span> Хувийн тохиргоо</a></li>' +
        '<li class="navbar-divider divider"></li>' +
        '<li style="cursor: pointer"><a data-ng-click="exit();"><span class="navbar-glyphicon glyphicon glyphicon-log-out"></span> Системээс гарах</a></li>' +
        '</ul>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</nav>';


    return {
        restrict: 'EA',
        replace: true,
        scope: {
            menu: '=',
            username: '=',
            user: '=',
            avatarUrl: '=',
            link: '='
        },
        template: menuTemplate,
        link: function ($scope) {
            if ($scope.user.accType == 0) {
                $scope.link = '#!/';
            }
            if ($scope.user.accType == 2) {
                $scope.link = '#!/merchant/setting';
            }
            if ($scope.user.accType == 1) {
                $scope.link = '#!/consumer/setting';
            }
            if ($scope.user.accType == 3) {
                $scope.link = '#!/operator/edit';
            }
            if (!$scope.username) {
                $scope.username = 'Хэрэглэгч нэр';
            }
            if (!$scope.avatarUrl) {
                $scope.avatarUrl = '../img/avatar.png';
            }

            if (!$scope.menu) {
                $scope.menu = [];
            }

        },
        controller: function ($scope, $rootScope) {
            var l = {};
            if ($rootScope.language === 'mn') {
                $scope.logout = 'Системээс гарах';
                $scope.title = 'Сануулга';
                $scope.message = 'Та системээс гарахдаа итгэлтэй байна уу?';
                $scope.yes = 'Тийм';
                $scope.no = 'Үгүй';
            } else {
                $scope.logout = 'Logout';
                $scope.title = 'Warning';
                $scope.message = 'Are you sure want to logout';
                $scope.yes = 'Yes';
                $scope.no = 'No';
            }

            $scope.exit = function () {
                BootstrapDialog.show({
                    size: BootstrapDialog.SIZE_SMALL,
                    title: $scope.title,
                    message: $scope.message,
                    buttons: [
                        {
                            label: $scope.yes,
                            cssClass: 'btn-global-accept btn-sm',
                            action: function (dialogItself) {
                                $.removeCookie('firstpopover');
                                window.location.href = 'auth/signout';
                                dialogItself.close();
                            }
                        }, {
                            label: $scope.no,
                            cssClass: 'btn-global-reject btn-sm',
                            action: function (dialogItself) {
                                dialogItself.close();
                            }
                        }]
                });
            };
        }
    };
}]);


/**
 * in controller:
 *angular.module('core').controller('NewsController', ['$rootScope','$scope', function($rootScope, $scope){}
 * controller дээрээ $rootScope нэмнэ
 *
 * html: <vatrps-time-line username="user.id"></vatrps-time-line>
 *Server.route:
 *   app.route('/api/v1/timeline/:id').get(function(req,res){
 *   *req.cassandra.execute("select * from timeline where account_id = ? allow filtering", [req.params.id], {prepare: true}, function(err, result)
 *
 */


angular.module('core').directive('vatrpsTimeLine', function ($http, $rootScope) {
    var timelineTemplate =
    '</div>'+
        '<div class="time-line" id="timeline" data-ng-hide="hidden" style="height: 420px;overflow-x: hidden;overflow-y: scroll">' +
        '<span style="position: absolute;display: block;padding: 10px" class="glyphicon glyphicon-save" data-ng-click="exportTimelExcel()"></span>'+
        '<div class="containerr" >' +
        '<ul class="timeline">' +
        '<span data-ng-model="date" class="time-date">{{date}}</span>' +
        '<span data-ng-model="date" class="time-date" id="up">{{upMonth}}-сар</span>' +
        '<li ng-repeat="item in vm.items | orderBy: \'-date\'">' +
        '<div class="direction-l" data-ng-if="item.origin!=1">' +
        '<div class="flag-wrapper">' +
        '<span class="flag" style="width: 120px;display: block"></span>' +
        '<div class="flag-content-l">' +
        '<span class="" style="width: 120px;display: block;color:#000000">{{item.message}}</span>' +
        '<span class="time-wrapper"><span class="time">{{item.date | date:\'yyyy-MM-dd HH:mm:ss\'}}</span></span></div>' +
        '<div class="desc" style="width: 120px;display: block"></div>' +

        '</div>' +
        '</div>' +
        '<div class="direction-r" data-ng-if="item.origin==1">' +
        '<div class="flag-wrapper">' +
        '<span class="flag" style="width: 120px;display: block"></span>' +
        '<div class="flag-content-r">' +
        '<span class="" style="width: 120px;display: block;color:#000000">{{item.message}}</span>' +
        '<span class="time-wrapper"><span class="time">{{item.date | date:\'yyyy-MM-dd HH:mm:ss\'}}</span></span></div>' +
        '<div class="desc" style="width: 120px;display: block"></div>' +

        '</div>' +
        '</div>' +
        '</li>' +

        '</ul>' +
        '<span data-ng-model="date" class="time-date">{{month}}-САР</span>' +
        '<span data-ng-model="date" class="time-date"><span class="glyphicon glyphicon-chevron-down page-down" data-ng-click="pagingDown()"></span></span>' +
        '</div>' +
        '</div>';

    return {
        restrict: 'E',
        replace: true,
        template: timelineTemplate,
        scope: {
            username: '='
        },
        link: function () {
        },
        controller: function ($scope) {
            $('#timeline').slimScroll({
                height: '659px',
                railColor: '#0e2942',
                railOpacity: 1
            });
            var vm = this;
            vm.searchText = '';
            $scope.oldDate = '';
            $scope.pagingDown = function () {
                if (vm.items[vm.items.length - 1]) {
                    var index = new Date(vm.items[vm.items.length - 1].date);
                    index.toDateString();
                    $http.get('/api/v1/timeline/{0}/{1}'.format($scope.username, (new Date(index).getTime())))
                        .success(function (data) {
                            data.forEach(function (el) {
                                vm.items.push(el);
                            });
                            var date;
                            var month;
                            var d = new Date(vm.items[vm.items.length - 1].date);
                            date = d.getFullYear();
                            month = d.getMonth();
                            $scope.date = date;
                            $scope.month = month + 1;
                        })
                        .error(function () {
                            $rootScope.notifyMessage = {message: 'Алдаа гарлаа.', type: 0};
                        });
                }
            };
            $scope.pagingUp = function () {
                if (vm.items[0]) {
                    var index = new Date(vm.items[0].date).getTime();
                    $http.get('/api/v1/timelineup/{0}/{1}'.format($scope.username, index))
                        .success(function () {
                            var date;
                            var month;
                            var d = new Date();
                            date = d.getFullYear();
                            month = d.getMonth();
                            $scope.date = date;
                            $scope.month = month;
                        })
                        .error(function () {
                            $rootScope.notifyMessage = {message: 'Алдаа гарлаа.', type: 0};
                        });
                }
            };
            $http.get('/api/v1/timeline/{0}'.format($scope.username))
                .success(function (data) {
                    vm.items = data;
                    if (!data.length || data.length < 1) {
                        $scope.hidden = true;
                    }
                    else {
                        $scope.hidden = false;
                    }
                    var date;
                    var month;
                    var d = new Date();
                    date = d.getFullYear();
                    month = d.getMonth();
                    $scope.date = date;
                    $scope.month = month;
                    $scope.upMonth = month + 1;
                })
                .error(function () {
                    $rootScope.notifyMessage = {message: 'Алдаа гарлаа.', type: 0};
                });
            $scope.exportTimelExcel = function(){
                jsonToExcelConverter(vm, 'Таны цагийн шугам', true);
            }
        },

        controllerAs: 'vm'
    };
});


angular.module('core').directive('vatrpsLiveChat', function () {
    var url = window.location.origin + '/chat';
    var chatTemplate =
        '<section class="chat-cont">' +
        '<header class="chat-top-bar">' +
        '<div class="left online-chat" ng-click="chat()">' +
        '<span class="title"><i class="commm glyphicon glyphicon-comment margin-r" style="float:left;" id="chaticon"></i>Чат</span>' +
        '</div>' +
        '<div class="right">' +
        '<span class="glyphicon glyphicon-minus c-mar-r" ng-click="hide()" title="Нуух"></span>' +
        '<span class="glyphicon glyphicon-remove c-mar-r" ng-click="show()" title="Гарах"></span>' +
        '</div>' +
        '</header>' +
        '<iframe width="260" height="300" scrolling="no" style="border: 0px;" id="user-iframe" style="background-color:#e5e5e5;"></iframe>' +
        '</section>';

    var directive = {
        restrict: 'EA',
        template: chatTemplate,
        replace: true,
        scope: {
            username: '='
        },
        controller: function ($scope) {
            var isClicked = false;
            var notif = false;

            $scope.hide = function () {
                $('.chat-cont').animate({bottom: '-305px'}, function () {
                    $('.chat-cont').animate({right: '-180px'});
                });

                notif = true;

                var dis = document.getElementById('user-iframe').contentWindow.document.getElementById('dis');
                if (dis.addEventListener) {
                    dis.addEventListener('DOMNodeInserted', OnNodeInserted, false);
                }

                function OnNodeInserted(event) {
                    if (!!notif)
                        $('.chat-top-bar').css({"background-color": "#EE4823"});
                }
            };

            $scope.show = function () {
                $scope.r = false;
                BootstrapDialog.show({
                    size: BootstrapDialog.SIZE_SMALL,
                    title: 'Онлайн чаатыг хаах уу?',
                    message: 'Та чатыг хаах уу?',
                    buttons: [
                        {
                            label: 'Тийм',
                            cssClass: 'btn-global-accept btn-m',
                            action: function (dialogItself) {
                                $scope.r = true;
                                $scope.hide();
                                dialogItself.close();
                            }
                        }, {
                            label: 'Үгүй',
                            cssClass: 'btn-global-reject btn-m',
                            action: function (dialogItself) {
                                $scope.r = false;
                                dialogItself.close();
                            }
                        }]
                });

                if ($scope.r == true) {
                    $('#user-iframe').attr('src', url + '?name=' + $scope.username);
                }
                $('.chat-top-bar').css({"background-color": "#0e2942"});
            };

            $scope.chat = function () {
                if (!isClicked) {
                    $('#user-iframe').attr('src', url + '?name=' + $scope.username);
                    isClicked = true;
                }
                $('.chat-cont').animate({right: '0px'}, function () {
                    $('.chat-cont').animate({bottom: '-55px'});
                });

                $('.chat-top-bar').css({"background-color": "#0e2942"});
                notif = false;
            };
        }
    };

    return directive;
});

angular.module('core').filter('Tr', function ($rootScope) {
    return function (i) {
        return $rootScope.language === 'mn' ? i.mn : i.en;
    };
});


angular.module('core').directive('expireTimer', ['$interval', '$http', '$filter', '$rootScope', function ($interval, $http, $filter, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            date: '@'
        },
        controller: ['$scope', '$filter', '$rootScope', function ($scope, $filter, $rootScope) {
            $rootScope.$watch('language', function () {
                $scope.t1 = $filter('Tr')(languages.core.header.t1);
                $scope.t2 = $filter('Tr')(languages.core.header.t2);
                $scope.t3 = $filter('Tr')(languages.core.header.t3);
                $scope.t4 = $filter('Tr')(languages.core.header.t4);
                $scope.t5 = $filter('Tr')(languages.core.header.t5);
                $scope.t6 = $filter('Tr')(languages.core.header.t6);
            });
        }],
        link: function ($scope) {
            function toDDHHMMSS(timer) {
                if (timer < 0) {
                    timer = 0;
                }
                var sec_num = parseInt(timer);
                var days = Math.floor(sec_num / 86400);
                var dx = sec_num % 86400;
                var hours = Math.floor(dx / 3600);
                var minutes = Math.floor((dx % 3600) / 60);
                var seconds = Math.floor((dx % 3600) % 60);


                if (days < 10) {
                    days = '0' + days;
                }
                if (hours < 10) {
                    hours = '0' + hours;
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                $scope.timerDD1 = days.toString().substring(0, 1);
                $scope.timerDD2 = days.toString().substring(1, 2);
                $scope.timerHH1 = hours.toString().substring(0, 1);
                $scope.timerHH2 = hours.toString().substring(1, 2);
                $scope.timerMM1 = minutes.toString().substring(0, 1);
                $scope.timerMM2 = minutes.toString().substring(1, 2);
                $scope.timerSS1 = seconds.toString().substring(0, 1);
                $scope.timerSS2 = seconds.toString().substring(1, 2);
            }

            $scope.lotteryDate = $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss');
            $http.get('/api/v1/lotteryDate')
                .success(function (results) {
                    $scope.lotteryDate = results[0].date;
                    interval();
                })
                .error(function () {
                    $scope.lotteryDate = $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss');
                });

            function interval() {
                var sTime = $filter('date')($scope.lotteryDate, 'yyyy/MM/dd HH:mm:ss');
                var d1 = Math.floor(new Date(sTime).getTime() / 1000);
                var d2 = Math.floor(new Date().getTime() / 1000);
                toDDHHMMSS(d1 - d2);
                $interval(function () {
                    toDDHHMMSS(d1 - d2);
                    d2++;
                }, 1000);
            }


        },
        template: '<div class="timerMain">' +
        '<div class="timerList">' +
        '<span class="timer timerHH">{{timerDD1}}</span> ' +
        '<span class="timer timerHH">{{timerDD2}}</span> ' +
        '<span class="timerText">{{t1}}</span> </div> ' +
        '<div class="timerListDot"> <span class="timerDot">:</span> </div> ' +
        '<div class="timerList"> ' +
        '<span class="timer timerHH">{{timerHH1}}</span> ' +
        '<span class="timer timerHH">{{timerHH2}}</span> ' +
        '<span class="timerText">{{t2}}</span> </div> ' +
        '<div class="timerListDot"> <span class="timerDot">:</span> </div> ' +
        '<div class="timerList"> ' +
        '<span class="timer timerMM">{{timerMM1}}</span> ' +
        '<span class="timer timerMM">{{timerMM2}}</span> ' +
        '<span class="timerText">{{t3}}</span> </div> ' +
        '<div class="timerListDot"> <span class="timerDot">:</span> </div> ' +
        '<div class="timerList"> ' +
        '<span class="timer timerSS">{{timerSS1}}</span> ' +
        '<span class="timer timerSS">{{timerSS2}}</span> ' +
        '<span class="timerText">{{t4}}</span> </div> ' +
        '<span class="timerTitle">2015.04.28 - 2015.05.05</span> ' +
        '</div>'
    };
}]);


/* My data grid directive  */

/**
 * in controller:
 * angular.module('example_module', ['smart-table']).controller(
 * module дээрээ ['smart-table'] нэмнэ
 *
 * html:  <mydata-grid grid-data="dataList" col-defs="col_defs" item-by-page="10"></mydata-grid>
 *

 //Controller дээрээ дараах байдлаар утгаа авна.

 $scope.dataList = [];
 $http.get('/api/v1/sales')
 .success(function (data) {
    $scope.dataList = data;
 });

 $scope.col_defs = [
 {displayName: "Баримтын огноо", field: "receipt_date", sortable: true, width: 40, type: "currency" },
 {displayName: "Баримтын дугаар", field: "receipt_id", sortable: true, width: 90},
 {displayName: "Худалдсан бараанууд", field: "comment", sortable: true, width: 120},
 {displayName: "Мөнгөн дүн", field: "amount", sortable: true, width: 40}
 ];
 *
 */

angular.module('core').directive('mydataGrid', function ($http, $rootScope) {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/modules/core/views/template/my-data-grid.html',
        //template: gridTemplate,
        scope      : {
            columnCollection: '=columns',
            dataCollection: '=rows',
            myCode    : '=',
            title : '=',
            pageSize: '='
         },
        controller: ['$scope', '$filter', '$rootScope', function($scope, $filter, $rootScope) {
            var tableStateRef;

            $scope.displayedCollection = [];

            $scope.exportExcel = function()
            {
                var filtered = tableStateRef.search.predicateObject ? $filter('filter')( $scope.dataCollection, tableStateRef.search.predicateObject) :  $scope.dataCollection;

                if (tableStateRef.sort.predicate) {
                    filtered = $filter('orderBy') (filtered, tableStateRef.sort.predicate, tableStateRef.sort.reverse);
                }

                var exportData  = getGridDataList(filtered,true);
                return jsonToExcelConverter(exportData, $scope.title,true);
            };

            $scope.exportPdf = function()
            {
                var filtered = tableStateRef.search.predicateObject ? $filter('filter')( $scope.dataCollection, tableStateRef.search.predicateObject) :  $scope.dataCollection;

                if (tableStateRef.sort.predicate) {
                    filtered = $filter('orderBy') (filtered, tableStateRef.sort.predicate, tableStateRef.sort.reverse);
                }

                var exportData  = getGridDataList(filtered,true);
                return jsonToPdfConverter(exportData, $scope.title,true);
            };


            $scope.callData= function callData(tableState)
            {
                tableStateRef = tableState;

                if (!$scope.dataCollection || !tableStateRef) {
                    return
                }

                //columns
                if (!$scope.columnCollection) {
                    if ($scope.dataCollection && $scope.dataCollection.length > 0) {
                        var _col_defs = [], _firstRow = $scope.dataCollection[0];
                        for (var idx in _firstRow) {
                            _col_defs.push({
                                field: idx
                            });
                        }
                        $scope.colDefinitions = _col_defs;
                    }
                } else {
                    $scope.colDefinitions = $scope.columnCollection;
                }

                var pagination = tableState.pagination;

                var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
                var number = pagination.number || 10;  // Number of entries showed per page.

                var filtered = tableState.search.predicateObject ? $filter('filter')( $scope.dataCollection, tableState.search.predicateObject) :  $scope.dataCollection;

                if (tableState.sort.predicate) {
                    filtered = $filter('orderBy') (filtered, tableState.sort.predicate, tableState.sort.reverse);
                }

                tableState.pagination.numberOfPages =  Math.ceil(Object.keys(filtered).length / number);
                filtered = filtered.slice(start, start + number);
                $scope.displayedCollection = getGridDataList(filtered,false);

            };

            $scope.$watch('dataCollection', onTableDataChange, true);

            function onTableDataChange()
            {
                if(tableStateRef !=null){
                    tableStateRef.pagination.start = 1;
                    $scope.callData(tableStateRef);
                }
                return true;
            };

            function getGridDataList(rowCollection, keyLabel)
            {
                var exportDataList = [];

                if(rowCollection != null)
                {
                    angular.forEach(rowCollection, function(row, rowkey) {
                        var a = {};
                        angular.forEach($scope.colDefinitions, function(col, colkey) {
                            var key = keyLabel == true ? col.displayName || col.field : col.field;
                            var value = row[col.field];

                            if(value != null){
                                if (col.type === 'number') {
                                    a[key] = ""+  $filter('number')(value)
                                }
                                else if (col.type ===  'boolean') {
                                    a[key] = ""+ value ? 'TRUE' : 'FALSE';
                                }
                                else if (col.type === 'date') {
                                    a[key] = ""+ $filter('date')(value, "yyyy/MM/dd HH:mm:ss");
                                }
                                else {
                                    a[key] = ""+value;
                                }
                            } else {
                                a[key] = null;
                            }

                        });
                        exportDataList.push(a);
                    })
                }
                return exportDataList;
            };

        }],
        link:  function ($scope, element, attrs, ctrl) {

            if(!$scope.pageSize){
                $scope.pageSize = 10;
            }

            if (attrs.myCode) {
                $http.get('/api/v1/dataTable/'+attrs.myCode).success(function (result) {
                    $scope.colDefs = result.cols;
                    $scope.gridData = result.data;
                });
            }


        }
    };
});



/* Smart table directives */
angular.module('core').directive('csSelect', function () {
    return {
        require: '^stTable',
        template: '<input type="checkbox"/>',
        scope: {
            row: '=csSelect'
        },
        link: function (scope, element, attr, ctrl) {

            element.bind('change', function (evt) {
                scope.$apply(function () {
                    ctrl.select(scope.row, 'multiple');
                });
            });

            scope.$watch('row.isSelected', function (newValue, oldValue) {
                if (newValue === true) {
                    element.parent().addClass('st-selected');
                } else {
                    element.parent().removeClass('st-selected');
                }
            });



        }
    };
});

angular.module('core').directive('stWidth',function(){
    return {
        link:function(scope, element, attr){
            var width=+(attr.stWidth);

            if(width > 0)
            element.css('width',width+'px');

        }
    };
});
