'use strict';

// Setting up route
angular.module('admin').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider) {
		// Admin state routing
		$stateProvider.
		state('admin', {
			url: '/admin',
            abstract: true,
			templateUrl: 'modules/admin/views/index.html',
            controller: 'DashboardController'
		}).
        state('admin.dashboard', {
            url: '',
            templateUrl: 'modules/admin/views/dashboard.html'
        }).
        state('admin.user', {
            url: '/user',
            templateUrl: 'modules/admin/views/user.html',
            controller:'UserController'
        }).
            state('admin.content', {
                url: '/content',
                templateUrl: 'modules/admin/views/content.html',
                controller:'ContentController'
            });
	}
]);
