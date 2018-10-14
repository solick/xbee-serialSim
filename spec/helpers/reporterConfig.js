/**
 * Created by lynmatten on 21.04.15.
 */

var jasmineReporters = require("jasmine-reporters");


jasmine.getEnv().addReporter(new jasmineReporters.TerminalReporter({
    verbosity: 3,
    color: true,
    showStack: true
}));