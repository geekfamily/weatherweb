// Invoke 'strict' JavaScript mode
'use strict';

// Set the main application name
var mainApplicationModuleName = 'myapp';

// Create the main application
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ui.router', 'home', 'components', 'users', 'ngResource', 'ngMaterial']);
mainApplicationModule.config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
	function($stateProvider, $urlRouterProvider, $mdThemingProvider){

		// For any unmatched url, send to /home
		$urlRouterProvider.otherwise("/home");

		$stateProvider
			.state('home', {
				url: "/home",
				templateUrl: "home/views/home.client.view.html",
				controller: "HomeController"
			})

        $mdThemingProvider.theme("default").primaryPalette("blue").accentPalette("green");

	}]);
mainApplicationModule.factory('socket', ['$rootScope', function ($rootScope) {
    var socket = io.connect('http://localhost:3030', {reconnect: true});
    console.log("socket created");

    return {
        on: function (eventName, callback) {
            function wrapper() {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            }

            socket.on(eventName, wrapper);

            return function () {
                socket.removeListener(eventName, wrapper);
            };
        },

        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
}]);

// Fix Facebook's OAuth bug
//if (window.location.hash === '#_=_') window.location.hash = '#!';

// Manually bootstrap the AngularJS application
//angular.element(document).ready(function() {
//	angular.bootstrap(document, [mainApplicationModuleName]);
//});
