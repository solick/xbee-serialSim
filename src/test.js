/**
 * Created by lynmatten on 08.01.15.
 */


var xbee_api = require('xbee-api');
var C = xbee_api.constants;
var xbeeAPI = new xbee_api.XBeeAPI();

var nodeList = require('./nodes.js');
var SerialSim = require('./serialSim.js');
var serialSim = new SerialSim.SerialSim(xbeeAPI, nodeList);


/** Example usage **/

/******************************************/

serialSim.open(function() {

    console.log("Event: xbee-serialsim started.");



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

        serialSim.close();


    }, 90000);


});



/**************************************************/
