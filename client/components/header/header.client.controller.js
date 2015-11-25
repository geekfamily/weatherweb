'use strict';

// Create the 'example' controller
angular.module('components').controller('HeaderController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // Get the user's 'fullName'
        $scope.isAuthenticated = Authentication.user ? true : false;
        $scope.name = Authentication.user ? Authentication.user.fullName : '';
    }
]);