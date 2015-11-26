'use strict';

// Create the 'home' controller
angular.module('home').controller('HomeController', ['$scope', '$rootScope', 'Authentication', '$resource', 'socket',
    function ($scope, $rootScope, Authentication, $resource, socket) {

        $scope.weatherObj = {};

        var devices = $resource('/api/sparkcore/devices');
        devices.get().$promise.then(success, fail);

        var event = $resource('/api/sparkcore/event', {eventName: 'com.geekfamily.weather_update'});
        event.get().$promise.then(updateSuccess, updateFail);

        socket.on("weather_event", function(msg){
            $scope.weatherObj = msg;
        });

        socket.on("socket_status", function(msg){
            msg;
        });

        function success(res) {
            $scope.devices = res.result || res;
        };

        function fail(res) {

        };

        function updateSuccess(res) {
            var motion = res.result.result || res;
            //$scope.motion = motion===1?"YES":"NO";
        };

        function updateFail(res) {
            res.result;
            //$scope.motion = "YES";
        };
    }
]);
