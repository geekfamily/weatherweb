var Forecast = require('forecast'),
    conf = require('../../config/serverconfig');

exports.getForecast = new Forecast({
    service: 'forecast.io',
    key: conf.get('forecastio'),
    units: 'faren', // Only the first letter is parsed
    cache: true,      // Cache API requests?
    ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
        minutes: 29,
        seconds: 59
    }
});