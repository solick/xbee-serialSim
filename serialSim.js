/**
 * Created by lynmatten on 08.01.15.
 */


var events = require('events');

var serialSim = function() {

    events.EventEmitter.call(this);


};

serialSim.prototype.__proto__ = events.EventEmitter.prototype;


serialSim.prototype.open = function(callback) {

    var self = this;

    console.log("SerialSim opened.");

    self.emit('open');

    if(callback) { callback(); }

};

serialSim.prototype.close = function(callback) {

    var self = this;

    console.log("SerialSim closed.");

    self.emit('close');
    self.removeAllListeners();

    if(callback) { callback(); }

};

serialSim.prototype.write = function(data, callback) {

    //var self = this;

    /* write */
    console.log("writing data: " + data);

    if(callback) {

        var err = new Error('Unknown Error while sending data: ' + data);

        callback(err);
    }

};


exports.SerialSim = serialSim;