#!/usr/bin/env node

import * as create from './create';
import * as build from './build';
import * as run from './run';
let command = process.argv[2];
console.log(command)
if (command == "create") {
    let projectPath = process.argv[3];
    create.create(projectPath);
}
else if (command == "build") {
    build.buildAll();
}
else if (command == "run") {
    run.run();
}

