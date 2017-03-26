#!/usr/bin/env node
"use strict";
var create = require("./create");
var build = require("./build");
var run = require("./run");
var command = process.argv[2];
console.log(command);
if (command == "create") {
    var projectPath = process.argv[3];
    create.create(projectPath);
}
else if (command == "build") {
    build.buildAll();
}
else if (command == "run") {
    run.run();
}
//# sourceMappingURL=cli.js.map