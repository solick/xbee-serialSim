/**
 * Created by lynmatten on 09.01.15.
 */


var SerialSim = require('../../src/serialSim.js');

describe('xbee-serialSim Class', function() {

    var serialSim = new SerialSim.SerialSim();

    it('should create a valid object', function() {

        expect(serialSim).toBeDefined();
        expect(serialSim).not.toBeNull();

    });


    describe('API', function() {

        var serialSimTest = null;

        beforeEach(function() {

            serialSimTest = new SerialSim.SerialSim();

        });

        afterEach(function() {



        });

        describe('open() function', function() {

            it('should be implemented', function() {

                expect(serialSimTest.open).toBeDefined();

            });

            it('should throw open event after calling', function(done) {

                serialSimTest.on('open', function() {

                    expect(true).toBeTruthy();
                    done();
                });

                serialSimTest.open();

            });

            it('should use the callback method if used', function(done) {

                serialSimTest.open(function() {

                    expect(true).toBeTruthy();
                    done();
                });

            });

        });

        describe('close() function', function() {

            it('should be implemented', function() {

                expect(serialSimTest.close).toBeDefined();

            });

            it('should throw close event after calling', function(done) {

                serialSimTest.on('close', function() {

                    expect(true).toBeTruthy();
                    done();
                });

                serialSimTest.close();

            });

            it('should use the callback method if used', function(done) {

                serialSimTest.close(function() {

                    expect(true).toBeTruthy();
                    done();
                });

            });

        });

        describe('write() function', function() {

            it('should be implemented', function() {

                expect(serialSimTest.write).toBeDefined();
            });

        });


        describe('read() function', function() {

            it('should be implemented', function() {

                expect(serialSimTest.write).toBeDefined();
            });

        });

    });
});