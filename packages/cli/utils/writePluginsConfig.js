import chalk from 'chalk';
import ora from 'ora';
import { createPackageTemplate } from './packageTemplate.js'
import { createMainTemplate } from './mainTemplate.js'
import { createAppTemplate } from './appTemplate'
import { downlondPlugin } from './downlondPlugin.js'
export function writePluginsConfig(plugins, rootName) {
    const rootPath = `./${rootName}/`
    const downSpinner = ora('正在写入插件...').start();
    return new Promise((resolve, reject) => {
        try {
            //1.写入package.json
            // 第一种：自定义修改 package.json
            // const pkgPath = `./${res.name}/package.json`; // 你需要根据实际路径进行修改
            // try {
            //   const pkgContent = await readFile(pkgPath, 'utf8');
            //   const pkgData = JSON.parse(pkgContent);
            //   // 修改 name 字段
            //   pkgData.name = res.name;
            //   // 增加插件依赖
            //   for (const plugin of res.plugins) {
            //     pkgData.dependencies[plugin] = pluginVersion[plugin]; // 根据需要修改版本号
            //   }
            //   // 在此处可以继续对 pkgData 进行其他字段的修改
            //   await writeFile(pkgPath, JSON.stringify(pkgData, null, 2));
            // } catch (error) {
            //   console.error('Error customizing package.json:', error);
            // }

            //第二种方式 模板写入package.json
            fs.writeFileSync(rootPath + "/package.json", createPackageTemplate(plugins, rootName));
            //2.模板写入main.js
            fs.writeFileSync(rootPath + "/src/main.ts", createMainTemplate(plugins));
            //3.模板写入App.vue
            fs.writeFileSync(rootPath + "/src/App.vue", createAppTemplate(plugins));
            //4.下载对应的插件配置文件
            downlondPlugin(plugins, rootPath).then(response => {
                //完毕
                downSpinner.succeed(chalk.green('写入插件成功！'));
                resolve();
            }, error => {
                downSpinner.fail();
                console.log('error', chalk.red(error));
                reject(error);
                return;
            })

        } catch (err) {
            downSpinner.fail();
            console.log('err', chalk.red(err));
            reject(err);
            return;
        }
    })
}