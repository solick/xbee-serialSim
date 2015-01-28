# xbee-serialSim

Simulation of serial line communication for xbee-api framework

Development with the xbee-api (https://github.com/jankolkmeier/xbee-api) normally need usage of running physical xbee modules.

I was working on a small project to realize my own smart home system and have used xbee-api to catch the ZigBee frames from serial line, work with them and push commands back into my network.

To be more flexible i developed a simulation for the serialport module for nodejs, created by voodootikigod: https://github.com/voodootikigod/node-serialport


## configuration

The nodes will be represented by an arry of objects:

    var nodeList = [

        {
            shortMac: "01A1",
            longMac: "0013A2000000001",
            LckInterval: 20,
            DateInterval: 30,
            data: "AT+1=23.15",
            type: "Temperature Sensor"

        },
        {
            shortMac: "01A2",
            longMac: "0013A2000000002",
            LckInterval: 30,
            DateInterval: 30,
            data: "AT+1=0",
            type: "Door Contact Sensor"

        }

    ];

* ShortMac: The 16 bit short mac address
* LongMac: the 64 bit long mac address
* LckInterval: The interval in which the node shall send a lifecheck command: AT+1=OK
* DateInterval: The interval in which the node shall send the at data saved command string
* data: Command string, encoded in AT syntax
* type: Not used at the moment just to clarify what sort of sensor is simulated

This is the first version which should provide basic functionality. During my development (which is a private project) i will add more features in future releases.

## Limits of the system

To keep it simple, the simulation don´t emit raw buffer frames but JSON objects according to the syntax and structure which is used in the xbee-api.

## Using the simulation

At the test.js a simple usage is shown.

The basic usage starts at line 70 where the serialsim.open() function is called. There is either a callback or an event 'open' emitted after success.

After that, the nodeSim.start() function should be called to start the simulation.

For each node, two events will be registered, which emmits an event after the defined interval. one for the lifecheck and one for the dateinterval.

These events creates JSON objects and emmits them outside to be catched by the serialSim object. This ojbect catches the event and emmits directly in the xbee-api object the event which passes the JSON object.

Writing to the serial line simulation works similar:

The JSON object will be passed to the serialSim object function write() which emmits an event to be catched by a function. This function passes the JSON object to the nodeSim function receiveFrame() which will parse the object and reacts according to frame type, commands, values etc.


## Adjusting the code:

There are two locations within the code where the simulation should be adjusted:

1. nodes.js: Here all the information about the nodes should be changed
2. nodeSim.receiveFrame function: Here the received frames will be analysed and responses or actions will be triggered.








