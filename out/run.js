"use strict";
var StaticServer = require("static-server");
function run() {
    var server = new StaticServer({
        rootPath: '.',
        name: 'my-http-server',
        port: 1337,
        cors: '*',
        followSymlink: true,
        templates: {
            index: 'index.html',
            notFound: '404.html' // optional, defaults to undefined 
        }
    });
    server.start(function () {
        console.log('Server listening to', server.port);
    });
}
exports.run = run;
//# sourceMappingURL=run.js.map