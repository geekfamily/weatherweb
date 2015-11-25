'use strict';

var request = require('request'),
  _ = require('lodash'),
  q = require('q'),
  extend = require('extend'),
  conf = require('../../config/serverconfig'),
  EventSource = require('eventsource'),
  spark = require('spark');

function login(){
  return spark.login({ username: conf.get('username'), password: conf.get('password') });
}

exports.getDevices = function (options, done) {
  login().then(
    function(token){
      // If login is successful we get and accessToken,
      // we'll use that to call Spark API ListDevices

      var devicesPr = spark.listDevices();

      devicesPr.then(
        // We get an array with devices back and return that to the calling function
        function(devices){
          return done(devices);
        },
        function(err) {
          console.log('API call List Devices completed on promise fail: ', err);
          return err;
        }
      );

    },
    function(err) {
      console.log('API call completed on promise fail: ', err);
    }
  );
}

//variables
exports.callFunction = function (options, done) {
  login().then(
    function(token){
      spark.getVariable(conf.get('deviceId'), options.functionName, done);
    }
  );
}

//functions
exports.runFunction = function (options, done) {
  login().then(
    function(token){
      spark.callFunction(conf.get('deviceId'), options.functionName, options.pin+':'+options.value, done);
    }
  );
}

exports.eventListen = function (options, done) {
//  var url = conf.get('serviceUrl') + '/devices/'+conf.get('deviceId')+'/events/?access_token='+conf.get('accessToken');

  login().then(
    function(token){
      spark.getEventStream(options.eventName, conf.get('deviceId'), function(data) {
          return done("",data);
      });
    }
  );



//  var es = new EventSource(url);
//  console.log("Listening on:"+url);
//  es.addEventListener(options.eventName, function(e){
//    console.log( JSON.parse(e.data) );
//  }, false);

//  var es = new EventSource(url);
//
//// Only fires for Spark URL
//  es.addEventListener('MotionSensor', function(e){
//    $rootScope.$broadcast('motion_event', JSON.parse(e.data));
//    socket.emit('motion_event', JSON.parse(e.data));
//    console.log( 'listener: ', JSON.parse(e.data));
//  }, false);
//
//// Only fires for Test URL
//  es.onmessage = function(e){
//    console.log( 'onmessage: ', e.data);
//  };
//
//  es.onerror = function(){
//    console.log('ES Error');
//  };


  return;//makeRequest(_.merge({}, options, {path: '/devices/'+conf.get('deviceId')+'/events/'+options.eventName+'?access_token='+conf.get('accessToken')}), done);
}

/**
 * public interfaces
 */
//extend(module.exports, services);