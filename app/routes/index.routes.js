// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function(app) {
	// Load the 'index' controller
	var index = require('../controllers/index.controller');
	var services = require('../api/sparkcore/spark');

	//services
  app.get('/api/sparkcore/devices', services.spark.devices);
  app.get('/api/sparkcore/function', services.spark.callFunction);
  app.get('/api/sparkcore/event', services.spark.eventListen);
  app.post('/api/sparkcore/function', services.spark.runFunction);

	// Mount the 'index' controller's 'render' method
	app.get('/', index.render);
};
