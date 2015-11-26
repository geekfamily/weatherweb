'use strict';

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the module dependencies
var mongoose = require('./app/config/mongoose'),
    express = require('./app/config/express'),
    port = 3030;

// Create a new Mongoose connection instance
var db = mongoose();

// Create a new Express application instance
var app = express();

var http = require('http');
var httpServer = http.Server(app);
var io = require('socket.io')(httpServer);
var socketHelper = require('./app/services/socketservice');

httpServer.listen(port, function(){
    socketHelper.setSocket(io);
    console.log("server listening on port: ", port);
});

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;



//'use strict';
//
//// Set the 'NODE_ENV' variable
//process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//
//// Load the module dependencies
////var mongoose = require('mongoose'),
////    http = require('http'),
////    config = require('./config'),
//var mongoose = require('./app/config/mongoose'),
//    express = require('./app/config/express'),
//    port = 3030;
//
//var socketHelper = require('./app/services/socketservice');
////var db = mongoose();
//
//// Use Mongoose to connect to MongoDB
//var db = mongoose.connect(config.db);
//
//// Load the 'Record' model
////require('./app/models/record.model');
//// Load the 'Order' model
//require('./app/models/order.model');
//
//var express = require('./app/config/express');
//var app = express();
//var httpServer = http.Server(app);
//var io = require('socket.io')(httpServer);
//
//httpServer.listen(port, function(){
//    socketHelper.setSocket(io);
//    console.log("server listening on port: ", port);
//});
//
//// Use the module.exports property to expose our Express application instance for external usage
//module.exports = app;
