'use strict';

// Create the 'home' controller
angular.module('home').controller('HomeController', ['$scope', '$rootScope', 'Authentication', '$resource',
	function($scope, $rootScope, Authentication, $resource) {

		var devices = $resource('/api/sparkcore/devices');
		devices.get().$promise.then(success, fail);

		var event = $resource('/api/sparkcore/event',{eventName:'com.geekfamily.weather_update', pin:'' , value:'' });
		event.get().$promise.then(updateSuccess, updateFail);

		function success(res){
      $scope.devices = res.result || res;
    };

    function fail(res){

    };

		function updateSuccess(res){
      var motion = res.result.result || res;
      //$scope.motion = motion===1?"YES":"NO";
    };

    function updateFail(res){
      //$scope.motion = "YES";
    };
	}
]);
