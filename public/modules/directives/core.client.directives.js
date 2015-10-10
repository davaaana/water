'use strict';

angular.module('admin').
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
angular.module('admin').directive('fileUpload', function () {
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
 * $rootScope.notifyMessage = {message: 'Таны хүсэлт амжилттай илгээгдлээ.',type: 1};
 * message: '' - notification дээр гарах үг
 * type: 1 - Амжилттай болсон үед ногооноор гарах
 * type: 2 - Амжилтгүй болсон үед улаанаар гарах
 *
 */

angular.module('admin').directive('notif', function ($rootScope) {
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
