/**
 * Created by lynmatten on 08.01.15.
 */


var fs = require('fs');

var xbee_api = require('xbee-api');
var C = xbee_api.constants;
var xbeeAPI = new xbee_api.XBeeAPI();


var SerialSim = require('./serialSim.js');
var serialSim = new SerialSim.SerialSim();


var events = require('events');
var eventEmitter = new events.EventEmitter();


// Something we might receive from an XBee...
var raw_frame = new Buffer([
    0x7E, 0x00, 0x13, 0x97, 0x55, 0x00, 0x13, 0xA2, 0x00, 0x40, 0x52, 0x2B,
    0xAA, 0x7D, 0x84, 0x53, 0x4C, 0x00, 0x40, 0x52, 0x2B, 0xAA, 0xF0
]);

xbeeAPI.on('data', function(data) {


    console.log("data received " + data);
});

var bla = function bla(data) {

    console.log("bla: " + data);
    xbeeAPI.emit('data',data);
};

eventEmitter.on('data', bla);


/**
 * check OS
 */

if(process.platform != "darwin")
{
    console.log("Your operating system is not supported. Sorry!");
    process.exit(1);
}


/**
 * check if serial port exists if not create
 * **/


if(fs.existsSync('/dev/tty.zigbeeVirtual1'))
{
    /**
     * Exists, proceed
     */
}
else
{
    /**
     * Don´t exists, create fifo
     */
}


serialSim.open();




eventEmitter.emit('data', raw_frame);

serialSim.write("Test Frame", function(err) {

    console.log("with callback!");
    console.log(err);

});


serialSim.close();

/**************************************************/

/*

 var serialport = new SerialPort("/dev/tty.zbtest1", {
 baudrate: 57600

 });

 serialport.on("open", function() {

 console.log("Serial Port opened.");

 });

 */
