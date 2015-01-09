/**
 * Created by lynmatten on 08.01.15.
 */

//var nodeList = require('./nodes.js');
var events = require('events');


/**
 * Class NodeSim
 * Simulation of nodes of a Xbee network
 * @param nodeList
 * @constructor
 */
var NodeSim = function(nodeList)
{

    events.EventEmitter.call(this);

    this._nodeList = nodeList;
    this._eventList = [];

    if(this._nodeList == null || this._nodeList === 'undefined')
    {
        throw new Error('no nodelist found.');
    }
};

/**
 *
 * @type {Object|Function|exports.EventEmitter}
 * @private
 */
NodeSim.prototype.__proto__ = events.EventEmitter.prototype;


/**
 * Starts simulation of network traffic; initialize node specific events
 */
NodeSim.prototype.start = function() {

    var self = this;

    for(index = 0; index < this._nodeList.length; index++)
    {
        var timer = setInterval(self.raiseEvent, this._nodeList[index].LckInterval * 1000, this, this._nodeList[index].shortMac);

        this._eventList.push(timer);
        if(index == this._eventList.length -1)
        {
            self.emit('started');
        }
    }



};

/**
 * stops simulation of netowrk traffic; removes all node specific events
 */
NodeSim.prototype.stop = function() {

    var self = this;

    if(this._eventList.length == 0)
    {
        self.emit('stopped');
        return;
    }

    for(index = 0; index < this._eventList.length; index++)
    {
        clearInterval(this._eventList[index]);
        if(index == this._eventList.length -1)
        {
            self.emit('stopped');
        }
    }

};

/**
 * emits event for node by delivereing its short mac address.
 * The parameter self is necessary because the std 'this' is in this function the object of the timer, not of the class
 * @param self
 * @param shortMac
 */
NodeSim.prototype.raiseEvent = function(self, shortMac) {


    console.log("event raised for " + shortMac);
    self.emit('sendFrame', shortMac);

};

/**
 * Returns the number of registered events
 * @returns {Number}
 * @constructor
 */
NodeSim.prototype.EventCounter = function() {

    return this._eventList.length;

};

/**
 * returns the complete list of simualted nodes.
 * @returns {*}
 */
NodeSim.prototype.getNodelist = function() {

    return this._nodeList;

};


exports.NodeSim = NodeSim;