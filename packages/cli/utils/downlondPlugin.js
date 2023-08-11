import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import extract from 'extract-zip'; // 引入解压库

/**
 * 下载指定 URL 的文件并保存到目标路径
 * @param {string} url 文件的 URL
 * @param {string} dest 目标保存路径
 */
async function downloadFile(url, dest) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to download ${url}`);
    }

    const buffer = await response.buffer();
    fs.writeFileSync(dest, buffer);
}
// 设置解压后的文件夹名称
const pluginFolderNames = {
    "vue-router": "router",
    "pinna": "store",
    "axios": "api",
    "views": "views"
}
/**
 * 下载用户选择的插件文件夹到指定的目标文件夹
 * @param {string[]} plugins 用户选择的插件列表
 * @param {string} targetDir 目标保存路径
 * @returns {Promise<void>} 下载完成的 Promise
 */
export function downlondPlugin(plugins, targetDir) {
    return new Promise(async (resolve, reject) => {
        try {
            //如果有vue-router额外下载views
            if (plugins["vue-router"]) {
                plugins.push("views")
            }
            for (const plugin of plugins) {
                // 构建插件文件夹的完整 URL
                const pluginUrl = `../template/${plugin}.zip`; // 替换成实际的插件文件夹的 URL

                // 下载插件文件夹压缩包并保存到目标保存路径
                const pluginZipPath = path.join(targetDir, `${plugin}.zip`);
                await downloadFile(pluginUrl, pluginZipPath);

                // 解压插件文件夹压缩包到目标保存路径
                await extract(pluginZipPath, { dir: path.join(targetDir, pluginFolderNames[plugin]) });

                // 删除已下载的插件文件夹压缩包
                fs.unlinkSync(pluginZipPath);
            }
            // 所有插件文件夹下载完成，解析 Promise
            resolve();
        } catch (error) {
            // 如果下载过程中出现错误，拒绝 Promise 并传递错误信息
            reject(error);
            return
        }
    });
}
