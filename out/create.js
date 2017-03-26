"use strict";
var fs = require("fs-extra");
var path = require("path");
function create(projectPath) {
    if (!projectPath) {
        throw new Error("请输入路径！！！！");
    }
    var templateFolder = path.resolve(module.filename, "../../templates/simple");
    fs.copySync(templateFolder, projectPath);
}
exports.create = create;
//# sourceMappingURL=create.js.map