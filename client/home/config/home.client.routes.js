'use strict';

// Configure the 'example' module routes
var myapp = angular.module('myapp', ["ui.router"])
myapp.config(['$stateProvider', '$urlRouterProvider'],
    function($stateProvider, $urlRouterProvider){

    // For any unmatched url, send to /home
    $urlRouterProvider.otherwise("/")

    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "home/views/home.client.view.html",
            controller: "HomeController"
        })
});
