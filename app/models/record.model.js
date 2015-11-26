// Invoke 'strict' JavaScript mode
'use strict';

// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
    uuid = require('node-uuid');

// Define a new 'UserSchema'
var RecordSchema = new Schema({
    _id: { type: String, default: uuid.v1()},
    windDir: String,
	windSpeedMPH: String,
	windGustDir: String,
	humidity: String,
	tempF: String,
	rainIn: String,
	pressure: String,
	created: {
		type: Date,
		// Create a default 'created' value
		default: Date.now
	}
});

// Set the 'fullname' virtual property
RecordSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	var splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

// Create the 'findOneByUsername' static method
RecordSchema.statics.findOneByUsername = function(username, callback) {
	// Use the 'findOne' method to retrieve a user document
	this.findOne({
		username: new RegExp(username, 'i')
	}, callback);
};

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
RecordSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('Record', RecordSchema);