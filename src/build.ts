import * as cp from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';
export function buildProject(callback: () => void) {
    let projectPath = process.cwd();
    executeCommand("tsc", ["-p", projectPath], callback);
}

export function buildEngine(callback: () => void) {
    let projectPath = process.cwd();
    let configFile = path.join(projectPath, "engine.json");
    let config = fs.readJSONSync(configFile);
    let enginePath = config.engine;
    executeCommand("tsc", ["-p", enginePath], () => {
        let source = path.join(enginePath, "out");
        let target = path.join(projectPath, 'engine');
        fs.copy(source, target, callback);
    });
}

function executeCommand(command: string, args: string[], callback: () => void) {
    let child_process = cp.spawn(command, args);
    child_process.stdout.addListener("data", data => {
        console.log(data.toString())
    })
    child_process.stderr.addListener("data", data => {
        console.log(data.toString())
    })
    child_process.addListener("close", () => {
        callback();
    })
}

export function buildAll() {
    buildEngine(function () {
        buildProject(function () {
            var StaticServer = require('static-server');
            var server = new StaticServer({
                rootPath: '.',            // required, the root of the server file tree 
                name: 'my-http-server',   // optional, will set "X-Powered-by" HTTP header 
                port: 1337,               // optional, defaults to a random port 
                cors: '*',                // optional, defaults to undefined 
                followSymlink: true,      // optional, defaults to a 404 error 
                templates: {
                    index: 'index.html',      // optional, defaults to 'index.html' 
                    notFound: '404.html'    // optional, defaults to undefined 
                }
            });

            server.start(function () {
                console.log('Server listening to', server.port);
            });
        });
    });
}