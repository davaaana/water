//<vatrps-live-chat
//  messages="vm.messages"
//  username="vm.username"
//  input-placeholder-text="Та энд бичнэ үү"
//  submit-button-text="Илгээх"
//  title="Чат"
//  theme="material"
//  submit-function="vm.sendMessage">
//</vatrps-live-chat>

(function() {
  'use strict';

  angular.module('vatrps.liveChat', ['luegg.directives']);

  angular.module('vatrps.liveChat').directive('vatrpsLiveChat', SimpleChat);

  function SimpleChat() {

    var chatTemplate =
        '<section class="chat-cont">'+
            '<header class="chat-top-bar">'+
                '<div class="left online-chat" ng-click="chat()">'+
                    '<span class="title"><i class="commm glyphicon glyphicon-comment margin-r" style="float:left;" id="chaticon"></i>Чат</span>'+
                '</div>'+
                '<div class="right">'+
                    '<span class="glyphicon glyphicon-minus c-mar-r" ng-click="hide()" title="Нуух"></span>'+
                    '<span class="glyphicon glyphicon-log-out c-mar-r" ng-click="show()" title="Гарах"></span>'+
                '</div>'+
            '</header>'+
            '<iframe width="260" height="300" scrolling="no" frameborder="0" id="user-iframe" style="background-color:#e5e5e5;"></iframe>'+
        '</section>';

    var directive = {
      restrict: 'EA',
      template: chatTemplate,
      replace: true,
      scope: {
        messages: '=',
        username: '=',
        inputPlaceholderText: '@',
        submitButtonText: '@',
        title: '@',
        theme: '@',
        submitFunction: '&'
      },
      link: link,
      controller: ChatCtrl,
      controllerAs: 'vm'
    };

    function link(scope) {
      if(!scope.inputPlaceholderText) {
        scope.inputPlaceholderText = 'Та энд бичнэ үү...';
      }

      if(!scope.submitButtonText || scope.submitButtonText === '') {
        scope.submitButtonText = 'Илгээх';
      }

      if(!scope.title) {
        scope.title = 'Чат';
      }
    }

    return directive;
  }

  ChatCtrl.$inject = ['$scope'];

  function ChatCtrl($scope) {
      var isClicked = false;
    var vm = this;
    var isHidden = false;

    vm.messages = $scope.messages;
    vm.username = $scope.username;
    vm.inputPlaceholderText = $scope.inputPlaceholderText;
    vm.submitButtonText = $scope.submitButtonText;
    vm.title = $scope.title;
    vm.theme = 'chat-th-' + $scope.theme;
    vm.writingMessage = '';
    vm.submitFunction = function() {
      $scope.submitFunction()(vm.writingMessage, vm.username);
      vm.writingMessage = '';
    };

    vm.panelStyle = {'display': 'block'};
    vm.chatButtonClass= 'glyphicon-minus icon_minim';


    vm.toggle = toggle;

      function toggle() {
          if(isHidden) {
              vm.chatButtonClass = 'glyphicon-minus icon_minim';
              vm.panelStyle = {'display': 'block'};
              isHidden = false;
          } else {
              vm.chatButtonClass = 'glyphicon-plus icon_minim';
              vm.panelStyle = {'display': 'none'};
              isHidden = true;
          }

      }

      $scope.hide = function(){
          $('.chat-cont').animate({bottom:"-305px"}, function(){
              $('.chat-cont').animate({right:"-180px"});
          });
      };

      $scope.show = function(){
          var r = confirm("Онлайн чаатыг хаах уу?");
          if (r == true) {
              $('#user-iframe').attr('src', 'http://localhost:2000/chat/logout.html');
          }
      };

      $scope.chat = function(){
          if (!isClicked){
              $('#user-iframe').attr('src', 'http://localhost:2000/chat/index.html');
              isClicked = true;
          }
          $('.chat-cont').animate({right:"0px"}, function(){
              $('.chat-cont').animate({bottom:"-5px"});
          });
      };
  }


})();
