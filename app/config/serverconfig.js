var nconf = require('nconf');

nconf.file('default', './config.json');

exports.get = function(str) {
  var value = nconf.get(str);
  if ("undefined" === typeof value) {
    return nconf.get(str);
  }
  else{
    return value;
  }
};
