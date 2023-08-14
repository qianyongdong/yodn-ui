import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// const fs = require('fs');
// const path = require('path');

// 获取当前模块的目录路径
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// 设置解压后的文件夹名称
const pluginFolderNames = {
    "vue-router": "router",
    "pinna": "store",
    "axios": "api",
    "views": "views"
}
export default async (plugins, targetDir) => {
    return new Promise(async (resolve, reject) => {
        try {
            // 如果有vue-router额外下载views
            if (plugins["vue-router"]) {
                plugins.push("views")
            }
            for (const plugin of plugins) {
                // 构建插件文件夹的完整路径
                const pluginFolderPath = path.join(__dirname, '..', 'template', pluginFolderNames[plugin]);
                const targetFolderPath = path.join(targetDir, pluginFolderNames[plugin]);

                // 复制插件文件夹到目标保存路径
                await copyFolder(pluginFolderPath, targetFolderPath);
            }
            // 所有插件文件夹复制完成，调用 resolve 表示成功
            resolve(true);
        } catch (error) {
            // 如果复制过程中出现错误，调用 reject 并传递错误信息
            reject(error);
        }
    });
};


/**
 * 复制文件夹及其内容到目标路径
 * @param {string} sourceDir 源文件夹路径
 * @param {string} targetDir 目标文件夹路径
 */
async function copyFolder(sourceDir, targetDir) {
    try {
        await fs.promises.mkdir(targetDir, { recursive: true });
        const files = await fs.promises.readdir(sourceDir);

        for (const file of files) {
            const sourcePath = path.join(sourceDir, file);
            const targetPath = path.join(targetDir, file);
            const stats = await fs.promises.stat(sourcePath);

            if (stats.isDirectory()) {
                await copyFolder(sourcePath, targetPath);
            } else {
                await fs.promises.copyFile(sourcePath, targetPath);
            }
        }
    } catch (error) {
        throw error;
    }
}