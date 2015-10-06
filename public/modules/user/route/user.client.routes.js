'use strict';

// Setting up route
angular.module('user').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found

		// Home state routing
		$stateProvider.
		state('user', {
			url: '/login',
			templateUrl: 'modules/user/views/signin.html',
			controller: 'LoginController'
		});
	}
]);
