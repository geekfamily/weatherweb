'use strict';

var records = require('../controllers/records.controller.js');

// Define the routes module' method
module.exports = function(app) {
	// Set up the 'records' base routes
	app.route('/records')
	   		.post(records.create)
	   		.get(records.dayList);


};
