'use strict';

var photonSvc = require('./particleio.js');
var server = require('../../../app');
var socket = require('./../socketservice');
var db = require('./../dbservice');
var dbcontroller = require('./../../controllers/records.controller.js');

var spark = {

    devices: function (req, res) {
        photonSvc.getDevices({}, function (result) {
            var err = {};
            var status;
            var statusCode = status || 200;
            var devices = [];
            if (result && result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    devices.push({name: result[i].name, lastApp: result[i].lastApp, lastHeard: result[i].lastHeard});
                }
            }
            res.type('application/json').send(statusCode, {metadata: {}, result: devices});
        });
    },

    callFunction: function (req, res) {
        photonSvc.callFunction({
            functionName: req.query.functionName,
            pin: req.query.pin,
            value: req.query.value
        }, function (err, data) {
            if (err) {
                res.type('application/json').send(statusCode, {metadata: {}, result: err});
            } else {
                var status;
                var statusCode = status || 200;
                res.type('application/json').send(statusCode, {metadata: {}, result: data});
            }
        });
    },

    runFunction: function (req, res) {
        photonSvc.runFunction({
            functionName: req.query.functionName,
            pin: req.query.pin,
            value: req.query.value
        }, function (err, data) {
            if (err) {
                res.type('application/json').send(statusCode, {metadata: {}, result: err});
            } else {
                var status;
                var statusCode = status || 200;
                res.type('application/json').send(statusCode, {metadata: {}, result: data});
            }
        });
    },

    eventListen: function (req, res) {
        photonSvc.eventListen({eventName: req.query.eventName}, function (err, data) {
            if (err) {
                res.type('application/json').send(statusCode, {metadata: {}, result: err});
            } else {
                var status;
                var statusCode = status || 200;

                try {
                    if (null!=data) {
                        var parsedData = JSON.parse(data.data);
                        socket.emit('weather_event', parsedData);
                        dbcontroller.createRecord(parsedData);
                    }
                } catch (e) {
                    console.log("Socket emit error: " + e);
                }
            }

        });
    }

};

function ServiceResponse(res, result, status) {
    var statusCode = status || 200;
    res.type('application/json').send(statusCode, {metadata: {}, result: devices});
}

exports.spark = spark;
