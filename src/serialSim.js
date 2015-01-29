/**
 * Created by lynmatten on 08.01.15.
 */


var NodeSim = require('./nodeSim.js');

var zbh = require('xbee-helper');
var helper = new zbh.ZigBeeHelper();


var events = require('events');


/***
 * Class xbee-serialsim
 * simulates a serial line communication for xbee-api
 * @param path
 * @param xbeeObj
 * @constructor
 */
var serialSim = function(xbeeObj, nodeList) {

    var self = this;

    events.EventEmitter.call(this);
    this._open = false;
    this._nodeList = nodeList;
    this._xbeeObj = xbeeObj;

    if(xbeeObj == undefined || xbeeObj == null)
    {
        throw new Error("No instance of xbee-api found.");
    }

    this._nodeSim = new NodeSim.NodeSim(this._nodeList);


    /**********/

    this._xbeeObj.on('data', function(data) {
        //console.log(">> data received: ", data);
    });

// All frames parsed by the XBee will be emitted here
    this._xbeeObj.on("frame_object", function(frame) {
        //console.log(">> frame received by xbeeAPI: ", frame);
        console.log(helper.printFrame(frame));
    });

    var emitXbee = function (data) {

        this._xbeeObj.emit('data',data);
        this._xbeeObj.emit('frame_object', data);
    };


    var displayStart = function() {

        console.log("Event: nodeSim started. -- " + self._nodeSim.EventCounter() + " Events.");

    };

    var displayOpen = function() {

        console.log("Event: xbee-serialsim started.");
    };


    this._nodeSim.on('sendFrame', function(rawFrame) {

        self.read(rawFrame);

    });

    var passFrameToNodeSim = function(data) {

        self._nodeSim.receiveFrame(data);
    };

    this._nodeSim.on('started', displayStart);
    this.on('open', displayOpen);

    this.on('frame_object', emitXbee);

    this.on('receiveFrame', passFrameToNodeSim);

    /*********/


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

    this._nodeSim.start(function() {

        console.log("Event: nodeSim started. -- " + self._nodeSim.EventCounter() + " Events.");

    });

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

    this._nodeSim.stop(function() {
        self.emit('close');
        self.removeAllListeners();

        if(callback) { callback(); }
    });



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