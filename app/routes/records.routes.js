'use strict';

var records = require('../controllers/records.controller.js');

// Define the routes module' method
module.exports = function(app) {
	// Set up the 'users' base routes
	app.route('/records')
	   .post(records.create)
	   .get(records.list);

	// Set up the 'users' parameterized routes
	app.route('/records/:recordId')
	   .get(records.read)
	   .put(records.update)
	   .delete(records.delete);

    app.route('/record')
        .post(records.create);

	// Set up the 'userId' parameter middleware
	app.param('orderId', records.orderByID);
};
