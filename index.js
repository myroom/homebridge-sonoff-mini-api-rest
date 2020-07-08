var superagent = require("superagent");
var Service, Characteristic;

module.exports = function(homebridge) {
  //console.log("homebridge API version: " + homebridge.version);

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  
  homebridge.registerAccessory("homebridge-sonoff-mini-api-rest", "Sonoff", SonoffAccessory);
}

function SonoffAccessory(log, config) {
  console.log("Sonoff Accessory Init");

  this.log = log;
  this.name = config["name"];
  this.type = config["type"];
  this.id = config["id"];
  this.url = config["url"];
  this.debug = config.debug || false;

  // old version config
  if(this.url === undefined) {
    this.url = config["uri"];
  }

  if(this.type === undefined) {
    this.type = "lightbulb";
  }

  switch (this.type) {
      case "fan":
        this.service = new Service.Fan(this.name);
        break;
      case "lightbulb":
        this.service = new Service.Lightbulb(this.name);
        break;
  }
  
  this.service
    .getCharacteristic(Characteristic.On)
    .on('get', this.getState.bind(this))
    .on('set', this.setState.bind(this)); 
}

SonoffAccessory.prototype.getState = function(callback) {
  this.log("Getting current state...");

  superagent
  .post(this.url+'/zeroconf/info')
  .send({ "deviceid": this.id, "data": { } }) // sends a JSON post body
  .set('X-API-Key', 'foobar')
  .set('accept', 'json')
  .end((error, response) => {
    if (!error && response.statusCode == 200) {
      var json = JSON.parse(response.text).data;
      var state = json.switch;

      if (this.debug)           
          this.log('getState() request returned successfully ('+response.statusCode+'). Body: '+JSON.stringify(json));

      this.log("Sonoff state is %s", state);

      var on = (state == "on") ? true : false;
      callback(null, on); 
    }
    else {
      this.log("Function getState(). Error getting state (status code %s): %s", response, error.message);
      callback(error);
    }
  });
}

  
SonoffAccessory.prototype.setState = function(state, callback) {  
  
  var SonoffState = (state == true) ? "on" : "off";
  this.log("Set state to %s", SonoffState);

  superagent
    .post(this.url+'/zeroconf/switch')
    .send({ "deviceid": this.id, "data": { "switch": SonoffState } }) // sends a JSON post body
    .set('X-API-Key', 'foobar')
    .set('accept', 'json')
    .end((error, response) => {
      if (!error && response.statusCode == 200) {
        if (this.debug)           
            this.log('setState() request returned successfully ('+response.statusCode+'). Body: '+JSON.stringify(response));
        callback(null, state);
      }
      else {
        this.log("Function setState(). Error getting state (status code %s): %s", response, error.message);
        callback(error);
      }      
    });
}

SonoffAccessory.prototype.getServices = function() {
  return [this.service];
}