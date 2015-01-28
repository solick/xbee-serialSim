/**
 * Created by lynmatten on 08.01.15.
 */


var events = require('events');


/***
 * Class xbee-serialsim
 * simulates a serial line communication for xbee-api
 * @param path
 * @param options
 * @constructor
 */
var serialSim = function(path, options) {

    events.EventEmitter.call(this);
    this._open = false;
    this._path = path;
    this._options = options;

};

/**
 * prototype for eventemitter
 * @type {Object|Function|exports.EventEmitter}
 * @private
 */
serialSim.prototype.__proto__ = events.EventEmitter.prototype;


/**
 * function open(), synchron or asynchron
 * Emitts 'open' event at the end
 * @param callback
 */
serialSim.prototype.open = function(callback) {

    var self = this;

    //console.log("SerialSim opened.");

    self.emit('open');

    if(callback) { callback(); }

};

/**
 * function close(), synchron or asynchron
 * Emitts 'close' event at the end
 * @param callback
 */
serialSim.prototype.close = function(callback) {

    var self = this;

    //console.log("SerialSim closed.");

    self.emit('close');
    self.removeAllListeners();

    if(callback) { callback(); }

};

/**
 * function write(), synchron or asynchron
 * simulates writing to the serial line
 * @param data
 * @param callback
 */
serialSim.prototype.write = function(data, callback) {

    var self = this;

    /* TODO: simulate writing to serial Line
      *  receive a buffer, need to xbeeAPI.parseFrame to get JSON object
      *  check with addressed node for reaction of command
       * */

    /* write */
    //console.log("writing data: ", data);
    self.emit('receiveFrame', data);

    if(callback) {

        var err = new Error('Unknown Error while sending data: ' + data);

        callback(err);
    }

};

/**
 * function read(), synchron
 * simulates reading event from serial line
 * Emits 'receivedData' event with data from node
 * @param rawFrame
 */
serialSim.prototype.read = function(rawFrame) {

    this.emit('frame_object', rawFrame);

};


exports.SerialSim = serialSim;