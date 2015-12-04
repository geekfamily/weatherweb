// Invoke 'strict' JavaScript mode
'use strict';

var Record = require('mongoose').model('Record');

// Create a new 'create' controller method
exports.create = function (req, res, next) {
    // Create a new instance of the 'User' Mongoose model
    var record = new Record(req.body);

    // Use the 'User' instance's 'save' method to save a new user document
    record.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(record);
        }
    });
};

exports.createRecord = function (data) {
    var record = new Record(data);
    record.save(function (err) {
        if (err) {
            throw err;
        } else {
            return data;
        }
    });
}

exports.dayList = function(req,res) {
    var q = Record.find().sort({'created':-1}).limit(288);
    q.exec(function(err, data){
        if (err){
            throw err;
        } else {
            res.json(data);
        }
    });
}

