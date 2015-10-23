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
            templateUrl: 'modules/core/views/home.html',
			controller:'HomeController'
        }).
			state('home.news', {
				url: '/news',
				templateUrl: 'modules/core/views/news.html',
				controller:'NewsController'
			}).
			state('home.law', {
				url: '/law',
				templateUrl: 'modules/core/views/law.html',
				controller:'LawController'
			}).
			state('home.project', {
				url: '/project',
				templateUrl: 'modules/core/views/law.html',
				controller:'ProjectController'
			}).
			state('home.about', {
				url: '/about',
				templateUrl: 'modules/core/views/about.html',
				controller:'AboutController'
			}).
			state('home.contact', {
				url: '/contact',
				templateUrl: 'modules/core/views/contact.html',
				controller:'ContactController'
			}).
			state('home.more', {
				url: '/more',
				templateUrl: 'modules/core/views/more.html',
				controller:'MoreController'
			});
	}
]);
