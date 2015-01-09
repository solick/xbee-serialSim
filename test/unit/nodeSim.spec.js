/**
 * Created by lynmatten on 09.01.15.
 */


var NodeSim = require('../../src/nodeSim.js');


describe('nodeSim Class', function() {

    var nodeSim = new NodeSim.NodeSim();

    it('should create a valid object', function() {

        expect(nodeSim).toBeDefined();
        expect(nodeSim).not.toBeNull();
    });

    describe('API', function() {



        describe('start() function', function() {

            var nodeSimTest = null;

            beforeEach(function() {

                nodeSimTest = new NodeSim.NodeSim();

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

                nodeSimTest = new NodeSim.NodeSim();

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

                nodeSimTest = new NodeSim.NodeSim();

            });

            it('should be implemented', function() {

                expect(nodeSimTest.EventCounter).toBeDefined();

            });

            it('should have initial 0 events listed', function() {

                expect(nodeSimTest.EventCounter()).toBe(0);

            });

        } );



    });


});