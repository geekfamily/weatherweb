// Invoke 'strict' JavaScript mode
'use strict';

// Set the main application name
var mainApplicationModuleName = 'myapp';

// Create the main application
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ui.router', 'home', 'components', 'users', 'ngResource']);
mainApplicationModule.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){

		// For any unmatched url, send to /home
		$urlRouterProvider.otherwise("/home");

		$stateProvider
			.state('home', {
				url: "/home",
				templateUrl: "home/views/home.client.view.html",
				controller: "HomeController"
			})
	}]);


// Fix Facebook's OAuth bug
//if (window.location.hash === '#_=_') window.location.hash = '#!';

// Manually bootstrap the AngularJS application
//angular.element(document).ready(function() {
//	angular.bootstrap(document, [mainApplicationModuleName]);
//});
