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

    var nodeSimTest = null;

    beforeEach(function() {

        nodeSimTest = new NodeSim.NodeSim(nodeList);

    });

    afterEach(function() {

        nodeSimTest.stop();

    });


    it('should create a valid object', function() {

        expect(nodeSimTest).toBeDefined();
        expect(nodeSimTest).not.toBeNull();
    });

    describe('API', function() {



        describe('start() function', function() {


            it('should be implemented', function() {

                expect(nodeSimTest.start).toBeDefined();

            });

            it('should throw started event after call start()', function(done) {

                nodeSimTest.on('started', function() {

                    expect(true).toBeTruthy();
                    done();
                    nodeSimTest.stop();
                });

                nodeSimTest.start();

            });

            it('should use the callback method if used', function(done) {

                nodeSimTest.start(function() {

                    expect(true).toBeTruthy();
                    done();
                });

            });

            it('should have 2 events listed after initialization', function(done) {

                nodeSimTest.on('started', function() {
                    expect(nodeSimTest.EventCounter()).toBe(2);
                    done();
                    //nodeSimTest.stop();
                });

                nodeSimTest.start();

            });




        });

        describe('stop() function', function() {


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

            it('should use the callback method if used', function(done) {

                nodeSimTest.stop(function() {

                    expect(true).toBeTruthy();
                    done();
                });

            });


            it('should have 0 Events listed after stopping', function(done) {



                nodeSimTest.on('started', function() {

                    nodeSimTest.stop();

                });

                nodeSimTest.on('stopped', function() {

                    expect(nodeSimTest.EventCounter()).toBe(0);
                    done();

                });

                nodeSimTest.start();

            });


        });

        describe('EventCounter() function', function(){


            it('should be implemented', function() {

                expect(nodeSimTest.EventCounter).toBeDefined();

            });

            it('should have initial 0 events listed', function() {

                expect(nodeSimTest.EventCounter()).toBe(0);

            });

        } );


        describe('getNodelist() function', function() {


            it('should be implemented', function() {

                expect(nodeSimTest.getNodelist).toBeDefined();

            });

            it('should return the delivered nodelist', function() {

                expect(nodeSimTest.getNodelist()).toBe(nodeList);

            });

        });

        describe('receiveFrame() function', function() {

            it('should be implemented', function() {

                expect(nodeSimTest.receiveFrame).toBeDefined();
            });

        });


        describe('getNodeForLongMac() function()',function() {

            it('should be implemented', function() {

                expect(nodeSimTest.getNodeForLongMac).toBeDefined();
            });

            it('should return a node object for a long mac address', function() {

                expect(nodeSimTest.getNodeForLongMac('0013A2000000001')).toEqual(nodeList[0]);
            });

        });



    });


});