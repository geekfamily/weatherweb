'use strict';

// Create the 'home' controller
angular.module('home').controller('HomeController', ['$scope', '$rootScope', 'Authentication', '$resource', 'socket', '$http',
    function ($scope, $rootScope, Authentication, $resource, socket, $http) {

        // Load the Visualization API and the piechart package.
        //google.load('visualization', '1.0', {'packages':['corechart']});
        var options = {
            colors: ['#ff9800', '#009688', "#ffc107"],
            lineWidth: 2,
            height: 400,
            hAxis: {
                minValue: 0
            },
            vAxis: {
                gridlines: { count: 5 }
            },
            curveType: 'function',
            legend: { position: 'bottom' }
        };

        var chart = new google.charts.Line(document.getElementById('chartdiv'));

        $scope.weatherObj = {};
        $scope.results = [];

        var devices = $resource('/api/sparkcore/devices');
        devices.get().$promise.then(success, fail);

        var event = $resource('/api/sparkcore/event', {eventName: 'com.geekfamily.weather_update'});
        event.get().$promise.then(updateSuccess, updateFail);

        $http.get('/records').
        then(function(response) {
            if (response.status = 200){
                $scope.results = response.data;
                //chart.draw(buildDataSet(response.data), google.charts.Line.convertOptions(options));
                chart.draw(buildDataSet(response.data), options);
            }
            response.toString();
        }, function(response) {
            response.toString();

        });

        function buildDataSet(dataSet) {
            var data = new google.visualization.DataTable();
            data.addColumn('datetime', 'Time');
            data.addColumn('number', 'Temperature (F)');
            data.addColumn('number', 'Wind Speed (MPH)');
            data.addColumn('number', 'Humidity (%)');

            for (var idx=0;idx<dataSet.length;idx++){
                data.addRows([[new Date(dataSet[idx].created),dataSet[idx].tempf,dataSet[idx].windspeedmph,dataSet[idx].humidity]]);
            }

            var formatter_medium = new google.visualization.DateFormat({formatType: 'medium'});
            formatter_medium.format(data,1);

            return data;
        }

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
            res.result;
        };

        function updateFail(res) {
            res.result;
        };

        $scope.getWindDirection = function(){
            switch ($scope.weatherObj.winddir)
            {
                case 0:
                    return "N";
                    break;
                case 1:
                    return "NE";
                    break;
                case 2:
                    return "E";
                    break;
                case 3:
                    return "SE";
                    break;
                case 4:
                    return "S";
                    break;
                case 5:
                    return "SW";
                    break;
                case 6:
                    return "W";
                    break;
                case 7:
                    return "NW";
                    break;
                default:
                    return "NA";
            }
        }

    }
]);
