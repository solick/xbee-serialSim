/**
 * Created by lynmatten on 08.01.15.
 */

//var nodeList = require('./nodes.js');
var events = require('events');

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

NodeSim.prototype.__proto__ = events.EventEmitter.prototype;

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

NodeSim.prototype.raiseEvent = function(self, shortMac) {


    console.log("event raised for " + shortMac);
    self.emit('sendFrame', shortMac);

};

NodeSim.prototype.EventCounter = function() {

    return this._eventList.length;

};

exports.NodeSim = NodeSim;