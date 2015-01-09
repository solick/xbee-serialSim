/**
 * Created by lynmatten on 09.01.15.
 */


var NodeSim = require('../../src/nodeSim.js');

var nodeList = [

    {
        shortMac: "01A1",
        longMac: "0013A2000000001",
        LckInterval: 3,
        data: "AT+1=23.15",
        type: "Temperature Sensor"

    },
    {
        shortMac: "01A2",
        longMac: "0013A2000000002",
        LckInterval: 8,
        data: "AT+1=0",
        type: "Door Contact Sensor"

    }

];


describe('nodeSim Class', function() {

    var nodeSim = new NodeSim.NodeSim(nodeList);

    it('should create a valid object', function() {

        expect(nodeSim).toBeDefined();
        expect(nodeSim).not.toBeNull();
    });

    describe('API', function() {



        describe('start() function', function() {

            var nodeSimTest = null;

            beforeEach(function() {

                nodeSimTest = new NodeSim.NodeSim(nodeList);

            });

            it('should be implemented', function() {

                expect(nodeSimTest.start).toBeDefined();

            });

            it('shoud throw started event after call start()', function(done) {

                nodeSimTest.on('started', function() {

                    expect(true).toBeTruthy();
                    done();
                    nodeSimTest.stop();
                });

                nodeSimTest.start();

            });




        });

        describe('stop() function', function() {

            var nodeSimTest = null;

            beforeEach(function() {

                nodeSimTest = new NodeSim.NodeSim(nodeList);

            });

            it('should be implemented', function() {

                expect(nodeSimTest.stop).toBeDefined();

            });


            it('should throw stopped event after fall stop()', function(done) {

                nodeSimTest.on('stopped', function() {

                    expect(true).toBeTruthy();
                    done();
                });

                nodeSimTest.stop();


            });


        });

        describe('EventCounter() function', function(){

            var nodeSimTest = null;

            beforeEach(function() {

                nodeSimTest = new NodeSim.NodeSim(nodeList);

            });

            it('should be implemented', function() {

                expect(nodeSimTest.EventCounter).toBeDefined();

            });

            it('should have initial 0 events listed', function() {

                expect(nodeSimTest.EventCounter()).toBe(0);

            });

        } );


        describe('getNodelist() function', function() {

            var nodeSimTest = null;

            beforeEach(function() {

                nodeSimTest = new NodeSim.NodeSim(nodeList);

            });

            it('should be implemented', function() {

                expect(nodeSimTest.getNodelist).toBeDefined();

            });

            it('should return the delivered nodelist', function() {

                expect(nodeSimTest.getNodelist()).toBe(nodeList);

            });

        });



    });


});