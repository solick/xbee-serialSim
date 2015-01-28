/**
 * Created by lynmatten on 08.01.15.
 */

//var nodeList = require('./nodes.js');
var events = require('events');

var xbee_api = require('xbee-api');
var C = xbee_api.constants;
var xbeeAPI = new xbee_api.XBeeAPI();

var xbeeHelper = require('xbee-helper');
var ZigBeeHelper = new xbeeHelper.ZigBeeHelper();

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
NodeSim.prototype.start = function(callback) {

    var self = this;

    for(index = 0; index < this._nodeList.length; index++)
    {
        var timer1 = setInterval(self.raiseEvent, this._nodeList[index].LckInterval * 1000, this, this._nodeList[index].shortMac, "L");
        var timer2 = setInterval(self.raiseEvent, this._nodeList[index].DateInterval * 1000, this, this._nodeList[index].shortMac,"D");

        this._eventList.push(timer1);
        this._eventList.push(timer2);

    }
    self.emit('started');

    if(callback) { callback(); }



};

/**
 * stops simulation of netowrk traffic; removes all node specific events
 */
NodeSim.prototype.stop = function(callback) {

    var self = this;

    if(this._eventList.length == 0)
    {
        self.emit('stopped');

        if(callback) { callback(); }
        return;
    }

    for(index = 0; index < this._eventList.length; index++)
    {
        clearInterval(this._eventList[index]);

    }

    /* clear eventlist */
    this._eventList = [];
    self.emit('stopped');

    if(callback) { callback(); }


};

/**
 * emits event for node by delivereing its short mac address.
 * The parameter self is necessary because the std 'this' is in this function the object of the timer, not of the class
 * @param self
 * @param shortMac
 */
NodeSim.prototype.raiseEvent = function(self, shortMac, type) {

    var node = null;

    for (index = 0; index < self._nodeList.length; index++)
    {
        if(self._nodeList[index].shortMac === shortMac)
        {
            node = self._nodeList[index];
        }
    }

    if(node !== null)
    {
        var dataStr = "";

        if(type == 'L')
        {
            dataStr = "AT+1=OK"
        }
        else if(type == 'D')
        {
            dataStr = node.data;
        }

        var frame_obj = {
            type: C.FRAME_TYPE.ZIGBEE_RECEIVE_PACKET,
            remote16: node.shortMac,
            remote64: node.longMac,
            receiveOptions: 0x01,
            data: ZigBeeHelper.StringToByteArray(dataStr)


        };

/*
        var packet  = new Buffer([0x7E, 0x00, 0x0F, 0x90, 0x00, 0x01,
            0x3A, 0x20, 0x00, 0x00, 0x00, 0x01, 0x01, 0xA1, 0x01,
            0xA1, 0x23, 0x15, 0x97]);

        var packetEscaped = xbeeAPI.escape(packet);

*/
        self.emit('sendFrame', frame_obj);

    }
    else
    {
        throw new Error('Node for shortMac not found.');
    }


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

/**
 * returns node object for long mac address
 * @param longMac
 * @returns {*}
 */
NodeSim.prototype.getNodeForLongMac = function(longMac)
{
    for(var i = 0; i < this._nodeList.length; i++)
    {
        if(this._nodeList[i].longMac == longMac.toUpperCase())
        {
            return this._nodeList[i];
        }
    }

    return null;
}

/**
 * simulation of receiption of xbeee raw frames
 * @param data
 */
NodeSim.prototype.receiveFrame = function(data) {

    var self = this;

    //console.log("received frame by serialSim: ", data);

    var data_obj = xbeeAPI.parseFrame(data);

    //console.log('parsed frame by serialSim:', data_obj);
    console.log(ZigBeeHelper.printFrame(data_obj));

    var node = this.getNodeForLongMac(data_obj.destination64);

    if(node === undefined || node === null && data_obj.destination64.toUpperCase() !== '000000000000FFFF') /** if broadcast **/
    {
        throw new Error('Node for longmac not existing');
        return null;
    }



    switch(data_obj.type)
    {
        case C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST:


            switch(data_obj.command)
            {
                case 'MY':


                    //console.log("REMOTE_AT_COMMAND_REQUEST");

                    for(var i = 0; i < this._nodeList.length; i++) {

                        var ret_obj = { type: C.FRAME_TYPE.REMOTE_COMMAND_RESPONSE,
                            //id: 1,
                            remote64: this._nodeList[i].longMac,
                            remote16: this._nodeList[i].shortMac,
                            command: 'MY',
                            commandStatus: 1,
                            commandData: []
                        };


                        var emmiterForObject = function(ret_obj_inner) {

                            self.emit('sendFrame', ret_obj_inner);
                        };

                        setTimeout(emmiterForObject, 1000 * (i+1), ret_obj);

                    }

                    /** return to avoid double emitting **/
                    return;

                    break;
            }



            break;




        default:

            console.log('UNKNOWN_PACKET_TYPE');

            break;
    }


};


exports.NodeSim = NodeSim;


