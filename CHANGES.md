# Changes

## 0.0.12 (29.10.15)
* added CHANGES.md and transfered gitlog into file
* added .gitignore
* renamed folder test to spec
* added jasmine.json
* added reporterConig.js
* added module jasmine-reporters@2.0.7

## 0.0.11 (15.3.15)
* added correct object support at example nodelist at nodeSim.spec.js
* added xbee-api support for correct test pass at serialSim.spec.js
* added rootpath module;
* added support for config file "DebugMessages enabling/disabling at serialSim.js
* added object with sensor objects. at lmSHObjects.js
* added option to only print to console when debugging is enabled at nodeSim.js

## 0.0.10 (15.3.15)
* Temperature and Door contact now transmit with the correct object id. at node.js

## 0.0.9(19.2.15)
* added command to copy pack into local_modules folder (Gruntfile.js)
* prepared to react on sended at commands at nodeSim.js and serialSim.js

## 0.0.8 (29.1.15)
* fixed wrong main file at package.json
* longMac shall be 16bytes long otherwise xbee-api throws an error. at node.js
* added grunt support


## 0.0.7 (28.1.15)
* differentiate between livecheck interval and dateinterval; changed interval to more convenient length at nodes.js
* added more test cases at nodeSim.spec.js.
* nodeSim.js:
    * Added functions getNodeForLongMac and receiveFrame.
    * Added callback option for start and stop function.
    * RaiseEvent function now correctly raises frame objects.
    * Start now add different timers for livecheck and date interval
* serialSim:
    * added test cases.
    * added code description.
    * read and write function now working.
* test now performs a complete simulation for 1.5 min at test.js
* renamed project from serialSim to xbee-serialSim for clarification
* adapted test for event counter to test lifecheck and dateinterval event for each node. at nodeSim.spec.js
* created LICENCE.md
* created README.md
* created initial description at README.md
* rename project to be compliant with npm (only lower-case names are allowed).
* corrected output of getStringForDate - added seconds to string. at serialSim.js ad test.js
* nodesim is now completely encapsulated within serialSim for more simple usage. at serialSim.js



## 0.0.6 (12.1.15)
* emitting started / stopped event now after synchron for loop not inside to avoid emitting twice or too early. at nodeSim.js
* added afterEach for Start / Stop test to stop events. Added test for check EventCounter at nodeSim.spec.js
* stop() now clears the event list at nodeSim.js
* added test if after called stop() the eventlist is empty at nodeSim.spec.js

## 0.0.5 (9.1.15)
* nodeList now has to be passed as parameter at constructor; necessary to be more flexible e.g. for testing
* added function getNodelist and related tests. Added documentation for nodeSim
* nodeSim.raiseEvent now raises the complete node object as parameter during emitting event.


## 0.0.4 (9.1.15)
* initial commit of karma.conf.js and run_test
* moved nodeSim.js to folder src
* added new function EventCounter to return actual number of listed events
* added events to be thrown for functions start and stop
* moved nodes.js to folder src
* moved serialSim.js to forder src
* added dev dependencies for karma and node (testing) at package.json
* testing of emitted events at test.js

## 0.0.3 (8.1.15)
* initial commit of node simulation; start stop and raiseEvent implemented at nodeSim.js
* test for nodeSim implemented, comment previous tests at test.js

## 0.0.2 (8.1.15)
* initial test script at test.js
* exports with capital Letters to fulfill convention at serialSim.js
* initial commit of test nodes ad node.js

## 0.0.1 (8.1.15)
* initial commit; created class serialSim