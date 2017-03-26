import * as fs from 'fs-extra';
import * as path from 'path';
export function create(projectPath: string) {
    if (!projectPath) {
        throw new Error("请输入路径！！！！")
    }
    let templateFolder = path.resolve(module.filename, "../../templates/simple")
    fs.copySync(templateFolder, projectPath);
}