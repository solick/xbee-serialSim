/**
 * Created by lynmatten on 08.01.15.
 */

var nodeList = require('./nodes.js');
var events = require('events');

var NodeSim = function()
{

    events.EventEmitter.call(this);

    this._nodeList = nodeList;
    this._eventList = [];

    /* initialize nodes and set timer */

    for(index = 0; index < this._nodeList.length; index++)
    {
        console.log("node: " + this._nodeList[index].shortMac);
    }

};

NodeSim.prototype.__proto__ = events.EventEmitter.prototype;

NodeSim.prototype.start = function() {

    var self = this;

    for(index = 0; index < this._nodeList.length; index++)
    {
        var timer = setInterval(self.raiseEvent, this._nodeList[index].LckInterval * 1000, this._nodeList[index].shortMac);

        this._eventList.push(timer);
    }



};

NodeSim.prototype.stop = function() {

    //var self = this;

    for(index = 0; index < this._eventList.length; index++)
    {
        clearInterval(this._eventList[index]);
    }

};

NodeSim.prototype.raiseEvent = function(shortMac) {

    console.log("event raised for " + shortMac);

};

exports.nodeSim = NodeSim;