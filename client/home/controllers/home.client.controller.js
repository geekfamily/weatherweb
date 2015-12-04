'use strict';

// Create the 'home' controller
angular.module('home').controller('HomeController', ['$scope', '$rootScope', 'Authentication', '$resource', 'socket', '$http',
    function ($scope, $rootScope, Authentication, $resource, socket, $http) {

        $scope.midPointTemp = 50;

        //configure chart visual options
        var options = {
            colors: ['#ff9800', '#4caf50', "#2196f3"],
            lineWidth: 2,
            hAxis: {
                minValue: 0,
                gridlines: { count: 5 }
            },
            vAxis: {
                gridlines: { count: 5 }
            },
            curveType: 'function',
            legend: { position: 'bottom' },
            animation:{
                duration: 1000,
                easing: 'out'
            },
            title: 'Temperature vs Wind Speed vs Humidity'
        };

        //configure the line chart
        var chart = new google.charts.Line(document.getElementById('chartdiv'));
        //drawChart([]);
        //configure default object values
        $scope.weatherObj = {windDir: 0,
                                windspeedmph: 0,
                                windgustdir: 0,
                                humidity: 0,
                                tempf: 0,
                                barotemp: 0,
                                rainin: 0,
                                pressure: 0,
                                heatindex: 0};
        $scope.summary = "NA";
        $scope.icon = "/img/weather/Sun.svg";

        //verify we can connect to a photon device
        var devices = $resource('/api/sparkcore/devices');
        devices.get().$promise.then(success, fail);

        //configure the eventing process for continous updates
        var event = $resource('/api/sparkcore/event', {eventName: 'com.geekfamily.weather_update'});
        event.get().$promise.then(updateSuccess, updateFail);

        //make the view configuraiton calls
        var current = $resource('/api/weatherio/current');
        current.get().$promise.then(weatherioSuccess, weatherioFail);

        var current = $resource('/api/weather/current');
        current.get().$promise.then(weatherSuccess, weatherFail);

        //call the db data for the history chart... needs to be reworked
        $http.get('/records').
            then(function(response) {
                if (response.status = 200){
                    drawChart(response.data);
                }
                response.toString();
            }, function(response) {
                response.toString();

        });

        function drawChart(dataSet){
            chart.draw(buildDataSet(dataSet), google.charts.Line.convertOptions(options));
        }

        //build the dataset to be displayed
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


        socket.on("weather_event", function(data){
            $scope.weatherObj = data;
        });

        function success(data) {
            $scope.devices = data.result || data;
        };

        function fail(res) {

        };

        function updateSuccess(data) {
            data.result;
        };

        function updateFail(res) {
            res.result;
        };

        function weatherSuccess(data) {
            $scope.weatherObj = data;
        }

        function weatherFail(res) {
            res.result;
        };

        function weatherioSuccess(res) {
            var state = res.result;
            $scope.summary = state.summary;
            switch(state.icon){
                case 'clear-night':
                    $scope.icon = "/img/weather/Moon.svg";
                    break;
                case 'rain':
                    $scope.icon = "/img/weather/Cloud-Rain.svg";
                    break;
                case 'snow':
                    $scope.icon = "/img/weather/Snowflake.svg";
                    break;
                case'sleet':
                    $scope.icon = "/img/weather/Cloud-Snow.svg";
                    break;
                case 'wind':
                    $scope.icon = "/img/weather/Cloud-Wind.svg";
                    break;
                case 'fog':
                    $scope.icon = "/img/weather/Cloud-Fog.svg";
                    break;
                case 'cloudy':
                    $scope.icon = "/img/weather/Cloud.svg";
                    break;
                case 'partly-cloudy-day':
                    $scope.icon = "/img/weather/Cloud-Sun.svg";
                    break;
                case 'partly-cloudy-night':
                    $scope.icon = "/img/weather/Cloud-Moon.svg";
                    break;
                case 'hail':
                    $scope.icon = "/img/weather/Cloud-Hail.svg";
                    break;
                case 'thunderstorm':
                    $scope.icon = "/img/weather/Degrees-Fahrenheit.svg";
                    break;
                case 'tornado':
                    $scope.icon = "/img/weather/Tornado.svg";
                    break;
                default:
                    //clear day
                    $scope.icon = "/img/weather/Sun.svg";
            }

        };

        function weatherioFail(res) {
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
