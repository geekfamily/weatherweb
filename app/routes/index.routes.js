// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app) {
    // Load the 'index' controller
    var index = require('../controllers/index.controller'),
        photonServices = require('../services/particle/photonservice'),
        weatherIOServices = require('../services/forecastio/weatherservice'),
        weatherServices = require('../services/dbservice');

    //services
    app.get('/api/sparkcore/devices', photonServices.spark.devices);
    app.get('/api/sparkcore/function', photonServices.spark.callFunction);
    app.get('/api/sparkcore/event', photonServices.spark.eventListen);
    app.post('/api/sparkcore/function', photonServices.spark.runFunction);
    app.get('/api/weatherio/current', weatherIOServices.weatherSvc.current);
    app.get('/api/weather/current', weatherServices.weatherSvc.current);

    // Mount the 'index' controller's 'render' method
    app.get('/', index.render);
};
