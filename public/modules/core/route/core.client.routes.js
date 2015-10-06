'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found

		$urlRouterProvider.otherwise('/index');


		// Home state routing
		$stateProvider.
		state('home', {
			url: '/index',
            abstract: true,
			templateUrl: 'modules/core/views/index.html',
			controller: 'CoreController'
		}).
        state('home.index', {
            url: '',
            templateUrl: 'modules/core/views/home.html'
        });
	}
]);
