/**
 * Created by lynmatten on 08.01.15.
 */



var nodeList = [

    {
        shortMac: "01A1",
        longMac: "0013A20000000001",
        LckInterval: 20,
        DateInterval: 30,
        data: "AT+3=23.15",
        type: "Temperature Sensor"

    },
    {
        shortMac: "01A2",
        longMac: "0013A20000000002",
        LckInterval: 30,
        DateInterval: 30,
        data: "AT+5=0",
        type: "Door Contact Sensor"

    }

];


module.exports = nodeList;