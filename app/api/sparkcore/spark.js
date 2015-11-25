'use strict';

var controller = require('./services.controller.js');
var server = require('../../../app');
//var socket = require('./../../services/socketservice');

var spark = {

  devices: function (req, res) {
    controller.getDevices({}, function(result){
      var err = {};
      var status;
      var statusCode = status || 200;
      var devices = [];
      if (result && result.length>0){
        for (var i=0;i<result.length;i++){
          devices.push({name: result[i].name, lastApp: result[i].lastApp, lastHeard: result[i].lastHeard});
        }
      }
      res.type('application/json').send(statusCode, {metadata: {}, result:devices});
    });
  },

  callFunction: function (req, res) {
    controller.callFunction({functionName:req.query.functionName, pin:req.query.pin, value:req.query.value}, function(err, data){
      if (err){
        res.type('application/json').send(statusCode, {metadata: {}, result:err});
      } else {
        var status;
        var statusCode = status || 200;
        res.type('application/json').send(statusCode, {metadata: {}, result:data});
      }
    });
  },

  runFunction: function (req, res) {
    controller.runFunction({functionName:req.query.functionName, pin:req.query.pin, value:req.query.value}, function(err, data){
      if (err){
        res.type('application/json').send(statusCode, {metadata: {}, result:err});
      } else {
        var status;
        var statusCode = status || 200;
        res.type('application/json').send(statusCode, {metadata: {}, result:data});
      }
    });
  },

  eventListen: function (req, res) {
    controller.eventListen({eventName:req.query.eventName}, function(err, data){
      if (err){
        res.type('application/json').send(statusCode, {metadata: {}, result:err});
      } else {
        var status;
        var statusCode = status || 200;

        try {
          data = data.substring(data.indexOf("{"));
          var parsedData = JSON.parse(data).data;
          //socket.emit('motion_event', parsedData);
        } catch (e) {
          console.log("not JSON");
        }
      }

    });
  }

};

function ServiceResponse(res, result, status){
  var statusCode = status || 200;
  res.type('application/json').send(statusCode, {metadata: {}, result:devices});
}

exports.spark = spark;
