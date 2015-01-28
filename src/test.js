/**
 * Created by lynmatten on 08.01.15.
 */


var xbee_api = require('xbee-api');
var C = xbee_api.constants;
var xbeeAPI = new xbee_api.XBeeAPI();
var zbh = require('xbee-helper');
var helper = new zbh.ZigBeeHelper();

var SerialSim = require('./serialSim.js');
var serialSim = new SerialSim.SerialSim();

var nodeList = require('./nodes.js');
var NodeSim = require('./nodeSim.js');
var nodeSim = new NodeSim.NodeSim(nodeList);


xbeeAPI.on('data', function(data) {
    //console.log(">> data received: ", data);
});

// All frames parsed by the XBee will be emitted here
xbeeAPI.on("frame_object", function(frame) {
    //console.log(">> frame received by xbeeAPI: ", frame);
    console.log(helper.printFrame(frame));
});

var emitXbee = function (data) {

    xbeeAPI.emit('data',data);
    xbeeAPI.emit('frame_object', data);
};


var displayStart = function() {

    console.log("Event: nodeSim started. -- " + nodeSim.EventCounter() + " Events.");

};

var displayOpen = function() {

    console.log("Event: xbee-serialsim started.");
};


nodeSim.on('sendFrame', function(rawFrame) {

    serialSim.read(rawFrame);

});

var passFrameToNodeSim = function(data) {

    nodeSim.receiveFrame(data);
};

nodeSim.on('started', displayStart);
serialSim.on('open', displayOpen);

serialSim.on('frame_object', emitXbee);

serialSim.on('receiveFrame', passFrameToNodeSim);


/******************************************/

serialSim.open(function() {

    console.log("Event: xbee-serialsim started.");

    nodeSim.start(function() {

        console.log("Event: nodeSim started. -- " + nodeSim.EventCounter() + " Events.");

    });

    setTimeout(function() {

        var frame_obj = { // AT Request to be sent to
            type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
            id: 0x01,
            //destinantion64:"0013A20040ADD0D3",
            //destination64:"0013A200FFFFFFFF",
            //destination16: "0x00",
            remoteCommandOptions: 0x02,
            command: "MY",
            commandParameter: [0x01]
        };



        serialSim.write(xbeeAPI.buildFrame(frame_obj));

    }, 500);

    setTimeout(function() {
        nodeSim.stop(function() {
            serialSim.close();
        });


    }, 90000);


});




/**************************************************/
