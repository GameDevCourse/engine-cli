"use strict";
var cp = require("child_process");
var fs = require("fs-extra");
var path = require("path");
function buildProject(callback) {
    var projectPath = process.cwd();
    executeCommand("tsc", ["-p", projectPath], callback);
}
exports.buildProject = buildProject;
function buildEngine(callback) {
    var projectPath = process.cwd();
    var configFile = path.join(projectPath, "engine.json");
    var config = fs.readJSONSync(configFile);
    var enginePath = config.engine;
    executeCommand("tsc", ["-p", enginePath], function () {
        var source = path.join(enginePath, "out");
        var target = path.join(projectPath, 'engine');
        fs.copy(source, target, callback);
    });
}
exports.buildEngine = buildEngine;
function executeCommand(command, args, callback) {
    var child_process = cp.spawn(command, args);
    child_process.stdout.addListener("data", function (data) {
        console.log(data.toString());
    });
    child_process.stderr.addListener("data", function (data) {
        console.log(data.toString());
    });
    child_process.addListener("close", function () {
        callback();
    });
}
function buildAll() {
    buildEngine(function () {
        buildProject(function () {
        });
    });
}
exports.buildAll = buildAll;
//# sourceMappingURL=build.js.map